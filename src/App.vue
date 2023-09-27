<template>
  <HomeView />
</template>
<script>
import HomeView from "./views/HomeView.vue";
import axios from "axios";
export default {
  components: {
    HomeView,
  },
  async created() {
  this.$store.commit('setLoading', true);
  document.title = 'Dekrup Shop';
  if (localStorage.getItem('token')) {
    await axios.get(`${process.env.VUE_APP_PLATFORM}/me`, {
      headers: {
        'token': localStorage.getItem('token')
      }
    }).then(async (res) => {
      await this.$store.dispatch('setMe', res.data.data);
      await this.$store.commit('setToken', localStorage.getItem('token'))
      this.logedIn = true;
      this.$router.push('/');
      this.$store.commit('setLoading', false);
    }).catch(() => {
      this.$router.push('/login')
      this.$store.commit('setLoading', false);
    });
  } else {
    this.$router.push('/login')
    this.$store.commit('setLoading', false);
  }
  this.$store.commit('setLoading', false);
},
  data: () => ({
    logedIn: false
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
