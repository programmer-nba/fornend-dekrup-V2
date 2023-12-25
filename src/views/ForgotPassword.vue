<template>
  <div class="img-login">
    <div class="background-login">
      <img class="img-logo" src="../assets/img/Deekrub.png">
      <h1 class="text-center font-reset mb-3">เปลี่ยนรหัสผ่านใหม่</h1>
      <div class="grid">
        <div class="col-12 text-center">
          <p class="font-reset">หมายเหตุ : กรณีไม่ทราบ ไอดีสมาชิก หรือ ลืมเบอร์โทรศัพท์ที่สมัครกรุณาติดต่อแอดมิน</p>
        </div>
      </div>
      <div class="grid">
        <div class=" col-12">
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="username" :feedback="false" placeholder="ไอดีสมาชิก" class="style-font" />
          </div>
        </div>
        <div class=" col-12">
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="phone" :feedback="false" placeholder="เบอร์โทรศัพท์" class="style-font" />
          </div>
        </div>
        <div class="col-12">
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-key"></i>
            </span>
            <Password v-model="password" :feedback="false" placeholder="รหัสผ่าน" class="style-font" />
          </div>
        </div>
        <div class=" col-12">
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-key"></i>
            </span>
            <Password v-model="confirmpassword" :feedback="false" placeholder="ยืนยันรหัสผ่าน" class="style-font" />
          </div>
        </div>
        <div class="col-12 flex justify-content-center">
          <Button label="เปลี่ยนรหัสผ่าน" style="font-family: 'Kanit', sans-serif;   width: -webkit-fill-available;"
            class="button-login mt-5" severity="danger" @click="confirm()" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import { Member } from "../service/member";
export default {
  created() {
    document.title = "รีเซ็ตรหัสผ่าน | Dekrub Shop";
  },
  components: {
    Member,
  },
  setup() {
    const members = new Member();
    return { members }
  },
  data: () => ({
    username: '',
    password: '',
    confirmpassword: '',
    phone: '',

    isLoading: false,
    isDisabled: false,
  }),

  methods: {
    async confirm() {
      this.loading = true;
      if (this.password !== this.confirmpassword) {
        this.$toast.add({
          severity: "warn",
          summary: "ไม่สำเร็จ",
          detail: "รหัสผ่านไม่ตรงกัน",
          life: 3000,
        })
      }
      const data = {
        username: this.username,
        phone: this.phone,
        password: this.password,
      }
      await axios
        .post(`${process.env.VUE_APP_DEKRUP}/forgot_password`, data)
        .then((res) => {
          console.log(res)
          this.isLoading = false;
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ทำการรีเซ็ตรหัสผ่านเรียบร้อย",
            life: 3000,
          })
          window.location.reload('/');
        })
        .catch((err) => {
          console.log(err)
          this.isLoading = false;
          this.$toast.add({
            severity: "warn",
            summary: "ไม่สำเร็จ",
            detail: "ข้อมูลไม่ตรงกัน กรุณาลองใหม่อีกครั้ง",
            life: 3000,
          })
        });
    },
  }


}
</script>
    
<style scoped>
.img-login {
  width: 100%;
  background: url("../assets/img/backgrond.jpg");
  height: 100vh;
  background-size: cover;
  /* This will cover the entire container */
  background-repeat: no-repeat;
  background-position: center center;
  /* Center the image horizontally and vertically */
  display: flex;
  align-items: center;
}

.background-login {
  background: rgb(255, 255, 255);
  margin-left: auto;
  margin-right: 15%;
  width: 25%;
  padding: 3%;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 25px;
  border: 3px solid #ffff;
}

.font-reset {
  color: #ec0606;
  -webkit-text-stroke: 0.5px;
}

.img-logo {
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 5%;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
}

.p-inputgroup-addon {
  background: #ff0000;
  color: #ffffff;
  border-top: 1px solid #ff0000;
  border-left: 1px solid #ff0000;
  border-bottom: 1px solid #ff0000;
  padding: 0.75rem 0.75rem;
  min-width: 3rem;
}

@media only screen and (max-width:1200px) {
  .background-login {
    margin-left: auto;
    margin-right: 12%;
    padding: 3%;
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 25px;
    border: 3px solid #bf1212;
    width: 35;
  }
}

@media only screen and (max-width:922px) {
  .background-login {
    margin-left: auto;
    margin-right: auto;
    padding: 12%;
    border-radius: 25px;
    border: 3px solid #bf1212;
    width: 80%;
    background: #ffffffdb;
  }
}

@media only screen and (max-width:576px) {


  .font-color {
    color: #db0000;
  }
}
</style>