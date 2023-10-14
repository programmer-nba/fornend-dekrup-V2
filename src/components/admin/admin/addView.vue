<template>
  <div class="px-4 py-3">
    <h1>เพิ่มข้อมูลผู้ดูแลระบบ</h1>
  </div>
  <div class="grid px-3">
    <div class="col-12">
      <Panel class="custom-header-panel">
        <template #header>ข้อมูลผู้ดูแลระบบ</template>
        <div class="grid">
          <div class="col-12 md:col-3">
            <div class="field">
              <label>*ชื่อ-นามสกุล :</label>
              <InputText v-model="admin.admin_name" class="w-full font" type="text"
                placeholder="กรอกชื่อ-นามสกุลของผู้ดูแลระบบ" />
            </div>
          </div>


          <div class="col-12 md:col-3">
            <div class="field">
              <label>*ชื่อผู้ใช้งาน :</label>
              <InputText v-model="admin.admin_username" class="w-full font" type="text" placeholder="ผู้ใช้งาน" />
            </div>
          </div>
          <div class="col-12 md:col-3">
            <div class="field">
              <label>*รหัสผ่าน :</label>
              <InputText v-model="admin.admin_password" class="w-full font" type="password" placeholder="รหัสผ่าน" />
            </div>
          </div>
        </div>
      </Panel>
    </div>
    <div class="col-12">
      <div class="field">
        <Button @click="save()" label="บันทึก" class="border-red-400" icon="pi pi-fw pi-save"
          style="background-color: #C21010;" />
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default {
  name: "addView",
  data() {
    return {
      admin: {
        admin_name: "",
        admin_username: "",
        admin_password: "",
        admin_date_start: dayjs(Date.now()).format(),
      },
      confirmDialog: false,
      isloading: false,
    };
  },
  created() {
    document.title = "Add Admin | Dekrub Shop";
  },
  methods: {
    save() {
      if (
        this.admin.admin_name === "" ||
        this.admin.admin_username === "" ||
        this.admin.admin_password === ""
      ) {
        // แจ้งเตือนข้อมูลไม่ครบ
        Swal.fire({
          icon: "error",
          title: "แจ้งเตือน",
          text: "กรุณากรอกข้อมูลให้ครบถ้วน",
          confirmButtonColor: "#C21010",
        });
      } else {
        // แสดง SweetAlert2 สำหรับการยืนยัน
        this.showConfirmDialog();
      }
    },
    showConfirmDialog() {
      Swal.fire({
        icon: "question",
        title: "ยืนยันบันทึกข้อมูล",
        text: "ต้องการเพิ่มข้อมูลผู้ดูแลระบบนี้?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#C21010",
      }).then((result) => {
        if (result.isConfirmed) {
          this.addAdmin();
        }
      });
    },
    async addAdmin() {
      this.isloading = true;

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_DEKRUP}/admin`,
          {
            name: this.admin.admin_name,
            username: this.admin.admin_username,
            password: this.admin.admin_password,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        this.isloading = false;

        // เมื่อบันทึกสำเร็จแสดง SweetAlert2
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          text: "เพิ่มข้อมูลผู้ดูแลระบบเรียบร้อย",
          confirmButtonColor: "#C21010",
          showConfirmButton: false, // ไม่มีปุ่ม "OK"
          timer: 1500, // หายไปในเวลาที่กำหนด (1500 มิลลิวินาที = 1.5 วินาที)
        }).then(() => {
          // ทำการ redirect หรือทำอย่างอื่นตามที่คุณต้องการ
          this.$router.push("/admin/admin");
        });
      } catch (error) {
        // ...
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


