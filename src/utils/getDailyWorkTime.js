import dayjs from "dayjs";
import { reactive } from "vue";
import conversion from "./conversion";

const DailyWorkTime = reactive([]);
const AccumulateTime = reactive([]);

const getDailyWorkTime = (obj) => {
	DailyWorkTime.length = 0;
	AccumulateTime.length = 0;
	for (let date in obj) {
		if (obj[date].length % 2 != 0) {
			obj[date].push({ 打卡時間: dayjs().format("YYYY/MM/DD HH:mm:ss") });
			let dailySum = dayjs(obj[date][1]?.打卡時間).diff(
				dayjs(obj[date][0].打卡時間)
			);

			AccumulateTime.push(dailySum);
			let result = conversion(dailySum);
			DailyWorkTime.push(`${result.hours}:${result.minutes}:${result.seconds}`);
		} else {
			if (obj[date].length > 2) {
				let dailySum = 0;
				for (let i = 0; i < obj[date].length; i++) {
					if (i % 2 != 0) {
						dailySum += dayjs(obj[date][i]?.打卡時間).diff(
							dayjs(obj[date][i - 1]?.打卡時間)
						);
					} else {
						continue;
					}
				}
				AccumulateTime.push(dailySum);
				let result = conversion(dailySum);

				DailyWorkTime.push(
					`${result.hours}:${result.minutes}:${result.seconds}`
				);
			} else if (obj[date].length == 2) {
				let dailySum = dayjs(obj[date][1]?.打卡時間).diff(
					dayjs(obj[date][0].打卡時間)
				);
				AccumulateTime.push(dailySum);

				let result = conversion(dailySum);

				DailyWorkTime.push(
					`${result.hours}:${result.minutes}:${result.seconds}`
				);
			}
		}
	}
};

export { getDailyWorkTime, DailyWorkTime, AccumulateTime };
