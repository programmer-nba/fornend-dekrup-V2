<template>
  <h1 class="text-center">ระบบจัดการ Dekrub-shop </h1>
  <div class="home text-center">
    <Commission />
  </div>
  <div class="home text-center">
    <OrderList />
  </div>
  <!-- <div class="home text-center">
    <Examine />
  </div> -->
</template>

<script>
import Commission from "../../components/homepage/commission.vue";
import OrderList from "../../components/homepage/order.vue";
// import Examine from "../../components/homepage/examine.vue";
export default {
  components: {
    Commission,
    OrderList,
    // Examine
  }

}
</script>






<style>
.card-bg {
  background-color: #FFFDE3;
  color: #C21010;

}
</style>
