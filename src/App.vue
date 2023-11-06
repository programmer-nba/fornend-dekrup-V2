<template>
  <div v-if="this.$store.getters.logedIn === true">
    <NavberAdmin v-if="this.$store.getters.position === 'admin'" />
    <div v-if="this.$store.getters.status !== false">
      <NavberMember v-if="this.$store.getters.position === 'member'" />
    </div>
    <router-view />
  </div>
  <div v-else>
    <div v-if="$route.path === '/register' || $route.path === '/forgetpassword'">
      <router-view />
    </div>
    <LoginView v-else />
  </div>
</template>

<script>
import axios from 'axios';
import jwtDecode from "jwt-decode";
import LoginView from "./views/LoginView.vue";
import NavberAdmin from './components/template/NavberAdmin.vue';
import NavberMember from './components/template/NavberMember.vue';

export default {
  components: {
    LoginView,
    NavberAdmin,
    NavberMember,
  },
  async beforeCreate() {
    this.$store.commit('setLoading', true);
    if (localStorage.getItem("token") !== null) {
      await axios
        .get(`${process.env.VUE_APP_DEKRUP}/me`, {
          headers: {
            'token': localStorage.getItem('token'),
          },
        })
        .then(async (res) => {
          const decode = await jwtDecode(localStorage.getItem("token"));
          const data_login = {
            logedIn: true,
            member_number: res.data.data.member_number,
            position: res.data.data.position,
            name: res.data.data.name,
            id: decode._id,
            status: res.data.data.status,
          };
          this.$store.commit("setLogin", data_login);
          this.$store.commit('setLoading', false);
          console.log(res);
          if (this.$store.getters.position === 'member') {
            if (res.data.data.status === false) {
              // this.$router.push("/member/dashboard");
              this.$router.push("/member/condition");
              // this.$router.push("/member/confirmBank");
            } else {
              this.$router.push("/member/product");
            }
          }
          if (this.$store.getters.position === 'admin') {
            this.$router.push("/admin");
          }
        })
        .catch(() => {
          localStorage.clear();
          this.$store.commit('setLoading', false);
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
