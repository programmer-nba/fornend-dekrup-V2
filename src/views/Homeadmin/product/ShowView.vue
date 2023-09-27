<template>
  <h1 class="text-center mt-3">คลังสินค้า</h1>
  <!-- <ProductView /> -->
</template>
<script>

// import ProductView from "../../../components/product_dekrub/ProductView.vue";

import axios from "axios";
export default {
  components: {
    // ProductView
  },
  created() {
    document.title = "คลังสินค้า NBA SHOP";
  },
  async mounted() {
    //check me
    await axios
      .post(`${process.env.VUE_APP_SHOP}me`, null, {
        headers: {
          "auth-token": `Bearer ${this.$store.getters.token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 408) {
          window.location.reload();
        }
      });
    if (!this.$store.getters.logedIn) {
      this.$router.push("/login");
    }
  },
};
</script>
  
<style></style>
  