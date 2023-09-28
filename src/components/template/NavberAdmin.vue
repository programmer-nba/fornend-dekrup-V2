<template>
    <div class="grid color-navbar">
        <div class="col-12">
            <Menubar :model="item_manu"
                class="custom-menu border-round-3xl p-0 mt-2 w-auto hover:border-2 hover:border-purple-900 flex align-items-center justify-content-center bg-white">
            </Menubar>
        </div>
        <div>
            <Button class="p-button-danger" label="ออกจากระบบ" icon="pi pi-power-off" @click="logout()" />
        </div>
    </div>
</template>

<script>
import Menubar from "primevue/menubar";
import Button from 'primevue/button';
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
                    to: "/admin/product",
                },
                {
                    label: "Order Dekrub",
                    icon: 'pi pi-shopping-cart',
                    to: "/admin/order",
                },
                {
                    label: "จัดการผู้ใช้งาน",
                    icon: 'pi pi-shopping-cart',
                    to: "/admin/member",
                },
                {
                    label: "จัดการระบบ",
                    icon: 'pi pi-shopping-cart',
                    to: "/admin/user",
                },
            ]
        },
        logout() {
            this.$confirm.require({
                message: "ต้องการออกจากระบบนี้?",
                header: "ออกจากระบบ",
                icon: "pi pi-exclamation-triangle",
                acceptLabel: "ออกจากระบบ",
                acceptClass: "p-button-danger",
                acceptIcon: "pi pi-fw pi-power-off",
                rejectLabel: "ยกเลิก"
        
            });
        },
    }
}
</script>
