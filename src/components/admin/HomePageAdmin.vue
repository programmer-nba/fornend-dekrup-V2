<template>
  <h1 class="text-center">ระบบจัดการ Dekrub-shop </h1>
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
import { dateFormat } from '../lib/function';

export default {
  data() {
    return {
      thisDay: dateFormat(Date.now()), // ใช้ dateFormat เพื่อแสดงวันที่ในรูปแบบ "วัน/เดือน/ปี"
      todayOrderCount: 0,
      todayMemberCount: 0,
      commissionDayData: 0, // เพิ่มตัวแปรสำหรับเก็บข้อมูล Commission Day

    };
  },
  methods: {
    async fetchMemberData() {
  try {
    // ทำการร้องขอ API เพื่อดึงข้อมูลสมาชิกที่สมัครวันนี้
    const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/order/member/new/list`, {
      headers: {
        'token': ` ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      const member = response.data.data;

      // กรองรายการสมาชิกที่มีสถานะ "ยืนยันออเดอร์" และ timestamp ตรงกับวันนี้
      const todayConfirmedMembers = member.filter(item => {
        const latestStatus = item.status[item.status.length - 1];
        return (
          latestStatus.status === 'ยืนยันออเดอร์' &&
          dateFormat(latestStatus.timestamp) === this.thisDay
        );
      });

      // นับจำนวนสมาชิกที่สมัครวันนี้ที่ยืนยันออเดอร์
      this.todayMemberCount = todayConfirmedMembers.length;
    } else {
      console.error("Error fetching member data. Status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching member data:", error);
  }
},

    async fetchOrderData() {
      try {
        // ทำการร้องขอ API เพื่อดึงข้อมูลออเดอร์ทั้งหมด
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/order/list`, {
          headers: {
            'token': ` ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200) {
          const order = response.data.data;

          // กรองรายการที่มี timestamp ตรงกับวันนี้
          const todayOrders = order.filter(
            (item) => dateFormat(item.timestamp) === this.thisDay
          );

          // นับจำนวนรายการของวันนี้
          this.todayOrderCount = todayOrders.length;
        } else {
          console.error("Error fetching order data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    },
    async fetchCommissionData() {
      try {
        // ทำการร้องขอ API เพื่อดึงข้อมูล Commission Day
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/commission/day`, {
          headers: {
            'token': ` ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200) {
          const commissionData = response.data.data;

          // กรองรายการที่มี timestamp ตรงกับวันนี้
          const todayCommission = commissionData.filter(
            (item) => dateFormat(item.timestamp) === this.thisDay
          );

          // คำนวณจำนวน Commission ที่ทำการสมัครมาวันนี้
          this.commissionDayData = todayCommission.reduce(
            (total, item) => total + item.commissionAmount,
            0
          );
        } else {
          console.error("Error fetching commission data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching commission data:", error);
      }
    },
  },


  async mounted() {
    this.loading = true;

    await Promise.all([
      this.fetchMemberData(),
      this.fetchOrderData(),
      this.fetchCommissionData(), // เรียกใช้ method เพื่อดึงข้อมูล Commission
    ]);

    this.loading = false;
  },
};
</script>






<style>
.card-bg {
  background-color: #FFFDE3;
  color: #C21010;

}
</style>
