<template>
    <div>
  
      <div class="grid px-3 py-3">
        <div class="col-12 lg:col-4">
          <div class="grid">
            <div class="col-12">
              <!-- ใช้ v-if เพื่อตรวจสอบหน้าปัจจุบันว่าเป็น /profile หรือไม่ -->
              <Order class="test" />
            </div>
          </div>
        </div>
  
        <div class="col-12 lg:col-8 p-4">
          <!-- ใช้ v-if เพื่อตรวจสอบหน้าปัจจุบันว่าเป็น /profile หรือไม่ -->
          <Menu/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Order from "./OrderProductMember.vue";
  import Menu from "./ProductViewMember.vue";
  
  export default {
    components: {
      Order,
      Menu,
    },
   
  };
  </script>
  
  <style>

</style>