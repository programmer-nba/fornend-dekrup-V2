<template>
  <div>
    <router-view v-if="this.$store.getters.logedIn === true" />
    <div v-else>
      <!-- หากไม่ได้เข้าสู่ระบบให้แสดงหน้า Login -->
      <LoginView />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jwtDecode from "jwt-decode";
import LoginView from "./views/Public/LoginView.vue";

export default {
  components: {
    LoginView,
  },

  async beforeCreate() {
    if (localStorage.getItem("token") !== null) {
      await axios
        .get(`${process.env.VUE_APP_DEKRUP}/me`,{
          headers: {
            "token": `${localStorage.getItem("token")}`,
          },
        })
        .then(async (res) => {
          const decode = await jwtDecode(localStorage.getItem("token"));
          const data_login = {
            logedIn: true,
            position: res.data.position,
            name: res.data.name,
            id: decode._id,
          };
          this.$store.commit("setLogin", data_login);

          if (this.$store.getters.position === 'admin') {
            // เปลี่ยนหน้าเมื่อโหลดข้อมูลเสร็จสิ้น
            this.$router.push("/admin");
          }
        })
        .catch(() => {
          localStorage.clear();
          this.$store.commit("setDefaultLogin");
          this.$router.push("/login");
        });
    } else {
      localStorage.clear();
      this.$router.push("/login");
    }
  },
}
</script>
