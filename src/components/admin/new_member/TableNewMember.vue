<template>
  <div class="mt-4 ">
    <h1 class="md:m-0 text-center">รายงานสมัครสมาชิก</h1>
    <div class="grid p-fluid px-3 justify-content-center mt-3">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup  flex-1 ">
          <Button icon="pi pi-search" severity="warning" />
          <InputText v-model="search" placeholder="ค้นหาข้อมูล" @keyup="searchData()" class=" font p-3 " />
        </div>
      </div>
    </div>
    <DataTable :value="member" :paginator="true" :rows="10" class="px-3 py-3"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate=" แสดง {first} ถึง {last} ของ {totalRecords} รายการ"
      responsiveLayout="scroll">
      <template #empty>ไม่มีข้อมูล</template>
      <Column field="member_number" header="รหัส"></Column>
      <Column field="name" header="ชื่อผู้ใช้งาน"></Column>
      <Column field="amount" header="จำนวนเงิน"></Column>
      <Column header="หลักฐานการโอน">
        <template #body="item">
          <img :src="getImage(item.data.slip_img)" class="product-image" style="width: 200px"
            @click="openImageModal(getImage(item.data.slip_img))" /> </template>
      </Column>
      <Column header="สถานะ">
        <template #body="item">
          <Chip :class="getStatusColor(item.data.status)" :label="item.data.status[item.data.status.length - 1].status" />
        </template>
      </Column>

      <Column field="member_date_start" header="วันที่เริ่มระบบ">
        <template #body="Props">
          {{ dateformat(Props.data.member_date_start) }}
        </template>
      </Column>
      <Column header="ตัวเลือก" style="width: 15%">
        <template #body="item">
          <Button class="p-button-rounded p-button-warning p-button-icon mr-2" @click="confirmOrder(item.data)"
            v-if="item.data.status[item.data.status.length - 1].status === 'รอตรวจสอบ' && item.data.status[0].status !== 'ยืนยันออเดอร์'">
            <i class="pi pi-check"></i> <!-- ไอคอนถูก -->
          </Button>

          <Button class="p-button-rounded p-button-danger p-button-icon" @click="showDialog(item.data)"
            v-if="item.data.status[item.data.status.length - 1].status === 'รอตรวจสอบ' && item.data.status[0].status !== 'ยืนยันออเดอร์'">
            <i class="pi pi-ban"></i>
          </Button>

        </template>
      </Column>


    </DataTable>

    <Dialog :visible="display" :modal="true" @hide="hideDialog">
      <div>ต้องการยกเลิกรายการนี้หรือไม่?</div>
      <div class="p-fluid">
        <div class="p-field">
          <Button label="ตกลง" class="bg-green-500 mb-2 border-none" @click="confirmCancel(selectedItem)" />
          <Button label="ปิด" @click="hideDialog" />
        </div>
      </div>
    </Dialog>

    <Dialog :visible="showImageModal" :modal="true" :baseZIndex="10000" @hide="showImageModal = false">
      <div class="p-fluid">
        <img :src="selectedImage" alt="รูปภาพ" style="width: 100%;" />
      </div>
      <div class="flex justify-content-center">
        <Button label="ปิด" icon="pi pi-times" class="justify-content-center p-button-danger mr-2"
          @click="showImageModal = false" />
      </div>
    </Dialog>




  </div>
</template>

<script>
import { ConfirmService } from '@/components/lib/OrderService';
import dayjs from "dayjs";
import "dayjs/locale/th";

export default {
  setup() {
    const OrderService = new ConfirmService();
    return { OrderService }
  },
  name: "Tablemember",
  data() {
    return {
      members: [],
      member: [],
      search: "",
      member_id: "",
      delete_id: "",
      delete_name: "",
      isloading: false,
      showImageModal: false,
      selectedImage: "",
      display: false,
      itemToCancel: null,
      selectedItem: null, // เพิ่มตัวแปร selectedItem

    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    dateformat(date) {
      return dayjs(date).locale("th").add(543, "year").format("DD/MMMM/YYYY");
    },
    showDialog(item) {
      // เซ็ต selectedItem เมื่อคลิกปุ่มเพื่อเก็บข้อมูลที่คุณต้องการส่งใน Dialog
      this.selectedItem = item;
      this.display = true;
    },


  hideDialog() {
    this.display = false;
    this.itemToCancel = null;
  },

  confirmCancel(itemData) {
      if (itemData && itemData._id) {
        // ใช้ selectedItem ในการส่งข้อมูล
        this.$emit("cancel-item", itemData);
        this.hideDialog();

        const index = this.member.findIndex((memberItem) => memberItem._id === itemData._id);
        if (index !== -1) {
          this.member.splice(index, 1);
        }
      } else {
        console.error("ข้อมูลไม่ถูกต้องหรือไม่มีคุณสมบัติ _id");
      }
    },


    async getOrder() {
      await this.OrderService.GetOrder().then(result => {
        this.order = result.data;
        if (this.name !== '') {
          this.getorder = this.order.filter(
            (item) => item.servicename === this.name
          )
          this.member = this.getorder.reverse();
        }
      }).catch((err) => {
        this.$store.commit('setLoading', false);
        this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
      })
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
    async confirmOrder(item) {
      console.log("item:", item);

      if (item.status && item.status.length > 0 && item.status[0].status === 'รอตรวจสอบ') {
        await this.OrderService.ConfirmOrder(item._id).then(async (result) => {
          item.status[0].status = 'ยืนยันออเดอร์';

          const index = this.member.findIndex((memberItem) => memberItem._id === item._id);

          if (index !== -1) {
            this.member[index].status[0].status = 'ยืนยันออเดอร์';
          }

          console.log(result);

          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ยืนยันการรับออเดอร์สำเร็จ",
            life: 3000,
          });
        });
      } else {
        console.error("ข้อมูลไม่ถูกต้อง");
      }
    },

   

    openImageModal(imageUrl) {
      this.selectedImage = imageUrl;
      this.showImageModal = true;
    },
    
    searchData() {
  if (this.search !== "") {
    this.member = this.members.filter(
      (el) =>
        el.member_name.search(this.search) !== -1
    );
  } else {
    this.member = this.members;
  }
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

