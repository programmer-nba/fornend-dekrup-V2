<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loader"></div>
  </div>
  <div class="grid">
    <div class="col-12 text-center">
      <h1>รายงานสมัครสมาชิก</h1>
    </div>
    <div class="ml-4 col-3">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon  text-white" style="background-color: #c21010">
          <i class="pi pi-calendar text-xl"></i>
        </span>
        <Calendar inputId="range" icon="pi pi-calendar" selectionMode="range" placeholder="FILTER DATE" class="w-full"
          v-model="day" @date-select="searchDay" />
      </div>
    </div>
    <div class="col-2">
      <Dropdown v-model="product_id" :options="item_product" optionLabel="name" optionValue="_id"
        placeholder="Select Product" class="w-full" @change="filterproduct()" />
    </div>
    <div class="col-1">
      <Button label="Clear All" class="p-button-text p-button-plain" @click="clear"></Button>
    </div>
    <div class="col-1">
      <Button icon="pi pi-file-export" label="Export" @click="exportCSV()" class="mr-2 border-red-700"
        style="background-color: #c21010"></Button>
    </div>
  </div>
  <div>
    <DataTable :value="member" :paginator="true" :rows="10" class="px-3 py-3"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate=" แสดง {first} ถึง {last} ของ {totalRecords} รายการ"
      responsiveLayout="scroll">
      <template #empty>ไม่มีข้อมูล</template>
      <Column field="member_number" header="รหัส"></Column>
      <Column field="name" header="ชื่อผู้ใช้งาน"></Column>
      <Column header="จำนวนเงิน">
        <template #body="item">
          {{ numberDigitFormat(item.data.amount) }}
        </template>
      </Column>
      <Column header="หลักฐานการโอน">
        <template #body="item">
          <Image :src="getImage(item.data.slip_img)" alt="Image" width="50" preview />
          <!-- <img :src="getImage(item.data.slip_img)" class="product-image" style="width: 200px; height: 200px; object-fit: cover;" 
            @click="openImageModal(getImage(item.data.slip_img))" />  -->
        </template>
      </Column>
      <Column header="สถานะ">
        <template #body="item">
          <Chip :class="getStatusColor(item.data.status)" :label="item.data.status[item.data.status.length - 1].status" />
        </template>
      </Column>

      <Column field="member_date_start" header="วันที่เริ่มระบบ">
        <template #body="Props">
          {{ datetimeFormat(Props.data.timestamp) }}
        </template>
      </Column>
      <Column header="ตัวเลือก" style="width: 15%">
        <template #body="item">
          <Button class="p-button-rounded icon-confirm  p-button-icon mr-2" @click="confirmOrder(item.data)"
            v-if="item.data.status[item.data.status.length - 1].status === 'รอตรวจสอบ' && item.data.status[0].status !== 'ยืนยันออเดอร์'">
            <i class="pi pi-check"></i> <!-- ไอคอนถูก -->
          </Button>

          <Button class="p-button-rounded p-button-danger p-button-icon" @click="showCancelConfirmation(item.data)"
            v-if="item.data.status[item.data.status.length - 1].status === 'รอตรวจสอบ' && item.data.status[0].status !== 'ยกเลิกออเดอร์' && item.data._id">
            <i class="pi pi-times"></i>
          </Button>
          <Button v-if="item.data.status[item.data.status.length - 1].status === 'ยืนยันออเดอร์'"
            class="p-button-rounded border-none mr-2" @click="showOrderDetail(item.data)"
            style="background-color: #448EF6;">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>

          </Button>

        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="displayOrderDetail" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '355px' }" header="รายละเอียดออเดอร์" class="dialog-detail">
      <div v-if="selectedOrder">
        <div v-for="(product, index) in selectedOrder.product_detail" :key="index">
          <p class="text-center product-name">{{ product.product_name }}</p>
          <p class="text-center product-detail">รายละเอียด </p>

          <p class="text-center description">{{ product.product_detail }}</p>


          <ul style="list-style-type: none; padding: 0;">
            <li><strong class="description">จำนวน:</strong> {{ product.quantity }}</li>
            <li><strong class="description">ราคา:</strong> {{ product.price }}</li>
            <li><strong class="description">รวม:</strong> {{ product.totalprice }}</li>
          </ul>
        </div>

      </div>

      <template #footer>
        <Button label="ปิด" class="border-red-600 close" @click="closeOrderDetailDialog" />
      </template>
    </Dialog>

  </div>
</template>

<script>
import { ConfirmService } from '@/components/lib/OrderService';
import axios from 'axios';
import dayjs from "dayjs";
import "dayjs/locale/th";
import Swal from 'sweetalert2';
import { ref } from "vue";
import * as XLSX from "xlsx";
export default {
  setup() {
    const isLoading = ref(false);

    const OrderService = new ConfirmService();
    return {
      OrderService,
      isCancelling: false,
    }
  },

  created() {
    document.title = "Order New Member | Dekrub Shop";
  },

  data() {
    return {
      loading: false,
      isDisabled: false,
      isLoading: false,

      members: [],
      member: [],
      search: "",
      member_id: "",
      delete_id: "",
      delete_name: "",
      isloading: false,
      selectedImage: "",
      display: false,
      itemToCancel: null,
      displayOrderDetail: false,
      orderDetail: null,

      day: "",
      item_member: "",
      item_product: "",
      product_id: "",
    };
  },
  async mounted() {
    await this.getOrder();
    await this.getMember();
    await this.getProduct();
  },
  methods: {

    async searchDataAutomatically() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/order/member/new/list`, {
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          params: {
            query: this.search,
          },
        });
        this.member = response.data.data.filter(member => member.name.includes(this.search));
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "ผิดพลาด",
          detail: error.response.data.message,
          life: 3000,
        });
      }
    },

    async showOrderDetail(order) {
      try {
        const response = await this.OrderService.GetOrder();
        if (response && response.data) {
          const orderDetail = response.data.find((item) => item._id === order._id);
          if (orderDetail) {
            this.selectedOrder = orderDetail;
            this.displayOrderDetail = true; // แสดง Dialog รายละเอียดออเดอร์
          } else {
            console.error("ไม่พบข้อมูลรายละเอียดออเดอร์");
          }
        } else {
          console.error("API response is missing data property.");
        }
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    },

    hideDialog() {
      this.display = false;
      this.itemToCancel = null;
    },

    showSuccessAlert() {
      Swal.fire({
        title: 'ยืนยันสำเร็จ!',
        text: 'การรับออเดอร์ได้รับการยืนยันเรียบร้อยแล้ว',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.getOrder();
        this.isLoading = false;
      });
    },

    showCancelConfirmation(item) {
      Swal.fire({
        title: 'ยืนยันการยกเลิกออเดอร์?',
        text: 'คุณต้องการยกเลิกออเดอร์นี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ปิด',
        confirmButtonColor: '#C70039', // กำหนดสีของปุ่มยืนยัน
        cancelButtonColor: '#96B6C5', // กำหนดสีของปุ่มยกเลิก
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirmCancel(item);
        }
      });
    },

    async confirmCancel(itemData) {
      if (itemData && itemData._id) {
        console.log("ข้อมูลที่จะถูกส่งไปยัง API สำหรับยกเลิกออเดอร์:", itemData);

        try {
          const response = await this.OrderService.CancelOrder(itemData._id);

          if (response) {
            console.log("API ตอบกลับ:", response);

            const index = this.member.findIndex((memberItem) => memberItem._id === itemData._id);

            if (index !== -1) {
              this.member[index].status[0].status = 'ยกเลิกออเดอร์';

              // ลบรายการที่ถูกยกเลิกออเดอร์ออกจาก this.member
              this.member.splice(index, 1);
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
    },


    async getOrder() {
      try {
        const result = await this.OrderService.GetOrder();

        if (result && result.data) {
          this.order = result.data;

          if (this.name !== '') {
            this.getorder = this.order.filter(
              (item) => item.servicename === this.name && item.status[item.status.length - 1].status !== 'ยกเลิกออเดอร์'
            );
            this.member = this.getorder.reverse();
          }
        } else {
          console.error("API response is missing data property.");
        }
      } catch (err) {
        console.error("Error while fetching orders:", err);
        this.$store.commit('setLoading', false);
        this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response?.data?.message || 'เกิดข้อผิดพลาดในการเรียก API', life: 3000 });
      }
    },

    async getMember() {
      await axios.get(`${process.env.VUE_APP_DEKRUP}/member`, {
        headers: {
          'token': `${localStorage.getItem('token')}`
        }
      }).then((res) => {
        this.item_member = res.data.data;
      })
    },

    async getProduct() {
      await axios.get(`${process.env.VUE_APP_DEKRUP}/product/list`, {
        headers: {
          'token': `${localStorage.getItem('token')}`
        }
      }).then((res) => {
        this.item_product = res.data.data;
      })
    },

    async confirmOrder(item) {
      this.isLoading = true;

      if (item.status && item.status.length > 0 && item.status[0].status === 'รอตรวจสอบ') {
        try {
          await this.OrderService.ConfirmOrder(item._id);
          item.status[0].status = 'ยืนยันออเดอร์';

          const index = this.member.findIndex((memberItem) => memberItem._id === item._id);

          if (index !== -1) {
            this.member[index].status[0].status = 'ยืนยันออเดอร์';
          }

          this.isLoading = false;
          this.showSuccessAlert();
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการยืนยันออเดอร์:", error);
          this.isLoading = false;
        }
      } else {
        console.error("ข้อมูลไม่ถูกต้อง");
        this.isLoading = false;
      }
    },

    getImage(item) {
      if (typeof item === 'string') {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    },

    datetimeFormat(date) {
      return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
    },
    openImageModal(imageUrl) {
      this.selectedImage = imageUrl;
    },

    closeOrderDetailDialog() {
      this.displayOrderDetail = false;
      this.selectedOrder = null;
    },

    getStatusColor(statusArray) {
      const latestStatus = statusArray[statusArray.length - 1];
      switch (latestStatus.status) {
        case 'รอตรวจสอบ':
          return 'bg-yellow-500 text-white';
        case 'ยืนยันออเดอร์':
          return 'bg-green-500 text-white';
        default:
          return '';
      }
    },

    exportCSV() {
      const newData = [];

      this.member.map((item) => {
        newData.push({
          "วันที่": this.datetimeFormat(item.timestamp),
          "รหัสสินค้า": this.getCodeProduct(item.product_detail[0].product_id),
          "ชื่อสินค้า": this.getNameProduct(item.product_detail[0].product_id),
          "จำนวน": item.product_detail[0].quantity,
          "ชื่อผู้สั่ง": this.getNameMember(item.member_number),
          "เบอร์โทรผู้สั่ง": this.getTelMember(item.member_number),
          "ที่อยู่จัดส่ง": this.getAddressMember(item.member_number),
        })
      })

      const dataArr = newData.map((row) => [
        row["วันที่"],
        row["รหัสสินค้า"],
        row["ชื่อสินค้า"],
        row["จำนวน"],
        row["ชื่อผู้สั่ง"],
        row["เบอร์โทรผู้สั่ง"],
        row["ที่อยู่จัดส่ง"]
      ]);

      dataArr.unshift(["วันที่", "รหัสสินค้า", "ชื่อสินค้า", "จำนวน", "ชื่อผู้สั่ง", "เบอร์โทรผู้สั่ง", "ที่อยู่จัดส่ง"]);
      const ws = XLSX.utils.json_to_sheet(dataArr);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws);
      XLSX.writeFile(wb, "PreOrderNewMemberAll.xlsx");
    },

    searchDay() {
      if (this.day && this.day[0] !== 0 && this.day[1] !== 0) {
        this.member = this.member.filter(
          (item) => dayjs(item.timestamp).format() >= dayjs(this.day[0]).format() &&
            dayjs(item.timestamp).format() <= dayjs(this.day[1]).add(1, "day").format()
        )
      }
    },

    clear() {
      this.day = "";
      this.product_id = "";
      this.getOrder();
      this.getMember();
      this.getProduct();
    },

    getLastStatus(item) {
      const data = item[item.length - 1].status;
      return data
    },

    getNameMember(item) {
      const member = this.item_member.find((el) => el.member_number === item)
      if (member) {
        return member.name;
      } else {
        return 'สมาชิกนี้ไม่มีในฐานข้อมูลแล้ว...';
      }
    },

    getCodeProduct(item) {
      const product = this.item_product.find((el) => el._id === item)
      if (product) {
        return product.code;
      } else {
        return 'สินค้านี้ไม่มีในฐานข้อมูลแล้ว...';
      }
    },

    getNameProduct(item) {
      const product = this.item_product.find((el) => el._id === item)
      if (product) {
        return product.name;
      } else {
        return 'สินค้านี้ไม่มีในฐานข้อมูลแล้ว...';
      }
    },

    getTelMember(item) {
      const member = this.item_member.find((el) => el.member_number === item)
      if (member) {
        return member.tel;
      } else {
        return 'สมาชิกนี้ไม่มีในฐานข้อมูลแล้ว...';
      }
    },

    getAddressMember(item) {
      const member = this.item_member.find((el) => el.member_number === item)
      if (member) {
        const address = `${member.address} ${member.subdistrict} ${member.district} ${member.province} ${member.postcode}`
        return address;
      } else {
        return 'สมาชิกนี้ไม่มีในฐานข้อมูลแล้ว...';
      }
    },

    numberDigitFormat(num) {
      return num.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    },

    filterproduct() {
      if (this.product_id !== "") {
        const id = this.getCodeProduct(this.product_id);
        console.log(this.member)
        this.member = this.member.filter(
          (item) => this.getCodeProduct(item.product_detail[0].product_id) === id
        )
      }
    },
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.icon-confirm {
  background-color: #379237;
  border: none;
}

.dialog-detail .p-dialog-content {
  background-color: #ecf0ff;
  padding: 20px;

}

.dialog-detail .p-dialog-header {
  background-color: #ecf0ff;
  color: #C21010;
  padding: 0.7rem;
}

.dialog-detail .p-dialog-footer {
  background-color: #bed6fb;
  color: #C21010;
  padding: 0 0 0 0;
}

.close {
  background-color: #D92027;
  width: 100%;
}

.close:hover {
  background-color: #B20600;
}

.product-name {
  font-size: 3rem;
  line-height: 1;
  font-weight: 700;
  gap: 4px;
  color: #072541;
}

.product-detail {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  margin-top: 10px;
  color: #072541;

}

.description {
  font-size: 1rem;
  text-align: center;
  margin-top: 2px;
  color: #072541;

}

.full-width-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  /* ปรับระยะขอบต่าง ๆ ตามที่คุณต้องการ */
}</style>

