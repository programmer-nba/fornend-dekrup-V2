<template>
  <div class="flex align-items-center justify-content-between mb-4">
    <span class="text-xl font-medium text-900">Statistics</span>
  </div>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    class="h-30rem"
  />
</template>

<script setup>
import dayjs from "dayjs";
import { defineProps, onMounted, ref, watchEffect } from "vue";

const props = defineProps({
  preorders: Array,
  order: Array,
});

const loading = ref(false);
const loading2 = ref(false);
const chartData = ref();
const chartOptions = ref();
const preorder = ref([]);
const product_sales = ref([]);
const purchase_order = ref([]);
const expenses = ref([]);
const months = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);
const month = ref([]);

const filter_preorder = () => {
  const preorders = props.preorders;
  const newPre = [];
  preorders.forEach((el) => {
    const status = el.ponba_timestamp[el.ponba_timestamp.length - 1];
    newPre.push({ ...el, timestamp: status.timestamp });
  });
  preorder.value = newPre;
  const order_all = preorder.value.filter(
    (el) =>
      el.ponba_status === "ยืนยันการสั่งสินค้า" &&
      dayjs(el.timestamp).format("YY") === dayjs(Date.now()).format("YY")
  );

  filter_product_sales(order_all);
  filter_purchase_order();
  filter_expenses(order_all);
};

const filter_product_sales = (order_all) => {
  const data = [];
  for (let i = 0; i < months.value.length; i++) {
    const month = months.value[i];
    let ponba_month = order_all.filter(
      (el) => dayjs(el.timestamp).format("MMMM") === month
    );
    if (ponba_month.length) {
      const total_month = ponba_month.reduce(
        (sum, item) => sum + item.ponba_total,
        0
      );
      data.push(total_month);
    }
  }

  product_sales.value = data;
  loading.value = true;
};

const filter_purchase_order = () => {
  const orders = preorder.value.filter(
    (el) => dayjs(el.timestamp).format("YY") === dayjs(Date.now()).format("YY")
  );
  const data = [];
  for (let i = 0; i < months.value.length; i++) {
    const month = months.value[i];
    let ponba_month = orders.filter(
      (el) => dayjs(el.timestamp).format("MMMM") === month
    );
    if (ponba_month.length) {
      const total_month = ponba_month.reduce(
        (sum, item) => sum + item.ponba_total,
        0
      );
      data.push(total_month);
    }
  }
  purchase_order.value = data;
  loading2.value = true;
};

const filter_expenses = (order_all) => {
  const ponba_cost = [];
  order_all.forEach((el) => {
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
  const data = [];
  for (let i = 0; i < months.value.length; i++) {
    const month = months.value[i];
    let ponba_month = ponba_cost.filter(
      (el) => dayjs(el.timestamp).format("MMMM") === month
    );
    if (ponba_month.length) {
      const total_month = ponba_month.reduce(
        (sum, item) => sum + item.ponba_cost,
        0
      );
      data.push(total_month);
    }
  }
  expenses.value = data;
};

onMounted(async () => {
  await filter_preorder();
  const position = months.value.findIndex(
    (e) => e === dayjs(Date.now()).format("MMMM")
  );
  month.value = months.value.splice(0, position + 3);
});

watchEffect(() => {
  if (loading.value === true && loading2.value === true) {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
  }
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  return {
    labels: month.value,
    datasets: [
      {
        label: "สื่อสิ่งพิมพ์",
        fill: false,
        tension: 0.4,
        backgroundColor: documentStyle.getPropertyValue("--purple-500"),
        borderColor: documentStyle.getPropertyValue("--purple-500"),
        data: purchase_order.value,
      },
      {
        label: "สื่อโฆษณาออนไลน์",
        fill: false,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--pink-600"),
        data: product_sales.value,
        backgroundColor: "hsl(328, 42%, 47%,0.2)",
      },
      {
        label: "เขียนโปรแกรมและเว็บไซต์",
        data: expenses.value,
        fill: true,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--red-500"),
        backgroundColor: "hsl(0, 100%, 50%,0.2)",
      },
      {
        label: "บัญชี",
        data: expenses.value,
        fill: true,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--red-500"),
        backgroundColor: "hsl(0, 100%, 50%,0.2)",
      },
      {
        label: "IT-Support",
        data: expenses.value,
        fill: true,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue("--red-500"),
        backgroundColor: "hsl(0, 100%, 50%,0.2)",
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
