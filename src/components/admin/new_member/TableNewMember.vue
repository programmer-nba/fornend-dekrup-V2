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
          <Chip :label="item.data.status[0].status" />
        </template>
      </Column>
      <Column field="member_date_start" header="วันที่เริ่มระบบ">
        <template #body="Props">
          {{ dateformat(Props.data.member_date_start) }}
        </template>
      </Column>
      <Column header="ตัวเลือก" style="width: 15%">
        <template #body="item">
          <Button label="ยืนยัน" class="p-button-rounded p-button-warning mr-2"  @click="confirmOrder(item.data.receiptnumber)" />
          <Button label="ยกเลิก" class="p-button-rounded p-button-danger mr-2" />

        </template>
      </Column>

    </DataTable>

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
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";

export default {
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
      showImageModal: false, // เพิ่มตัวแปรนี้
      selectedImage: "", // เพิ่มตัวแปรนี้เพื่อเก็บ URL ของรูปที่เลือก
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    dateformat(date) {
      return dayjs(date).locale("th").add(543, "year").format("DD/MMMM/YYYY");
    },

    async getdata() {
      let res = await axios
        .get(`${process.env.VUE_APP_DEKRUP}/order/member/new/list`, {
          headers: {
            "token": localStorage.getItem("token"),
          },
        })
        .catch((e) => {
          if (e.res.status === 408) {
            window.location.reload();
          }
        });
      this.members = res.data.data;
      this.member = this.members.reverse();
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

    async confirmOrder(orderReceiptNumber) {
  try {
    await axios.post(`${process.env.VUE_APP_DEKRUP}/order/member/new/confirm/${orderReceiptNumber}`, {
    }, {
      headers: {
        "token": localStorage.getItem("token"),
      },
    });

    this.getdata();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดขณะยืนยันออเดอร์", error);
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
            el.member_name.search(this.search) !== -1 ||
            el.member_username.search(this.search) !== -1
        );
      } else {
        this.member = this.members;
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

