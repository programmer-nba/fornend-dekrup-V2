<template>
    <div class="grid mb-3 custom-nav-admin " style=" background: red;
        position: sticky;
        top:0;
        z-index: 100;
        "
        >
        <div class="lg:col-10 md:col-2 col-2" >
            <Menubar :model="item_manu"
                class="custom-menu  border-round-3xl p-0 mt-2 w-auto hover:border-2 hover:border-purple-900 flex align-items-center justify-content-center bg-white">
            </Menubar>
        </div>
        <div class="lg:col-2 md:col-10 col-10 mt-2 flex justify-content-end px-3">
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
                    label: "Home",
                    icon: "pi pi-fw pi-home",
                    to: "/admin",
                },
                {
                    label: "Product Dekrub",
                    icon: 'pi pi-shopping-cart',
                    items: [
                        {
                            label: "เพิ่มสินค้า",
                            icon: 'pi pi-user',
                            to: "/admin/product/add",
                        },
                        {
                            label: "สินค้าทั้งหมด",
                            icon: 'pi pi-plus',
                            to: "/admin/product",
                        },
                        {
                            label: "หมวดหมู่สินค้า",
                            icon: 'pi pi-tag',
                            to: "/admin/product/category",
                        },
                    ],
                },
                {
                    label: "รายการสมาชิกใหม่",
                    icon: 'pi pi-shopping-cart',
                    to: "/admin/new_member",
                },
                // {
                //     label: "Order Dekrub",
                //     icon: 'pi pi-shopping-cart',
                //     to: "/admin/order",
                // },
                {
                    label: "Order Dekrub",
                    icon: 'pi pi-shopping-cart',
                    to: "/admin/ordernew",
                },
                {
                    label: "รายงาน Commission",
                    icon: 'pi pi-shopping-cart',
                    items: [
                        {
                            label: "Commission Register Day",
                            icon: 'pi pi-user',
                            to: "/admin/commission/register",
                        },
                        {
                            label: "Commission Register Week",
                            icon: 'pi pi-user',
                            to: "/admin/commission/register/week",
                        },
                        {
                            label: "Commission Adminnister",
                            icon: 'pi pi-plus',
                            to: "/admin/commission/administer",
                        },
                        {
                            label: "Commission",
                            icon: 'pi pi-plus',
                            to: "/admin/commission",
                        },
                        {
                            label: "จัดการ Percent Commission",
                            icon: 'pi pi-plus',
                            to: "/admin/commission/percent",
                        },
                    ],
                },
                {
                    label: "จัดการผู้ใช้งาน",
                    icon: 'pi pi-shopping-cart',
                    items: [
                        {
                            label: "ผู้ใช้งานทั้งหมด",
                            icon: 'pi pi-user',
                            to: "/admin/member",
                        },
                        {
                            label: "สมุดบัญชี",
                            icon: 'pi pi-user',
                            to: "/admin/member/bank",
                        },
                        {
                            label: "บัตรประชาชน",
                            icon: 'pi pi-user',
                            to: "/admin/member/iden",
                        },
                        // {
                        //     label: "เพิ่มผู้ใช้งานระบบ",
                        //     icon: 'pi pi-plus',
                        //     to: "/admin/member/add",
                        // },
                    ],
                },
                {
                    label: "จัดการระบบ",
                    icon: 'pi pi-shopping-cart',
                    items: [
                        {
                            label: "ผู้ใช้งานทั้งหมด",
                            icon: 'pi pi-user',
                            to: "/admin/admin",
                        },
                        {
                            label: "เพิ่มผู้ใช้งานระบบ",
                            icon: 'pi pi-plus',
                            to: "/admin/admin/add",
                        },
                        // {
                        //     label: "ฟังก์ฺชั่นเพิ่มเติม",
                        //     icon: 'pi pi-cog',
                        //     to: "/admin/function",
                        // },
                    ],
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

.p-menubar .p-submenu-list {
    display: none;
    position: absolute;
    z-index: 150;
    width: 270px;
}

@media only screen and (max-width:976px) {
    .p-menubar .p-submenu-list {
    display: none;
    position: absolute;
    z-index: 150;
}
}

</style>
