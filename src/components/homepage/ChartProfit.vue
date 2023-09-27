<template>
  <div class="flex align-items-center justify-content-between mb-2">
    <span class="text-xl font-medium text-900">กำไรการขายสินค้า</span>
  </div>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    class="h-26rem"
  />
</template>

<script setup>
import dayjs from "dayjs";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  preorders: Array,
});

const chartData = ref();
const chartOptions = ref();
const profit_all = ref([]);

const filter_preorder = () => {
  const preorders = props.preorders;
  const newPre = [];
  preorders.forEach((el) => {
    const status = el.ponba_timestamp[el.ponba_timestamp.length - 1];
    newPre.push({ ...el, timestamp: status.timestamp });
  });
  const order_all = newPre.filter(
    (el) =>
      el.ponba_status === "ยืนยันการสั่งสินค้า" &&
      dayjs(el.timestamp).format("YY") === dayjs(Date.now()).format("YY")
  );
  const month = [
    ...new Set(order_all.map((el) => dayjs(el.timestamp).format("MM"))),
  ];
  const data = [];
  for (let i = 1; i <= month.length; i++) {
    const month_num = month[i - 1];
    let ponba_month = order_all.filter(
      (el) => dayjs(el.timestamp).format("MM") === month_num
    );
    const ponba_cost = [];
    ponba_month.forEach((el) => {
      const cost_nba = [];
      el.ponba_detail.map((item) => {
        const cost = item.amount * item.productNBA_cost_nba;
        cost_nba.push(cost);
      });
      ponba_cost.push({
        ...el,
        ponba_cost: cost_nba.reduce((sum, item) => sum + item, 0),
      });
    });

    const total = ponba_cost.reduce((sum, item) => sum + item.ponba_total, 0);
    const cost = ponba_cost.reduce((sum, item) => sum + item.ponba_cost, 0);
    const profit = total - cost;
    data.push(profit);
  }
  profit_all.value = data;
};

onMounted(() => {
  filter_preorder();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      // "July",
      // "August",
      // "September",
      // "October",
      // "November",
      // "December",
    ],
    datasets: [
      {
        label: "กำไรการขายสินค้า",
        data: profit_all.value,
        fill: true,
        borderColor: documentStyle.getPropertyValue("--purple-600"),
        tension: 0.4,
        backgroundColor: "hsla(290,60%,70%,0.3)",
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>

<style lang="scss" scoped></style>
