import dayjs from "dayjs";
import axiosApi from "./temp";
import { reactive } from "vue";

const workTime = reactive([]);

const getData = async (id) => {
	await axiosApi
		.default({
			method: "GET",
			url: `/打卡紀錄/${id}`,
		})
		.then((res) => {
			res.data.data.map((item) => {
				if (dayjs(item.打卡時間).isSame(dayjs(), "month")) {
					workTime.push(item);
				} else {
					return;
				}
			});
		});
};

export { getData, workTime };
