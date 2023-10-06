<template>
  <div>
    <NavberAdmin />
    <router-view /> <!-- ส่วนของเนื้อหาหน้า HomePageAdmin ไว้ที่นี่ -->
    
  </div>
  </template>

<script>
import NavberAdmin from '../template/NavberAdmin.vue'
// import HomePage from '../../views/HomeView.vue'
export default {
  components: {
    NavberAdmin,
    // HomePage
  },
  async created() {
    document.title = 'ระบบจัดการ Dekrub-shop';
  },
}
</script>


<style>
.card-bg {
  background-color: #FFFDE3;
  color: #C21010;

}
</style>
