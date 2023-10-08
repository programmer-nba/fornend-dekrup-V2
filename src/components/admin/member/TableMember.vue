<template>
  <div class="mt-4 ">
    <h1 class="md:m-0 text-center">จัดการข้อมูลผู้ใช้</h1>
    <div class="grid p-fluid px-3 justify-content-center mt-3">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup  flex-1 ">
          <Button icon="pi pi-search" severity="warning" />
          <InputText v-model="search" placeholder="ค้นหาข้อมูล" @keyup="searchDataAutomatically()" class=" font p-3 " />
        </div>
      </div>
    </div>
    <DataTable :value="member" :paginator="true" :rows="10" class="px-3 py-3"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate=" แสดง {first} ถึง {last} ของ {totalRecords} รายการ"
      responsiveLayout="scroll">
      <template #empty>ไม่มีข้อมูล</template>
      <Column field="member_number" header="ไอดีผู้ใช้งาน"></Column>
      <Column field="name" header="ชื่อผู้ใช้งาน"></Column>
      <Column field="username" header="ชื่อผู้ใช้งานระบบ"></Column>
      <Column field="tel" header="เบอร์โทร"></Column>

      <Column field="member_date_start" header="วันที่เริ่มระบบ">
        <template #body="Props">
          {{ datetimeFormat(Props.data.timestamp) }}
        </template>
      </Column>
      <!-- <Column :exportable="false" style="min-width: 8rem">
        <template #body="Props">
          <Button icon="pi pi-list" class="p-button-outlined" @click="openD(Props.data)" /> &nbsp;
          <Button icon="pi pi-trash" class="p-button-outlined p-button-danger" @click="del(Props.data)" />
        </template>
      </Column> -->
    </DataTable>

    <!-- <Dialog v-model:visible="memberDialog" :style="{ width: '900px' }" header="รายละเอียดข้อมูลผู้ใช้งาน" :modal="true"
      class="p-fluid mb-5">
      <div class="grid">
        <div class="col-12">
          <Panel>
            <template #header>ข้อมูลผู้ใช้งาน</template>
            <div class="grid">
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*ชื่อ-นามสกุล :</label>
                  <InputText v-model="member_detail.name" class="w-full font" type="text"
                    placeholder="กรอกชื่อ-นามสกุลของผู้ใช้งาน" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*ชื่อผู้ใช้งาน :</label>
                  <InputText v-model="member_detail.username" class="w-full font" type="text" placeholder="ผู้ใช้งาน" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*เบอร์โทร :</label>
                  <InputText v-model="member_detail.tel" class="w-full font" type="text" placeholder="เบอร์โทร" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*ที่อยู่ :</label>
                  <InputText v-model="member_detail.address" class="w-full font" type="text" placeholder="ที่อยู่" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*ตำบล :</label>
                  <InputText v-model="member_detail.subdistrict" class="w-full font" type="text" placeholder="ตำบล" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*อำเภอ :</label>
                  <InputText v-model="member_detail.district" class="w-full font" type="text" placeholder="อำเภอ" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*จังหวัด :</label>
                  <InputText v-model="member_detail.province" class="w-full font" type="text" placeholder="จังหวัด" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*รหัสไปรษณีย์ :</label>
                  <InputText v-model="member_detail.postcode" class="w-full font" type="text"
                    placeholder="รหัสไปรษณีย์" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>รีเซตรหัส :</label>
                  <Button label="รีเซตรหัส" @click="resetPassword()" class="mr-2" />
                </div>
              </div>
            </div>
            <div class="col-12 md:col-2">
              <div class="field">
                <Button label="อัพเดต" @click="openC()" class="mr-2" />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </Dialog> -->


    <Dialog :style="{ width: '450px' }" header="แก้ไขข้อมูล" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span> คูณต้องการแก้ไขข้อมูลผู้ดูแลระบบนี้ ?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="closeD" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="update" :loading="isloading" />
      </template>
    </Dialog>

    <Dialog :style="{ width: '450px' }" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="delete_name">
          คุณต้องการลบผู้ดูแลระบบ <b>{{ delete_name }} </b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="closeD" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deletedata" :loading="isloading" />
      </template>
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
      confirmDailog: false,
      deleteDailog: false,
      memberDialog: false,
      isloading: false,

    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    dateformat(date) {
      return dayjs(date).locale("th").add(543, "year").format("DD/MMMM/YYYY");
    },

    async searchDataAutomatically() {
      if (this.search !== "") {
    this.member = this.members.filter((el) => {
      // ตรวจสอบค่าที่ไม่ใช่ string
      const memberName = el.name || '';
      const memberUsername = el.member_username || '';
      const memberNumber = el.member_number || '';
      
      return (
        memberName.toString().toLowerCase().includes(this.search.toLowerCase()) ||
        memberUsername.toString().toLowerCase().includes(this.search.toLowerCase()) ||
        memberNumber.toString().toLowerCase().includes(this.search.toLowerCase())
      );
    });
  } else {
    this.member = this.members;
  }
    },

    async getdata() {
      let res = await axios
        .get(`${process.env.VUE_APP_DEKRUP}/member`, {
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

    searchData() {
  if (this.search !== "") {
    this.member = this.members.filter((el) => {
      // ตรวจสอบค่าที่ไม่ใช่ string
      const memberName = el.member_name || '';
      const memberUsername = el.member_username || '';
      
      return (
        memberName.toString().toLowerCase().includes(this.search.toLowerCase()) ||
        memberUsername.toString().toLowerCase().includes(this.search.toLowerCase())
      );
    });
  } else {
    this.member = this.members;
  }
},



    openD(member) {
      this.memberDialog = true;
      this.member_detail = member;
      console.log(this.member_detail);
    },
    del(member) {
      this.deleteDailog = true;
      this.delete_id = member._id;
      this.delete_name = member.member_name;
    },
    openC() {
      this.confirmDailog = true;
    },
    closeD() {
      this.confirmDailog = false;
      this.deleteDailog = false;
    },
    async update() {
      this.isloading = true;
      try {
        await axios.put(
          `${process.env.VUE_APP_DEKRUP}/member${this.member_id}`,
          { 
            
            member_name: this.member_detail.member_name,
            member_username: this.member_detail.member_username,
            member_date_start: this.member_detail.member_date_start,
          },
          {
            headers: {
              "token": localStorage.getItem("token"),
            },
          }
        );
        this.isloading = false;
        this.memberDialog = false;
        this.confirmDailog = false;
      } catch (error) {
        this.isloading = false;
        if (error.response && error.response.status === 408) {
          window.location.reload();
        }
      }
    },

    deletedata() {
      this.isloading = true;
      axios
        .delete(`${process.env.VUE_APP_DEKRUP}member/${this.delete_id}`, {
          headers: {
            "token": localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.isloading = false;
          const i = this.member.findIndex((el) => el._id === this.delete_id);
          this.member.splice(i, 1);
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
    
    datetimeFormat(date){
            return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
        },

    resetPassword() {
      this.$confirm.require({
        message: "ต้องการรีเซตรหัสผ่าน",
        header: "รีเซตรหัสผ่าน",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "ตกลง",
        rejectLabel: "ยกเลิก",
        accept: async () => {
          await axios
            .put(
              `${process.env.VUE_APP_DEKRUP}member/${this.member_id}`,
              {
                member_password: "NBA89988",
              },
              {
                headers: {
                  "token": this.$store.getters.token,
                },
              }
            )
            .then(() => {
              this.$toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "รีเซตรหัสผ่านเรีบบร้อยแล้ว",
                life: 3000,
              });
            })
            .catch((err) => {
              if (err.response.status === 408) {
                window.location.reload();
              }
              this.$toast.add({
                severity: "error",
                summary: "ไม่สำเร็จ",
                detail: err.response.data.message,
                life: 3000,
              });
            });
        },
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

