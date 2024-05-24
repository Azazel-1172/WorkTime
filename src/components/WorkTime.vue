<template>
  <div class="holiday">
    <p>本月必要時數: {{ MonthWorkTime }} 小時</p>
    <v-container>
      <v-select
        variant="outlined"
        clearable
        label="Select"
        :items="['11', '12', '13']"
        v-model="userId"
      ></v-select>
    </v-container>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="本月假期"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="本月假期" class="text-center">
          <v-card-text class="text-left">
            <ul>
              <li
                v-for="(holiday, index) in getCurrentMonthHoliday"
                :key="index"
              >
                {{ dayjs(holiday).format("YYYY 年 MM 月 DD 日") }}
              </li>
            </ul>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <table>
    <thead>
      <tr>
        <th>日期</th>
        <th>打卡紀錄</th>
        <th>當日時數</th>
        <th>當月累計</th>
        <th>多餘時數</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(group, date, index) in groupedData" :key="date">
        <td>{{ date }}</td>
        <td>
          <ul>
            <li v-for="item in group" :key="item.id">
              {{ item.打卡時間.split(" ")[1] }}
            </li>
          </ul>
        </td>
        <td>
          {{ transfor(DailyWorkTime[index]) }}
        </td>

        <td>
          {{ monthlyHour(AccumulateTime, index) }}
        </td>
        <td>{{ diffDaily(index, CurrentDailyHours) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getHoliday, getCurrentMonthHoliday } from "../utils/getHoliday";
import { getData, workTime } from "../utils/getData";
import {
  getDailyWorkTime,
  DailyWorkTime,
  AccumulateTime,
} from "../utils/getDailyWorkTime";
import transfor from "../utils/transfor";
import { monthlyHour, CurrentDailyHours } from "../utils/monthlyHours";
import diffDaily from "../utils/diffDaily";

import dayjs from "dayjs";

const MonthWorkTime = ref();
const userId = ref(11);

watch(userId, async () => {
  await getData(userId.value);
  const daysInCurrentMonth = dayjs().daysInMonth();

  groupData();
  getDailyWorkTime(groupedData.value);
});

onMounted(async () => {
  await getHoliday();
  await getData(userId.value);

  const daysInCurrentMonth = dayjs().daysInMonth();
  MonthWorkTime.value =
    (daysInCurrentMonth - getCurrentMonthHoliday.length) * 8;

  groupData();
  getDailyWorkTime(groupedData.value);
});

const groupedData = ref({});

const groupData = () => {
  const data = workTime;
  const grouped = {};

  data.forEach((item) => {
    const date = item["打卡時間"].split(" ")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  groupedData.value = grouped;
};

setInterval(() => {
  groupData();
  getDailyWorkTime(groupedData.value);
}, 1000);
</script>

<style scoped>
table {
  th {
    padding: 1rem;
  }
  td {
    padding: 1rem;
  }
}

.holiday {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.v-container {
  padding: 0 1rem;
}
</style>
