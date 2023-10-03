<template>
  <div class="img-login">
    <div class="background-login">
      <img class="img-logo" src="../assets/img/Deekrub.png">
      <h2 class="text-center font-reset mb-3">เปลี่ยนรหัสผ่านใหม่</h2>
      <div class="grid">
        <div class="sm:col-6 col-12">
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="member_number" placeholder="รหัสสมาชิก" class="style-font" />
          </div>
        </div>
        <div class="sm:col-6 col-12">
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="username" placeholder="ชื่อผู้ใช้งาน" class="style-font" />
          </div>
        </div>
        <div class="flex justify-content-center">
          <Button label="เปลี่ยนรหัสผ่าน" style="font-family: 'Kanit', sans-serif;   width: -webkit-fill-available;"
            class="button-login mt-5" severity="danger" @click="confirm()" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

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
    member_number: '',
    username: '',

    isLoading: false,
    isDisabled: false,
  }),

  methods: {
    async confirm() {
      this.loading = true;
      const data = {
        member_number: this.member_number,
        username: this.username,
      }
      console.log(data);
      await this.members.ResetPassword(data).then(async (result) => {

        if (result) {
          console.log(result);
          this.loading = false;
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ทำการรีเซ็ตรหัสผ่านเรียบร้อย",
            life: 3000,
          })
          window.location.reload('/');
        }
      })
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
  margin-right: 18%;
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
  margin-left: 25%;
  margin-bottom: 5%;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
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
  }
}

@media only screen and (max-width:576px) {
  .background-login {
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