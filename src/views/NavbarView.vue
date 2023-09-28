<template>
    <div class="grid color-navbar">
     <div class="col-1 md:col-1 lg:col-3">
         <span class=" border-circle mx-2 w-4rem h-3rem flex align-items-center justify-content-center mt-2"> 
             <img
                 src="@/assets/img/Deekrub.png" style="width: 100%; " />
         </span>

     </div>
     <div class=" col-6 md:col-4 lg:col-6">
         <Menubar :model="itemMenu"
             class=" custom-menu border-round-3xl p-0 mt-2 w-auto hover:border-2 hover:border-purple-900 flex align-items-center justify-content-center bg-white">
         </Menubar>
     </div>

     <div class="col-5 md:col-7 lg:col-3 flex align-items-center justify-content-end ">
      
        <a href="/login">
            <Button class="btn-login">
             <span class="txt-login">Login</span>
         </Button>
        </a>
     </div>
 </div>
</template> 

<script setup>
import { ref, onMounted } from "vue";
import Menubar from "primevue/menubar";

const itemMenu = ref([]);

function setItemMenu() {
 itemMenu.value = [
     {
         label: "หน้าหลัก",
         icon: "pi pi-fw pi-home",
         to: "/homeview",
     },
     {
         label: "สินค้าของเรา",
         icon: 'pi pi-shopping-cart',
         to: "/aboutview",
     },
     {
         label: "สมัครสมาชิกกับเรา",
         icon: 'pi pi-user-edit',
         to: "/register",
     },
 ];
}

onMounted(() => {
 setItemMenu();
});
</script>



<style>
.color-navbar{
    background: #f8090e;
    position: sticky;
  top: 0;
  z-index: 100; 
  
}
body{
    font-family: 'Kanit', sans-serif;
    overflow-x: hidden !important;

}
/* .txt-login{
    color: red;
    -webkit-text-stroke: 1px;
    font-size: 20px;
} */
.btn-login{
    border-radius: 50px !important;
    background: #ffff !important;
    color: red !important;
    -webkit-text-stroke: 1px;
    font-size: 25px !important;
    border: none !important;
    padding: 5px !important;
    padding-left: 60px !important;
    padding-right: 60px !important;
}
.btn-login:hover{
    color: #ffff !important;
    background: #ffaf00 !important;
}
.txt-login{
    font-family: 'Kanit', sans-serif;
}
.custom-menubar {
 height: 90px;
}


.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text{

    font-family: 'Kanit', sans-serif;
    -webkit-text-stroke: 1px;

}

.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon {
    color: #ff0000 !important;
    margin-right: 0.5rem;
    -webkit-text-stroke: 0.5px;
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