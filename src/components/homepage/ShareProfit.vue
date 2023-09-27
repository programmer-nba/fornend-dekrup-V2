<template>
  <div>
    <div class="flex align-items-center justify-content-between mb-4">
      <span class="text-xl font-medium text-900">ส่วนแบ่งกำไร</span>
    </div>
    <div class="card flex justify-content-center">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-20rem" />
    </div>
    <ul class="list-none p-0 mx-0">
      <li class="flex align-items-center py-1">
        <span class="border-round bg-purple-300 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span><span
          class="text-xl font-medium text-90">Platfrom - 80%</span><span class="text-600 text-xl font-medium ml-auto">{{ numberFormat(platfrom)
          }}</span>
      </li>
      <li class="flex align-items-center py-1">
        <span class="border-round bg-pink-500 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span><span
          class="text-xl font-medium text-90">กองทุน&allsale - 15%</span><span class="text-600 text-xl font-medium ml-auto">{{
            numberFormat(allsale) }}</span>
      </li>
      <li class="flex align-items-center py-1">
        <span class="border-round bg-pink-300 mr-3 flex-shrink-0" style="width: 1rem; height: 1rem"></span><span
          class="text-xl font-medium text-90">โบนัสพนักงาน - 5%</span><span class="text-600 text-xl font-medium ml-auto">{{
            numberFormat(bonus) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {


  data: () => ({
    NBA: '',
    platfrom: '',
    allsale: '',
    bonus: '',

    chartData: null,
    chartOptions: {
      cutout: '60%'
    },
  }),

  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_SHOP}commission/list`, {
        headers: {
          "auth-token": `Bearer ${this.$store.getters.token}`,
        },
      })
      .then((res) => {
        this.loading = false;
        const commisstion = res.data.data;

        this.bonus = commisstion.reduce((sum, el) => sum + el.bonus, 0);
        this.allsale = commisstion.reduce((sum, el) => sum + el.allSale, 0);
      })
      .catch((err) => {
        console.log(err);
      });

    const total = (this.bonus * 100) / 5;

    this.platfrom = (total * 80) / 100

    this.chartData = this.setChartData();
  },

  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: ['Platfrom (80%)', 'กองทุน&allsale (15%)', 'โบนัสพนักงาน (5%)'],
        datasets: [
          {
            data: [this.platfrom, this.allsale, this.bonus],
            backgroundColor: [
              documentStyle.getPropertyValue('--purple-300'),
              documentStyle.getPropertyValue('--pink-500'),
              documentStyle.getPropertyValue('--pink-300'),
            ],
          }
        ]
      };
    },

    numberFormat(number) {
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
}

</script>

<style lang="scss" scoped></style>
