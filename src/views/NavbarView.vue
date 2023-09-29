<template>
    <div class="grid color-navbar">
     <div class="col-2 md:col-1 lg:col-3">
         <span class=" border-circle mx-2 w-4rem h-3rem flex align-items-center justify-content-center mt-2"> 
             <img
                 src="@/assets/img/Deekrub.png" style="width: 100%; " />
         </span>

     </div>
     <div class=" col-2 md:col-2 lg:col-6">
         <Menubar :model="itemMenu"
             class=" custom-menu border-round-3xl p-0 mt-2 w-auto hover:border-2 hover:border-purple-900 flex align-items-center justify-content-center bg-white">
         </Menubar>
     </div>

     <div class="col-8 md:col-9 lg:col-3 px-5 flex align-items-center justify-content-end ">
        <Button type="button" class="btn-login" label="Login">
                Login
        </Button>
     </div>
 </div>
</template> 

<script>
import Menubar from "primevue/menubar";
import Button from 'primevue/button';
import axios from "axios";
export default {
    components: {
        Menubar,
        Button,
    },

    async mounted() {
        this.setItemMenu();
    },

    data: () => ({
        item_manu: [],
    }),

    methods: {
        setItemMenu() {
            this.item_manu = [
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
            ]
        },
        async logout() {
            this.$store.commit("setLoading", true);
            await axios
                .post(`${process.env.VUE_APP_DEKRUP}/logout`, null, {
                    headers: {
                        token: this.$store.getters.token,
                    },
                })
                .then(() => {
                    this.$store.commit("setLoginDefault");
                    window.location.reload();
                })
                .catch((err) => {
                    this.$store.commit("setLoading", false);
                    this.$toast.error(err.response.data.message);
                });
        },
    }
}
</script>



<style >
/* .grid{
    margin-right: 0px !important;
} */
.color-navbar{
    background: #f8090e;
    position: sticky;
    top: 0;
    z-index: 100;

}

body {
    font-family: 'Kanit', sans-serif;
    overflow-x: hidden !important;

}
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
    cursor: pointer !important;
}

.btn-login:hover {
    color: #ffff !important;
    background: #ffaf00 !important;
}

.txt-login {
    font-family: 'Kanit', sans-serif;
}

.custom-menubar {
    height: 90px;
}


.p-menubar .p-menubar-root-list>.p-menuitem>.p-menuitem-content .p-menuitem-link .p-menuitem-text {

    font-family: 'Kanit', sans-serif;
    -webkit-text-stroke: 1px;

}

.p-menubar .p-menubar-root-list>.p-menuitem>.p-menuitem-content .p-menuitem-link .p-menuitem-icon {
    color: #ff0000 !important;
    margin-right: 0.5rem;
    -webkit-text-stroke: 0.5px;
}

.logo {
 width: 100px;
 height: 75px;
 margin-right: 10px;
 
}

/* @media print {
 .none {
     display: none;
 }
} */

.p-menubar.p-menubar-mobile-active .p-menubar-root-list {
    display: flex;
    flex-direction: column;
    top: 100%;
    left: 0;
    z-index: 100;

    border-radius: 5px;
    width: 200px;}


@media only screen and (max-width:576px){
    .btn-login {
    font-size: 18px !important;
    padding-left: 17px !important;
    margin-top: -7px !important;
    padding-right: 15px !important;
}
}
</style>