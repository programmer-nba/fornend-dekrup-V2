<template>
  <div class="px-4 py-3">
    <h1>เพิ่มข้อมูลผู้ใช้งาน</h1>
  </div>
  <div class="grid px-3">
    <div class="col-12">
      <Panel class="custom-header-panel">
        <template #header>ข้อมูลผู้ดูแลระบบ</template>
        <div class="grid">
          <div class="col-12 md:col-3">
            <div class="field">
              <label>*ชื่อ-นามสกุล :</label>
              <InputText
              v-model="member.member_name"
                class="w-full font"
                type="text"
                placeholder="กรอกชื่อ-นามสกุลของผู้ดูแลระบบ"
              />
            </div>
          </div>
         
        
          <div class="col-12 md:col-3">
            <div class="field">
              <label>*ชื่อผู้ใช้งาน :</label>
              <InputText
              v-model="member.member_username"
                class="w-full font"
                type="text"
                placeholder="ผู้ใช้งาน"
              />
            </div>
          </div>
          <div class="col-12 md:col-3">
            <div class="field">
              <label>*รหัสผ่าน :</label>
              <InputText
              v-model="member.member_password"
                class="w-full font"
                type="password"
                placeholder="รหัสผ่าน"
              />
            </div>
          </div>
        </div>
      </Panel>
    </div>
    <div class="col-12">
      <div class="field">
        <Button @click="save()" label="บันทึก" class="border-red-400" icon="pi pi-fw pi-save" style="background-color: #C21010;" />
      </div>
    </div>
    <Dialog  class="dialog-change"
    v-model:visible="confirmDialog"
      :style="{ width: '450px' }"
      header="ยืนยันบันทึกข้อมูล"
      :modal="true"
    >
      <div class="confirmation-content" >
        <i class="pi pi-exclamation-triangle mr-3 text-red-600" style="font-size: 2rem" />
        <span class="text-red-600"> ต้องการเพิ่มข้อมูลผู้ดูแลระบบนี้ ?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times text-red-600" class="p-button-text text-red-600" />
        <Button
          label="Yes"
          icon="pi pi-check text-red-600"
          class="p-button-text text-red-600"
          @click="addMember()"
          :loading="isloading"

        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "addView",
  data() {
    return {
      member: {
        member_name: "",
        member_username: "",
        member_password: "",
        member_date_start: dayjs(Date.now()).format(),
      },
      confirmDialog: false,
      isloading: false,
    };
  },
  created() {
    document.title = "เพิ่มข้อมูลผู้ดูแลระบบ";
  },
  methods: {
    save() {
      if (
        this.member.member_name === "" ||
        this.member.member_username === "" ||
        this.member.member_password === ""
      )
        this.$toast.add({
          severity: "error",
          summary: "แจ้งเตือน",
          detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
          life: 3000,
        });
      else {
        this.confirmDialog = true;
      }
    },
    async addMember() {
      this.isloading = true;

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_DEKRUP}/admin`,
          {
            name: this.member.member_name,
            username: this.member.member_username,
            password: this.member.member_password,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        this.isloading = false;
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "เพิ่มข้อมูลผู้ดูแลระบบเรียบร้อย",
          life: 3000,
        });
        this.confirmDialog = false;
        this.$router.push("/admin/admin");
      } catch (error) {
        this.isloading = false;
        if (error.response && error.response.status === 408) {
          window.location.reload();
        }
        this.$toast.add({
          severity: "error",
          summary: "แจ้งเตือน",
          detail: error.response
            ? error.response.data.message
            : "มีข้อผิดพลาดในการส่งข้อมูล",
          life: 3000,
        });
        this.confirmDialog = false;
      }
    },
  },
};
</script>

<style>
  .custom-header-panel .p-panel-header {
      background-color: #FFFDE3;
      color: #C21010;
      border-bottom: 1px solid #CFE8A9;
  }
  .custom-header-panel .p-panel-content {
    background-color: #FFFDE3;
    color: #C21010;
    border: none;
}
.dialog-change .p-dialog-content {
    background: #FFFDE3;
}

.dialog-change .p-dialog-header {
    background-color: #FFFDE3;
    color: #C21010;
    /* เปลี่ยนสีตัวหนังสือที่นี่ */
    padding: 0.7rem;
    /* สีเส้นขอบล่าง */
}
.dialog-change .p-dialog-footer {
    background-color: #FFFDE3;
    color: #C21010;
    /* เปลี่ยนสีตัวหนังสือที่นี่ */
    padding: 0.7rem;
    /* สีเส้นขอบล่าง */
}
</style>


