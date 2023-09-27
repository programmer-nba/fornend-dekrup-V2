<template>
    <div>
        <div class="grid px-2 py-1 " style="background-color: #ed2024;">
            <div class="col">
                <span class=" border-circle mx-2 w-4rem h-3rem flex align-items-center justify-content-center mt-2">
                    <img src="@/assets/img/Deekrub.png" style="width: 100%; " />
                </span>
            </div>
            <div class=" col-6 lg:col-4">
                <Menubar :model="itemMenu"
                    class="custom-menu border-round-3xl p-0 mt-2 w-auto hover:border-2 hover:border-purple-900 flex align-items-center justify-content-center bg-white">
                </Menubar>
            </div>
            <div class="col-12 lg:col flex align-items-center justify-content-end ">
                <Button class="border-none px-5 mr-3 bg-white border-round-3xl">

                    <span class="ml-2" style="color: #FE0000;">ปุ่ม</span>
                </Button>
            </div>
        </div>
    </div>
    <!-- <div>
        <div class="grid px-3 py-3">
            <div class="col-12 lg:col-12">
                <div class="grid ">
                    <div class="col-12">
                        ออเดอร์
                        <imageslide />
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-12 p-4">
            </div>
        </div>
    </div> -->
</template>

<script>
import { ref, onMounted } from "vue";
import Menubar from "primevue/menubar";
// import imageslide from "@/views/Public/imageslide.vue";
export default {
    components: {
        // imageslide,
        Menubar
    }
};

const itemMenu = ref([]);

function setItemMenu() {
    itemMenu.value = [
        {
            label: "สินค้า",
            icon: "pi pi-fw pi-home",
            to: "/",
        },
        {
            label: "ตั้งค่าโปรไฟล์",
            icon: "pi pi-fw pi-cog",
            to: "/profile",
        }
    ];
}

onMounted(() => {
    setItemMenu();
});
</script>
