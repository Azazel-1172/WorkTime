import conversion from "./conversion";

const diffDaily = (int, arr) => {
	let result = 0;
	let hours = (int + 1) * 8 * 60 * 60 * 1000;
	result = conversion(arr[int] - hours);

	return `${result.hours}小時${result.minutes}分鐘${result.seconds}秒`;
};
export default diffDaily;
