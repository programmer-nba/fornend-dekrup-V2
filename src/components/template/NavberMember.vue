<template>
    <div class="grid navbar-sticky" style="background: red; ">
        <div class="xl:col-10 lg:col-9 md:col-2 col-4 flex justify-content-center align-items-center">
            <Menubar :model="item_manu"
                class="custom-menu  border-round-3xl p-0 mt-2  hover:border-2 hover:border-purple-900 flex align-items-center justify-content-center bg-white"
                >
            </Menubar>
        </div>
        <div class="xl:col-2 lg:col-3 md:col-10 col-8 mt-2 flex justify-content-end px-3">
            <Button class="p-button-danger z-0" label="ออกจากระบบ" icon="pi pi-power-off" @click="logout()" />
        </div>
    </div>
</template>
  

<script>
import axios from "axios";
import Button from 'primevue/button';
import Menubar from "primevue/menubar";
export default {
    components: {
        Menubar,
        Button
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
                    label: "สินค้า",
                    icon: "pi pi-shopping-cart",
                    to: "/member/product",
                },
                {
                    label: "รายได้ค่าคอมมิชชั่น",
                    icon: "pi pi-money-bill",
                    to: "/member/commission/register/day"
                },
                {
                    label: "รายได้ค่าคอมมิชชั่น",
                    icon: "pi pi-money-bill",
                    to: "/member/commission/register/week"
                },
                {
                    label: "รายได้ค่าบริหาร",
                    icon: "pi pi-money-bill",
                    to: "/member/commission/adminiter"
                },
                {
                    label: "ตั้งค่าโปรไฟล์",
                    icon: "pi pi-user",
                    to: "/member/profile",
                },
            ];
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
                    window.location.reload('/');
                })
                .catch((err) => {
                    this.$store.commit("setLoading", false);
                    this.$toast.error(err.response.data.message);
                });
        },
    }
}
</script>

<style>
.navbar-sticky {
    position: sticky !important;
    top: 0 !important;
    z-index: 100;

}

.p-menubar .p-submenu-list {
    display: none;
    position: absolute;
    z-index: 150;
}
.p-menubar.p-menubar-mobile-active .p-menubar-root-list {
    display: flex;
    flex-direction: column;
    top: 100%;
    left: 0;
    z-index: 1;
    width: 300px;
    }

.custom-menu{
    width: 40%;
}

@media only screen and (max-width:1600px){
    .custom-menu{
        width: 90%;
    }
}
</style>
