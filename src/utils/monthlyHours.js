import { reactive } from "vue";
import conversion from "./conversion";

const CurrentDailyHours = reactive([]);

const monthlyHour = (Arr, Int) => {
	let result = 0;
	if (Int == 0) {
		CurrentDailyHours[Int] = Arr[Int];
		result = conversion(Arr[Int]);
	} else {
		for (let i = 0; i <= Int; i++) {
			result += Arr[i];
		}
		CurrentDailyHours[Int] = result;
		result = conversion(result);
	}
	console.log(CurrentDailyHours);
	return `${result.hours}小時${result.minutes}分鐘${result.seconds}秒`;
};

export { monthlyHour, CurrentDailyHours };
