<template>
  <div class="grid p-fluid px-3 justify-content-center">
    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon border-none" style="background-color: #C21010;">
          <i class="pi pi-search text-white"></i>
        </span>
        <InputText placeholder="ค้นหาข้อมูล" class="z-0" />
      </div>
    </div>
    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon border-none" style="background-color: #C21010;">
          <i class="pi pi-calendar text-white"></i>
        </span>
        <Calendar inputId="range" class="z-0" selectionMode="single" :manualInput="false" :showButtonBar="true"
          :value="selectedDate" @input="handleDateChange" />


      </div>
    </div>
    <div class="col-12 md:col-1">
      <Button label="Clear" class="border-red-500" icon="pi pi-refresh" style="background-color: #C21010;"></Button>
    </div>
  </div>
  <DataTable :value="orders" :immutable="false" stripedRows responsiveLayout="scroll" :paginator="true" :rows="20"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ" class="px-3">
    <!-- โค้ดเก่าในส่วนของ template อื่น ๆ ให้เหมือนเดิม -->
    <template #empty>
      <p class="font-italic text-center text-5xl" style="color: #BD1616;">ไม่พบข้อมูลใบสั่งชื้อ</p>
    </template>

    <Column header="เลขที่ใบสั่งชื้อ" style="width: 15%;">
      <template #body="item">
        {{ item.data.receiptnumber }}
      </template>
    </Column>
    <Column header="ชื่อ" style="width: 15%;">
      <template #body="item">
        {{ item.data.customer_name }}
      </template>
    </Column>
    <Column header="ที่อยู่" style="width: 25%;">
      <template #body="item">
        {{ item.data.customer_address }}
      </template>
    </Column>
    <Column header="สถานะ">
      <template #body="item">
        <Chip :class="getStatusColor(item.data.status)" :label="item.data.status[item.data.status.length - 1].status" />
      </template>
    </Column>
    <Column field="timestamp" header="วันที่ทำรายการ" style="width: 10%;">
      <template #body="item">
        {{ new Date(item.data.timestamp).toLocaleString() }}
      </template>
    </Column>
    <Column :exportable="false" style="min-width: 8rem">
      <template #body="rowData">
        <Button icon="pi pi-print" label="พิมพ์ใบส่งสินค้า"
          class="p-button-outlined p-button-sm text-sm text-teal-300 mr-2" @click="showDialog(rowData)" />

        <Button class="p-button-rounded p-button-warning p-button-icon mr-2" @click="confirmOrder(rowData.data)"
          v-if="rowData.data.status[rowData.data.status.length - 1].status === 'รอตรวจสอบ' && rowData.data.status[0].status !== 'ยืนยันออเดอร์'">
          <i class="pi pi-check"></i> <!-- ไอคอนถูก -->
        </Button>

        <Button class=" p-button-danger p-button-icon" @click="showCancelConfirmation(rowData.data)"
          v-if="rowData.data.status[rowData.data.status.length - 1].status === 'รอตรวจสอบ' && rowData.data.status[0].status !== 'ยกเลิกออเดอร์' && rowData.data._id">
          <i class="pi pi-times"></i>
        </Button>

      </template>
    </Column>
  </DataTable>


  <Dialog class="dialog-change" v-model:visible="Dialogbill" :style="{ width: '450px' }" header="ใบส่งสินค้า"
    :modal="true">
    <img :src="selectedItemImage" class="product-image" style="width: 200px;" />
    <template #footer>
      <Button label="ปิด" icon="pi pi-times text-red-600" class="p-button-text text-red-600" @click="closeDialog" />
    </template>
  </Dialog>
</template>

<script>
import { ConfirmOrder } from '@/components/lib/order';
import dayjs from "dayjs";
import "dayjs/locale/th";
import Swal from 'sweetalert2';

import { onMounted, ref } from 'vue';

export default {
  setup() {
    const orders = ref([]);
    const Dialogbill = ref(false);
    const selectedItemImage = ref('');
    const selectedDate = ref(null);
    const isLoading = ref(false);

    const Order = new ConfirmOrder();

    onMounted(async () => {
      getOrder();
    });

    const getOrder = async () => {
      try {
        const result = await Order.GetOrder();

        if (result && result.data) {
          orders.value = result.data;
        } else {
          console.error("API response is missing data property.");
        }
      } catch (err) {
        console.error("Error while fetching orders:", err);
        isLoading.value = false;
        Swal.fire({
          title: 'ผิดพลาด!',
          text: err.response?.data?.message || 'เกิดข้อผิดพลาดในการเรียก API',
          icon: 'error',
          timer: 3000,
        });
      }
    };



    const showDialog = (rowData) => {
      selectedItemImage.value = getImage(rowData.data.picture);
      Dialogbill.value = true;
    };

    const closeDialog = () => {
      Dialogbill.value = false;
    };

    const getImage = (item) => {
      if (typeof item === 'string') {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    };

    const showSuccessAlert = () => {
      Swal.fire({
        title: 'ยืนยันสำเร็จ!',
        text: 'การรับออเดอร์ได้รับการยืนยันเรียบร้อยแล้ว',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {

      });
    };

    const confirmOrder = async (item) => {
      isLoading.value = true;

      if (item.status && item.status.length > 0 && item.status[0].status === 'รอตรวจสอบ') {
        try {
          await Order.ConfirmOrder(item._id);
          item.status[0].status = 'ยืนยันออเดอร์';
          isLoading.value = false;
          showSuccessAlert();
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการยืนยันออเดอร์:", error);
          isLoading.value = false;
        }
      } else {
        console.error("ข้อมูลไม่ถูกต้อง");
        isLoading.value = false;
      }
    };




    const showCancelConfirmation = (itemData) => {
      Swal.fire({
        title: 'ยืนยันการยกเลิกออเดอร์?',
        text: 'คุณต้องการยกเลิกออเดอร์นี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          confirmCancel(itemData);
        }
      });
    };

    const confirmCancel = async (itemData) => {
  if (itemData && itemData._id) {
    console.log("ข้อมูลที่จะถูกส่งไปยัง API สำหรับยกเลิกออเดอร์:", itemData);

    try {
      const response = await Order.CancelOrder(itemData._id);

      if (response) {
        console.log("API ตอบกลับ:", response);

        const index = orders.value.findIndex((orderItem) => orderItem._id === itemData._id);

        if (index !== -1) {
          orders.value.splice(index, 1); // ลบข้อมูลที่ถูกยกเลิกออกจาก orders array
        }

        Swal.fire({
          title: 'ยกเลิกสำเร็จ!',
          text: 'ออเดอร์ได้รับการยกเลิกเรียบร้อยแล้ว',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("API ตอบกลับไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการยกเลิกออเดอร์:", error);
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถยกเลิกออเดอร์ได้ในขณะนี้',
        icon: 'error',
      });
    }
  } else {
    console.error("ข้อมูลไม่ถูกต้องหรือไม่มีคุณสมบัติ _id");
  }
};





    const getStatusColor = (statusArray) => {
      const latestStatus = statusArray[statusArray.length - 1];
      switch (latestStatus.status) {
        case 'รอตรวจสอบ':
          return 'bg-yellow-500 text-white';
        case 'ยืนยันออเดอร์':
          return 'bg-green-500 text-white';
        default:
          return '';
      }
    };

    return {
      orders,
      showDialog,
      closeDialog,
      selectedItemImage,
      Dialogbill,
      confirmOrder,
      Order,
      getStatusColor,
      selectedDate,
      showCancelConfirmation,
      confirmCancel,
      showSuccessAlert,
    };
  },
};

</script>

















<style>
.p-datatable .p-datatable-thead>tr>th {
  background-color: #FFFDE3 !important;
  color: #C21010;
  border-bottom: 1px solid #CFE8A9;
}

.p-datatable .p-datatable-tbody>tr>td {
  margin-bottom: 1.5rem;
}

.p-datatable .p-datatable-footer {
  background-color: #FFE6F7 !important;
  border: none;
}

.p-paginator {
  padding: 0;
  margin-top: 1.5rem;
  border-radius: 40px;
}
</style>



