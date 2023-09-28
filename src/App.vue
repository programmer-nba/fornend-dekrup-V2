<template>
  <div v-if="this.$store.getters.logedIn === true">
    <div v-if="this.$store.getters.position === 'admin'">
      <HomePageAdmin />
    </div>
    <div v-else>
      
    </div>
  </div>
  <div v-else>
    <LoginView />
  </div>
</template>
<script>
import axios from 'axios';
// import HomeView from "./views/HomeView.vue";
import HomePageAdmin from "./components/admin/HomePageAdmin.vue";
import LoginView from "./views/Public/LoginView.vue";
import jwtDecode from "jwt-decode";
export default {
  components: {
    // HomeView,
    HomePageAdmin,
    LoginView,
  },
  // async created(){
  //   document.title = 'Dekrub Shop HomePage';
  // },
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

<style>
#app {
  font-family: 'Kanit', sans-serif !important;
}
</style>
