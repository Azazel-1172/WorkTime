import dayjs from "dayjs";
import axiosApi from "./temp";
import { reactive } from "vue";

const workTime = reactive([]);

const getData = async (id) => {
  let QueryData = new FormData();
  let month = 6;
  let year = 2024;
  QueryData.append("year", year);
  QueryData.append("month", month);

  workTime.length = 0;
  await axiosApi
    .default({
      method: "QUERY",
      url: `/打卡紀錄/${id}`,
      data: QueryData,
    })
    .then((res) => {
      res.data.data.map((item) => {
        workTime.push(item);
      });
    });
};

export { getData, workTime };
