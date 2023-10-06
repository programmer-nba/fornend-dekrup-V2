<template>
    <div v-if="isLoading" class="loading-overlay">
        <div class="loader"></div>
    </div>
    <div>
        <div class="grid px-3">
            <div class="col-12 lg:col-12 mt-2">
                <Panel class="custom-header-panel">
                    <template #header>เกี่ยวกับสินค้า</template>

                    <div class="grid ">
                        <div class="col-12">
                            <div class="flex justify-content-center">
                                <div v-for="(preview, index) in imagePreviews" :key="index" class=" ">
                                    <Image :src="preview" width="200" height="200" class="mr-2" />
                                    <div class="col-12">
                                        <Button @click="removeImage(index)" class="p-button-danger p-mt-2">ลบรูป</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="flex justify-content-center ">
                                <label for="file" class="p-button p-button-secondary">
                                    <span>เลือกรูปหน้าปก</span>
                                </label>
                                <input id="file" type="file" @change="SetImages" multiple class="p-d-none" />
                            </div>
                        </div>
                    </div>



                    <div class="grid">
                        <div class="col-12 lg:col-6">
                            <div class="field">
                                <label>ชื่อสินค้า :</label>
                                <InputText v-model="name" class="font w-full" placeholder="กรอกชื่อสินค้า"
                                    :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>หมวดหมู่สินค้า :</label>
                                <Dropdown v-model="categoryid" :options="item_category" optionLabel="name" optionValue="_id"
                                    placeholder="เลือกหมวดหมู่สินค้า" class="w-full" inputClass="font"
                                    :disabled="isDisabled" :filter="true" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>ราคาทุน :</label>
                                <InputNumber v-model="cost" class="w-full" inputClass="font" placeholder="กรอกราคาทุนสินค้า"
                                    mode="decimal" :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>ราคาขาย :</label>
                                <InputNumber v-model="price" class="w-full" inputClass="font"
                                    placeholder="กรอกราคาขายสินค้า" mode="decimal" :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>จำนวนสินค้าในสต๊อก<small>(ชิ้น)</small> :</label>
                                <InputNumber v-model="quantity" class="w-full" inputClass="font"
                                    placeholder="กรอกจำนวนสินค้าในสต๊อก" mode="decimal" :disabled="isDisabled" />
                            </div>
                        </div>


                        <div class="col-12">
                            <div class="field">
                                <label>รายละเอียดสินค้า</label>
                                <Textarea v-model="detail" autoResize rows="5" cols="30" class="font w-full"
                                    :disabled="isDisabled" />
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
            <div class="col-12">
                <div class="field">
                    <Button class="ml-2 border-gray-400" label="ยกเลิก" icon="pi pi-times "
                        style="background-color: #8D8DAA;" @click="$router.push('/admin')" />
                    <Button label="บันทึก" icon="pi pi-save" class="ml-2 border-red-400" @click="addProduct()"
                        style="background-color: #D61355;" />

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
import { ref } from "vue";
import { Product } from "../../../service/product";

export default {
    name: "addView",
    components: {
        Product,
    },
    setup() {
        const isLoading = ref(false);

        const product = new Product();
        return { product, isLoading }
    },
    data: () => ({
        loading: false,
        isloading: false,
        isDisabled: false,

        img_preview: null,
        img_upload: [],
        img_size: null,
        dialog_img_warning: false,

        imagePreviews: [],

        name: '',
        categoryid: '',
        detail: '',
        cost: '',
        price: '',
        quantity: '',

        item_category: [],
    }),

    created() {
        document.title = "เพิ่มข้อมูลสินค้า";
        this.fetchProductCategories();
    },
    methods: {

        async fetchProductCategories() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/category/list`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });
                this.item_category = response.data.data;
            } catch (error) {
                console.error(error);
            }
        },

        ResetImage() {
            this.img_preview = null;
            this.img_upload = null;
            this.dialog_img_warning = false;
        },

        ResetData() {
            this.name = null;
            this.categoryid = null;
            this.detail = null;
            this.price = null;
            this.quantity = null;
        },

        async addProduct() {
            this.isLoading = true;

            // ตรวจสอบว่ามีรูปภาพที่ถูกอัพโหลดหรือไม่
            if (!this.img_upload.length) {
                Swal.fire('แจ้งเตือน', 'กรุณาอัพโหลดรูปภาพ', 'warning');
                return;
            }

            if (
                !this.name ||
                !this.categoryid ||
                !this.detail ||
                !this.cost ||
                !this.price ||
                !this.quantity
            ) {
                Swal.fire('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบ', 'warning');
                return;
            }

            this.loading = true;

            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('categoryid', this.categoryid);
            formData.append('detail', this.detail);
            formData.append('cost', this.cost);
            formData.append('price', this.price);
            formData.append('quantity', this.quantity);
            formData.append('imgCollection', this.img_upload[0]);

            try {
                const result = await this.product.CreateProduct(formData);

                if (result) {
                    this.ResetData();
                    this.ResetImage();
                    this.loading = false;

                    Swal.fire('เพิ่มสินค้าสำเร็จ', 'คุณได้เพิ่มรายการสินค้าสำเร็จแล้ว', 'success').then(() => {
                        this.$router.push('/admin/product');
                    });
                }
            } catch (error) {
                console.error(error);
                this.loading = false;
                Swal.fire('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดในการเพิ่มสินค้า', 'error');
            } finally {
                this.isLoading = false;
            }
        },

        SetImages(e) {
            const files = e.target.files;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileSizeInBytes = file.size;
                const maxSizeInBytes = 10000000; // 1 MB

                if (fileSizeInBytes > maxSizeInBytes) {
                    Swal.fire('แจ้งเตือน', 'ขนาดของรูปภาพใหญ่เกินกำหนด (มากกว่า 10 MB)', 'warning');
                    return;
                }

                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.addEventListener("load", (event) => {
                    this.imagePreviews.push(event.target.result);
                });

                this.img_upload.push(file);
            }
        },


        removeImage(index) {
            this.imagePreviews.splice(index, 1);
            this.img_upload.splice(index, 1);
        }

    },
};
</script>



<style>
.custom-header-panel .p-panel-header {
    background-color: #FFFDE3;
    color: #C21010;
    border-bottom: 1px solid #C21010;
    border-top: none;
    border-right: none;
    border-left: none;

}

.custom-header-panel .p-panel-content {
    background-color: #FFFDE3;
    color: #C21010;
    border: none;
}


.container {
    height: 300px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 4px 4px 30px rgba(0, 0, 0, .2);
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 5px;
    background-color: rgba(0, 110, 255, 0.041);
}

.header {
    flex: 1;
    width: 100%;
    border: 2px dashed royalblue;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.header svg {
    height: 100px;
}

.header p {
    text-align: center;
    color: black;
}

.footer {
    background-color: rgba(0, 110, 255, 0.075);
    width: 100%;
    height: 40px;
    padding: 8px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: black;
    border: none;
}

.footer svg {
    height: 130%;
    fill: royalblue;
    background-color: rgba(70, 66, 66, 0.103);
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
}

.footer p {
    flex: 1;
    text-align: center;
}

#file {
    display: none;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loader {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

