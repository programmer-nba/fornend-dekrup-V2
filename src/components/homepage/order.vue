<template>
  <div class="px-4 py-5 md:px-6 lg:px-8">
    <div class="grid mt-3">
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-purple-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">รายได้ ออเดอร์ สมัครสมาชิกใหม่</span>
              <div class="text-900 font-medium text-xl">{{ total_member_new }} บาท</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">{{ item_member_new.length }} รายการ </span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-purple-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">รายได้ ออเดอร์ ทั่วไป</span>
              <div class="text-900 font-medium text-xl">{{ total_order }} บาท</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">{{ item_order.length }} รายการ </span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  data: () => ({
    item_order: [],
    total_order: 0,

    item_member_new: [],
    total_member_new: 0,
  }),

  async mounted() {
    this.loading = true;

    await axios
      .get(`${process.env.VUE_APP_DEKRUP}/order/list`, {
        headers: {
          'token': `${localStorage.getItem('token')}`
        },
      })
      .then((res) => {
        this.item_order = res.data.data;
        const amount = this.item_order.length;
        for (let i = 0; i < amount; i++) {
          const data = this.item_order;
          this.total_order = data.reduce((sum, el) => sum + el.totalprice, 0);
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${process.env.VUE_APP_DEKRUP}/order/member/new/list`, {
        headers: {
          'token': `${localStorage.getItem('token')}`
        },
      })
      .then((res) => {
        this.item_member_new = res.data.data;
        const amount = this.item_member_new.length;
        for (let i = 0; i < amount; i++) {
          const data = this.item_member_new;
          this.total_member_new = data.reduce((sum, el) => sum + el.amount, 0);
        }
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });

  }


};
</script>
<style></style>
  