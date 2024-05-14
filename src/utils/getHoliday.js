import axios from "axios";
import { reactive, ref } from "vue";
import dayjs from "dayjs";

const Data_2024 = ref();
const getCurrentMonthHoliday = reactive([]);

const getHoliday = async () => {
  const apiUrl =
    "https://data.ntpc.gov.tw/api/datasets/308dcd75-6434-45bc-a95f-584da4fed251/json";

  await axios
    .get(apiUrl, {
      params: {
        page: 0,
        size: 10000,
      },
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      Data_2024.value = response.data.filter((item) => item.year === "2024");
      Data_2024.value.map((item, index) => {
        let year = Data_2024.value[index].date.substring(0, 4);
        let month = Data_2024.value[index].date.substring(4, 6) - 1; // 月份需要減去1，因為 JavaScript 的月份是從 0 開始的
        let day = Data_2024.value[index].date.substring(6, 8);
        let dateObject = new Date(year, month, day);

        if (dayjs(dateObject).isSame(dayjs(), "month")) {
          getCurrentMonthHoliday.push(dateObject);
        } else {
          return;
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export { getHoliday, getCurrentMonthHoliday };
