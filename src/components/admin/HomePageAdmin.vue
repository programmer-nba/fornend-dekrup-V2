<template>
  <h1 class="text-center">ระบบจัดการ Dekrub-shop || Home Page Admin</h1>
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
  components: {},
  data() {
    return {
      thisDay: dateFormat(Date.now()),
      todayMemberCount: 0,
      todayOrderCount: 0, 
      commissionDayData: 0, 
    };
  },
  async created() {
  document.title = 'ระบบจัดการ Dekrub-shop';

  try {
    // ทำการร้องขอ API เพื่อดึงข้อมูลจำนวนผู้สมัครจากวันนี้
    const memberResponse = await axios.get(`${process.env.VUE_APP_DEKRUP}/order/member/new/list`, {
      headers: {
        "token": localStorage.getItem("token"),
      },
    });

    // ทำการร้องขอ API เพื่อดึงข้อมูลออเดอร์วันนี้
    const orderResponse = await axios.get(`${process.env.VUE_APP_DEKRUP}/order/list`, {
      headers: {
        "token": localStorage.getItem("token"),
      },
    });

    // ทำการร้องขอ API เพื่อดึงข้อมูลคอมมิชชั่นวันนี้
    const commissionResponse = await axios.get(`${process.env.VUE_APP_DEKRUP}/commission/day`, {
      headers: {
        "token": localStorage.getItem("token"),
      },
    });

    // ตรวจสอบความถูกต้องของข้อมูลที่รับมา
    console.log("ข้อมูลสมาชิกสมัครวันนี้:", memberResponse.data);
    console.log("ข้อมูลออเดอร์วันนี้:", orderResponse.data);
    console.log("ข้อมูล Commission Day วันนี้:", commissionResponse.data);

    if (memberResponse.status === 200 && orderResponse.status === 200 && commissionResponse.status === 200) {
      const today = dayjs(); 

      // นับจำนวนออเดอร์วันนี้
      this.todayOrderCount = orderResponse.data.reduce((count, order) => {
        const timestamp = dayjs(order.timestamp);

        // ตรวจสอบว่า timestamp อยู่ในวันนี้
        if (timestamp.isSame(today, 'day')) {
          return count + 1;
        }

        return count;
      }, 0);

      // กำหนดค่าข้อมูลคอมมิชชั่นวันนี้
      this.commissionDayData = commissionResponse.data;
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
