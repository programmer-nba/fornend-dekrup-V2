<template>
  <p>ระบบจัดการ Dekrub-shop || Home Page Admin</p>
  <div class="px-4 py-5 md:px-6 lg:px-8">
 
    <div class="grid mt-3">
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-purple-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">สมาชิกสมัครวันนี้ {{ thisDay }}</span>
              <div class="text-900 font-medium text-xl ml-3 text-left">{{ todayMemberCount }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium"> รายการ </span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-purple-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">ออเดอร์วันนี้ {{ thisDay }}</span>
              <div class="text-900 font-medium text-xl">{{ todayOrderCount }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium"> รายการ </span>
        </div>
      </div>
 
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-purple-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">Commission Day {{ thisDay }}</span>
              <div class="text-900 font-medium text-xl ml-3 text-left">{{ commissionDayData }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">รายการ</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { dateFormat } from '../lib/function';

export default {
  data() {
    return {
      thisDay: dateFormat(Date.now()),
      todayOrderCount: 0,
      todayMemberCount: 0,
      commissionDayData: 0,
    };
  },
  async created() {
    document.title = 'ระบบจัดการ Dekrub-shop';

    try {
      // ทำการร้องขอ API เพื่อดึงข้อมูลออเดอร์ทั้งหมด
      const orderResponse = await axios.get(`${process.env.VUE_APP_DEKRUP}/order/list`, {
        headers: {
          "token": localStorage.getItem("token"),
        },
      });

      if (orderResponse.status === 200) {
        // นับจำนวนออเดอร์วันนี้
        this.todayOrderCount = orderResponse.data.filter((item) => {
          const orderDate = dayjs(item.timestamp).format('YYYY-MM-DD');
          
          // เปรียบเทียบว่า orderDate ตรงกับวันที่ปัจจุบัน
          return orderDate === this.thisDay;
        }).length;
      } else {
        console.error("Error fetching data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>



<style>
.card-bg {
  background-color: #FFFDE3;
  color: #C21010;

}
</style>
