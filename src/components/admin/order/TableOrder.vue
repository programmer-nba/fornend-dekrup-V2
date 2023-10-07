<template>
  <div v-if="isLoading" class="">
    <span class="loader"></span>
  </div>
  <div class="grid p-fluid px-3 justify-content-center">
    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon border-none" style="background-color: #C21010;">
          <i class="pi pi-search text-white"></i>
        </span>
        <InputText v-model="search" placeholder="ค้นหาข้อมูล" class="z-0" @keyup="searchDataAutomatically()" />
      </div>
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

    <!-- เพิ่มเงื่อนไขเพื่อไม่แสดงปุ่มรายละเอียดเมื่อสถานะล่าสุดเป็น 'ยืนยันออเดอร์' -->
    <Button icon="pi pi-search" label="รายละเอียด" class="p-button-outlined p-button-sm text-sm text-teal-300 mr-2"
      @click="showOrderDetails(rowData)" v-if="rowData.data.status[rowData.data.status.length - 1].status !== 'ยืนยันออเดอร์'" />

    <Button class=" p-button-success p-button-icon mr-2 mt-2" @click="confirmOrder(rowData.data)"
      v-if="rowData.data.status[rowData.data.status.length - 1].status === 'รอตรวจสอบ' && rowData.data.status[0].status !== 'ยืนยันออเดอร์'">
      <i class="pi pi-check"></i>
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

  <Dialog v-model="showOrderDetailsDialog" header="รายละเอียดออเดอร์" :modal="true" :baseZIndex="10000"
    :visible="showOrderDetailsDialog" width="80%">
    <div class="p-fluid">

      <!-- ตรวจสอบว่า orderData ไม่เป็น null ก่อนที่จะแสดงรายละเอียด -->
      <template v-if="orderData">
        <p><strong>รายการสินค้า:</strong></p>
        <ul>

          <li v-for="product in orderData.product_detail" :key="product._id">
            {{ product.product_name }}   <br>
            จำนวน: {{ product.quantity }}  <br>
            - ราคา: {{ product.price }} บาท
          </li>
        </ul>
        <p><strong>ราคารวม:</strong> {{ orderData.totalprice }} บาท</p>
        <p><strong>หลักฐานการชำระเงิน:</strong></p>

        <div v-if="orderData.picture && orderData.picture.length > 0">
          <div v-for="imageId in orderData.picture" :key="imageId">
            <img :src="'https://drive.google.com/uc?export=view&id=' + imageId" alt="หลักฐานการชำระเงิน"
              style="max-width: 450px;" />
          </div>
        </div>
        <div v-else>
          <p>ไม่พบหลักฐานการชำระเงิน</p>
        </div>
      </template>
    </div>
    <div class="p-dialog-footer">
      <Button label="ปิด" icon="pi pi-times" class="p-button-text" @click="closeOrderDetailsDialog" />
    </div>
  </Dialog>
</template>

<script>
import { ConfirmOrder } from '@/components/lib/order';
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
    const showOrderDetailsDialog = ref(false);
    const orderData = ref(null); // เพิ่มตัวแปร orderData

    const Order = new ConfirmOrder();

    onMounted(async () => {
      getOrder();
    });

    const searchDataAutomatically = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/list`, {
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          params: {
            query: search.value, // ใช้ค่า search แทน this.search
          },
        });
        orders.value = response.data.data.filter(order => order.name.includes(search.value));
      } catch (error) {
        console.error("Error fetching data:", error);
        // เพิ่มการจัดการข้อผิดพลาดที่นี่
      }
    };



    const closeOrderDetailsDialog = () => {
      showOrderDetailsDialog.value = false;
    };



    const showOrderDetails = (rowData) => {
      if (rowData && rowData.data) {
        const orderItems = rowData.data.product_detail.map(item => ({
          productName: item.product_name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalprice,
        }));

        // นำรูปภาพหลักฐานการโอนเงินจากรายการออเดอร์
        const proofImages = rowData.data.picture.map(imageId => `https://drive.google.com/uc?export=view&id=${imageId}`);

        console.log('รายการสินค้า:', orderItems);
        console.log('รูปภาพหลักฐานการโอนเงิน:', proofImages);

        // ตั้งค่าค่า `orderData` เพื่อนำไปใช้ใน Dialog
        orderData.value = rowData.data;

        showOrderDetailsDialog.value = true;
      } else {
        console.error('ข้อมูลไม่ถูกต้องหรือไม่มีข้อมูลออเดอร์');
      }
    };


    const getOrder = async () => {
      isLoading.value = true;

      try {
        const result = await Order.GetOrder();

        if (result && result.data) {
          // กรองรายการที่ไม่มีสถานะเป็น 'ยกเลิกออเดอร์'
          orders.value = result.data.filter(
            (item) => item.status[item.status.length - 1].status !== 'ยกเลิกออเดอร์'
          );
        } else {
          console.error("API response is missing data property.");
        }
      } catch (err) {
        console.error("Error while fetching orders:", err);
      } finally {
        isLoading.value = false;
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
          const response = await Order.ConfirmOrder(item._id);
          console.log("ข้อมูลที่รับมาจาก API:", response); // เพิ่มบรรทัดนี้

          item.status[0].status = 'ยืนยันออเดอร์';

          showSuccessAlert();
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการยืนยันออเดอร์:", error);
        } finally {
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
      isLoading.value = true;

      if (itemData && itemData._id) {
        console.log("ข้อมูลที่จะถูกส่งไปยัง API สำหรับยกเลิกออเดอร์:", itemData);

        try {
          const response = await Order.CancelOrder(itemData._id);

          if (response) {
            console.log("API ตอบกลับ:", response);

            const index = orders.value.findIndex((orderItem) => orderItem._id === itemData._id);

            if (index !== -1) {
              orders.value.splice(index, 1);
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
        } finally {
          isLoading.value = false;
        }
      } else {
        console.error("ข้อมูลไม่ถูกต้องหรือไม่มีคุณสมบัติ _id");
        isLoading.value = false;

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
      isLoading,
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
      searchDataAutomatically,
      showOrderDetails,
      closeOrderDetailsDialog,
      showOrderDetailsDialog,
      orderData, // คืนค่า orderData เพื่อใช้ในเทมเพลต

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

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite
}

.loader::before,
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 5px solid #FFF;
  animation: prixClipFix 2s linear infinite;
}

.loader::after {
  transform: rotate3d(90, 90, 0, 180deg);
  border-color: #FF3D00;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
  }

  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
  }

  75%,
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
  }
}</style>



