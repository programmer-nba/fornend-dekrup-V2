<template>
  <div style="background-color: #FFDEDE; height: 100vh;">
    <Navbar />
    <router-view />
    <div class="home text-center">
      <!-- ใช้ v-if เพื่อตรวจสอบว่าหน้าปัจจุบันเป็น HomeAdmin.vue หรือไม่ -->
      <div v-if="isHomeAdminPage">
        <HomePageAdmin />
        <div class="px-2 py-2 md:px-6 lg:px-8">
          <div class="grid">
            <div class="col-12 md:col-4 lg:col-9">
              <div class="surface-card shadow-2 p-3 border-round">
                <Platform />
              </div>
            </div>

            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                <ShareProfit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { computed } from "vue";
// import Navbar from "@/views/Homeadmin/Navbar.vue";
import HomePageAdmin from "@/components/homepage/HomePageAdmin.vue";
import ShareProfit from "@/components/homepage/ShareProfit.vue";
// import Platform from "@/components/homepage/Platform.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    // Navbar,
    HomePageAdmin,
    ShareProfit,
    // Platform,
  },
  setup() {
    const route = useRoute();

    // ใช้ computed property เพื่อตรวจสอบว่าเราอยู่ที่หน้า HomeAdmin.vue หรือไม่
    const isHomeAdminPage = computed(() => route.name === "homeadmin");

    return {
      isHomeAdminPage,
    };
  },
};
</script>
  
  
<style scope>
.custom-menubar {
  height: 90px;
}

.logo {
  width: 100px;
  height: 75px;
  margin-right: 10px;
}

@media print {
  .none {
    display: none;
  }
}
</style>
  