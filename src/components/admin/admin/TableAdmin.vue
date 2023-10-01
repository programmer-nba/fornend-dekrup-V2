<template>
  <div class="mt-4 ">
    <h1 class="md:m-0 text-center">จัดการข้อมูลผู้ดูแลระบบ</h1>
    <div class="grid p-fluid px-3 justify-content-center mt-3">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup  flex-1 ">
          <Button icon="pi pi-search" severity="warning" />
          <InputText v-model="search" placeholder="ค้นหาข้อมูล" @keyup="searchData()" class=" font p-3 " />
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
        <template #body="Props">
          {{ dateformat(Props.data.admin_date_start) }}
        </template>
      </Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="Props">
          <Button icon="pi pi-trash" class="p-button-outlined p-button-danger" @click="del(Props.data)" />
        </template>
      </Column>
    </DataTable>


    <Dialog
      v-model:visible="deleteDailog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span >
      คุณต้องการลบผู้ดูแลระบบ </span>
  </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeD"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deletedata"
          :loading="isloading"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";

export default {
  name: "TableAdmin",
  data() {
    return {
      admins: [],
      admin: [],
      search: "",
      admin_id: "",
      delete_id: "",
      delete_name: "",
      confirmDailog: false,
      deleteDailog: false,
      isloading: false,
      admin_detail: [],

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

    searchData() {
      if (this.search !== "") {
        this.admin = this.admins.filter(
          (el) =>
            el.admin_name.search(this.search) !== -1 ||
            el.admin_username.search(this.search) !== -1
        );
      } else {
        this.admin = this.admins;
      }
    },


    openD(admin) {
      this.adminDialog = true;
      this.admin_id = admin._id;
      this.admin_detail = admin;
      console.log(this.admin_detail);
    },
    del(admin) {
    this.deleteDailog = true;
    this.delete_id = admin._id;
    this.delete_name = admin.admin_username; // แสดง username แทน admin_name
  },
    openC() {
      this.confirmDailog = true;
    },
    closeD() {
      this.confirmDailog = false;
      this.deleteDailog = false;
    },
    deletedata() {
      this.isloading = true;
      axios
        .delete(`${process.env.VUE_APP_DEKRUP}/admin/delete/${this.delete_id}`, {
          headers: {
            "token": localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.isloading = false;
          const i = this.admin.findIndex((el) => el._id === this.delete_id);
          this.admin.splice(i, 1);
          this.$toast.add({
            severity: "success",
            summary: "แจ้งเตือน",
            detail: "ลบข้อมูลเรียบร้อย",
            life: 3000,
          });
          this.deleteDailog = false;
        })
        .catch((e) => {
          this.isloading = false;
          if (e.response.status === 408) {
            window.location.reload();
          }
        });
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

