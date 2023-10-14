<template>
  <div class="px-4 py-5 md:px-6 lg:px-8">
    <div class="grid mt-3">
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-purple-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">Commission Register Day</span>
              <div class="text-900 font-medium text-xl">{{ numberDigitFormat(total_regis_day) }} บาท</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">{{ commission_regis_day.length }} รายการ </span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-purple-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">Comission Register Week</span>
              <div class="text-900 font-medium text-xl">{{ numberDigitFormat(total_regis_week) }} บาท</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">{{ commission_regis_week.length }} รายการ </span>
        </div>
      </div>

      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-purple-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">Commission Administer</span>
              <div class="text-900 font-medium text-xl">{{ numberDigitFormat(total_administer) }} บาท</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">{{ commission_administer.length }} รายการ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    commission_regis_day: [],
    commission_regis_week: [],
    commission_administer: [],

    total_regis_day: 0,
    total_regis_week: 0,
    total_administer: 0,
  }),

  async mounted() {
    this.loading = true;

    await axios
      .get(`${process.env.VUE_APP_DEKRUP}/commission/day`, {
        headers: {
          'token': `${localStorage.getItem('token')}`
        },
      })
      .then((res) => {
        this.commission_regis_day = res.data.data;
        const amount = this.commission_regis_day.length;
        for (let i = 0; i < amount; i++) {
          const data = this.commission_regis_day[i].data;
          const total = data.reduce((sum, el) => sum + el.remainding_commission, 0);
          this.total_regis_day = this.total_regis_day + total;
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${process.env.VUE_APP_DEKRUP}/commission/register/week`, {
        headers: {
          'token': `${localStorage.getItem('token')}`
        },
      })
      .then((res) => {
        this.commission_regis_week = res.data.data;
        const amount = this.commission_regis_week.length;
        for (let i = 0; i < amount; i++) {
          const data = this.commission_regis_week[i].data;
          const total = data.reduce((sum, el) => sum + el.remainding_commission, 0);
          this.total_regis_week = this.total_regis_week + total;
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${process.env.VUE_APP_DEKRUP}/commission/week`, {
        headers: {
          'token': `${localStorage.getItem('token')}`
        },
      })
      .then((res) => {
        this.commission_administer = res.data.data;
        const amount = this.commission_administer.length;
        for (let i = 0; i < amount; i++) {
          const data = this.commission_administer[i].data;
          const total = data.reduce((sum, el) => sum + el.remainding_commission, 0);
          this.total_administer = this.total_administer + total;
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    numberDigitFormat(num) {
      return num.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    },
  },

};
</script>
<style></style>
