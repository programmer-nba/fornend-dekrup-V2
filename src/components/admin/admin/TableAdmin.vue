<template>
  <div class="mt-4 ">
    <h1 class="md:m-0 text-center">จัดการข้อมูลผู้ดูแลระบบ</h1>
    <div class="grid p-fluid px-3 justify-content-center mt-3">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup  flex-1 ">
          <Button icon="pi pi-search" severity="warning" />
          <InputText v-model="search" placeholder="ค้นหาข้อมูล" @keyup="searchDataAutomatically()" class="font p-3" />
        </div>
      </div>
    </div>
    <DataTable :value="admin" :paginator="true" :rows="10" class="px-3 py-3"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate=" แสดง {first} ถึง {last} ของ {totalRecords} รายการ"
      responsiveLayout="scroll">
      <template #empty>ไม่มีข้อมูล</template>
      <Column field="name" header="ชื่อผู้ดูแลระบบ"></Column>
      <Column field="username" header="ชื่อผู้ใช้งานระบบ"></Column>
      <Column field="admin_date_start" header="วันที่เริ่มระบบ">
        <template #body="item">
          {{ datetimeFormat(item.data.timestamp) }}
        </template>
      </Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="Props">
          <Button icon="pi pi-trash" class="p-button-outlined p-button-danger" @click="del(Props.data)" />
        </template>
      </Column>
    </DataTable>



  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import Swal from "sweetalert2";

export default {
  created() {
    document.title = "Admin | Dekrub Shop";
  },
  data() {
    return {
      admins: [],
      admin: [],
      search: "",
      admin_id: "",
      delete_id: "",
      delete_name: "",
      isloading: false,
      admin_detail: [],

    };
  },
  mounted() {
    this.getdata();
  },
  methods: {


    async searchDataAutomatically() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/admin`, {
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          params: {
            query: this.search,
          },
        });
        this.admin = response.data.data.filter(admin => admin.name.includes(this.search));
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "ผิดพลาด",
          detail: error.response.data.message,
          life: 3000,
        });
      }
    },

    async getdata() {
      let res = await axios.get(`${process.env.VUE_APP_DEKRUP}/admin`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }).catch((e) => {
        if (e.response.status === 408) {
          window.location.reload();
        }
      });
      this.admins = res.data.data;
      this.admin = this.admins.reverse();
    },

    openD(admin) {
      this.adminDialog = true;
      this.admin_id = admin._id;
      this.admin_detail = admin;
      console.log(this.admin_detail);
    },
    del(admin) {
      this.delete_id = admin._id;
      this.delete_name = admin.admin_username;

      Swal.fire({
        icon: "question",
        title: "ยืนยันการลบ",
        text: `คุณต้องการลบผู้ดูแลระบบ ${this.delete_name} ?`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#C21010",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletedata(); // เมื่อคลิก Yes ให้เรียกเมธอด deletedata()
        } else {
          // คลิก No หรือปิด SweetAlert2 ไม่ต้องทำอะไร
        }
      });
    },


    deletedata() {
      this.isloading = true;

      axios
        .delete(`${process.env.VUE_APP_DEKRUP}/admin/delete/${this.delete_id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(() => {
          const i = this.admin.findIndex((el) => el._id === this.delete_id);
          this.admin.splice(i, 1);
          this.isloading = false;

          Swal.fire({
            icon: "success",
            title: "ลบสำเร็จ",
            text: "ลบข้อมูลเรียบร้อย",
            confirmButtonColor: "#C21010",
            showConfirmButton: false, // ไม่มีปุ่ม "OK"
            timer: 1500, // หายไปในเวลาที่กำหนด (1500 มิลลิวินาที = 1.5 วินาที)

          }).then(() => {
            Swal.close();
          });
        })
        .catch((e) => {
          this.isloading = false;
          if (e.response.status === 408) {
            window.location.reload();
          }
        });
    },

    datetimeFormat(date) {
      return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
    },
  }
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

