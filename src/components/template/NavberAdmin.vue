<template>
    <div class="grid">
        <div class="col-10">
            <Menubar :model="item_manu"
                class="custom-menu  border-round-3xl p-0 mt-2 w-auto hover:border-2 hover:border-purple-900 flex align-items-center justify-content-center bg-white">
            </Menubar>
        </div>
        <div class="col mt-2">
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
                    label: "Order Dekrub",
                    icon: 'pi pi-shopping-cart',
                    to: "/admin/order",
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
                            label: "เพิ่มผู้ใช้งานระบบ",
                            icon: 'pi pi-plus',
                            to: "/admin/member/add",
                        },
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
}
</style>
