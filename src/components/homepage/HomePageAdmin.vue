<template>
  <div class="px-4 py-5 md:px-6 lg:px-8" >
   
    <div class="grid mt-3" >
      <div class="col-12 md:col-6 lg:col-3" >
        <div class="surface-card shadow-2 p-3 border-round border-round border-pink-500 surface-overlay border-left-3"  >
          <div class="flex justify-content-between mb-3" >
            <div>
              <span class="block text-900 font-medium mb-3 text-left">รายได้ก่อนจัดสรร ประจำวัน 00.00</span>
              <div class="text-900 font-medium text-xl ml-3 text-left">00.00</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-pink-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-pink-500 text-xl"></i>
            </div>
          </div>
          <span class=" font-medium">0 รายการ </span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-pink-500 surface-overlay  border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-900 font-medium mb-3 text-left">รายได้ก่อนจัดสรรทั้งหมด</span>
              <div class="text-900 font-medium text-xl">00.00</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-pink-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-pink-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">0 รายการ </span>
        </div>
      </div>
      
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-pink-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">กำไร DKRUB </span>
              <div class="text-900 font-medium text-xl ml-3 text-left">00.00</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-pink-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-dollar text-pink-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">0 รายการ</span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round border-round border-red-500 surface-overlay border-left-3">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3 text-left">ค่าจัดสรร Platform (กรณียกเลิกรายการ) </span>
              <div class="text-900 font-medium text-xl ml-3 text-left"> 00.00 </div>
            </div>
            <div class="flex align-items-center justify-content-center bg-red-100 border-round"
              style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-info-circle text-red-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">0 รายการ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.card-bg{
  background-color: #FFFDE3;
  color: #C21010;

}
</style>
