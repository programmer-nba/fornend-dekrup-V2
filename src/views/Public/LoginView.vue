<template>
  <div class="img-login">
    <div class="background-login">
      <img class="img-logo" src="../../assets/img/Deekrub.png">
      <div class="flex justify-content-center mb-5">
        <span class="p-float-label w-full">
          <InputText v-model="username" type="text" placeholder="ชื่อผู้ใช้งาน" />
          <label for="username">กรุณากรอกยูสเซอร์เนม</label>
        </span>
      </div>
      <div class="flex justify-content-center mb-1">
        <span class="p-float-label">
          <InputText v-model="password" type="text" placeholer="รหัสผ่าน" />
          <!-- <InputText v-model="password" inputId="password" :feedback="false" class="w-full" toogleMask /> -->
          <label for="password">กรุณากรอกรหัสผ่าน</label>
        </span>
      </div>
      <div class="flex justify-content-between mb-5">
        <div><a href="/register" class="font-color">สมัครสมาชิก</a></div>
        <div><a href="/forgotpassword" class="font-color">ลืมรหัสผ่าน</a></div>
      </div>
      <div class="flex justify-content-center">
        <Button label="เข้าสู่ระบบ" style="font-family: 'Kanit', sans-serif;" class="button-login" severity="success"
          @click="checklogin()" />
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import Button from 'primevue/button';
export default {
  components: {
    Button
  },

  created() {
    document.title = "เข้าสู่ระบบ | Dekrub Shop";
  },

  data: () => ({
    isLoading: false,
    username: "",
    password: "",
  }),

  mounted() {
    if (this.$store.getters.logedIn === true) {
      this.$router.push("/admin");
    }
  },

  methods: {
    async checklogin() {
      if (this.username === "" || this.password === "") {
        this.$toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน",
          life: 3000,
        });
        return false;
      }
      this.isLoading = true;
      await axios
        .post(`${process.env.VUE_APP_DEKRUP}/login`, {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          window.location.assign("/admin");
        })
        .catch(() => {
          this.isLoading = false;
          this.$toast.add({
            severity: "error",
            summary: "ไม่สำเร็จ",
            detail: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
            life: 3000,
          });
        });
    }

  }
}

</script>
    
<style>
.img-login {
  width: 100%;
  background: url("../../assets/img/backgrond.jpg");
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

  background: rgba(255, 255, 255, 0.295);
  margin-left: auto;
  margin-right: 18%;
  padding: 3%;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 25px;
  border: 3px solid #ffff;
}

.p-component {
  z-index: 1;
}

.font-color {
  color: #ffff;
  -webkit-text-stroke: 0.5px;
}

.img-logo {
  width: 100px;
  margin-left: 25%;
  margin-bottom: 5%;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
}

@media only screen and (max-width:1200px) {
  .background-login {
    background: rgb(235 191 191 / 43%);
    margin-left: auto;
    margin-right: 12%;
    padding: 3%;
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 25px;
    border: 3px solid #bf1212;
  }
}

@media only screen and (max-width:576px) {
  .background-login {
    background: rgba(255, 255, 255, 0.795);
    margin-left: auto;
    margin-right: auto;
    padding: 12%;
    border-radius: 25px;
    border: 3px solid #bf1212;
  }

  .font-color {
    color: #db0000;
  }
}
</style>