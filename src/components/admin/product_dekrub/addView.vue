<template>
    <div style="background-color: #FFDEDE; ">
        <div class="grid px-3">
            <div class="col-12 lg:col-12 mt-2">
                <Panel class="custom-header-panel">
                    <template #header>เกี่ยวกับสินค้า</template>
                    <div class="grid">
                        <div v-for="(preview, index) in imagePreviews" :key="index" class="image-preview">
                            <Image :src="preview" width="200" height="200" />
                            <button @click="removeImage(index)">ลบรูป</button>
                        </div>
                        <div class="col-12 text-center">
                            <div class="justify-content-center"
                                style="display: flex; flex-direction: row; flex-wrap: nowrap;">
                                <label class="file-input-label">
                                    <span>เลือกรูปหน้าปก</span>
                                    <input type="file" class="input-image" @change="SetImages" multiple />
                                </label>

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
                                    mode="decimal" :minFractionDigits="2" :maxFractionDigits="2" :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>ราคาขาย :</label>
                                <InputNumber v-model="price" class="w-full" inputClass="font"
                                    placeholder="กรอกราคาขายสินค้า" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>จำนวนสินค้าในสต๊อก<small>(ชิ้น)</small> :</label>
                                <InputNumber v-model="quantity" class="w-full" inputClass="font"
                                    placeholder="กรอกจำนวนสินค้าในสต๊อก" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
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
import { Product } from "../../../service/product";

export default {
    name: "addView",
    components: {
        Product,
    },
    setup() {
        const product = new Product();
        return { product }
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
            this.loading = true;
            if (this.img_upload) {
                const data = {
                    name: this.name,
                    categoryid: this.categoryid,
                    detail: this.detail,
                    cost: this.cost,
                    price: this.price,
                    quantity: this.quantity
                }
                const formData = new FormData();
                formData.append("name", this.name);
                formData.append("categoryid", this.categoryid);
                formData.append("detail", this.detail);
                formData.append("cost", this.cost);
                formData.append("price", this.price);
                formData.append("quantity", this.quantity);
                formData.append("imgCollection", this.img_upload[0]);

                console.log(data)
                console.log('FormData:', formData);

                // ตรวจสอบว่าข้อมูลถูกส่งไปครบหรือไม่
                console.log('Name:', this.name);
                console.log('Category ID:', this.categoryid);
                console.log('Detail:', this.detail);
                console.log('Cost:', this.cost);
                console.log('Price:', this.price);
                console.log('Quantity:', this.quantity);

                // ตรวจสอบรูปที่ถูกส่งไป
                for (let i = 0; i < this.img_upload.length; i++) {
                    console.log(`Image ${i + 1}:`, this.img_upload[i]);
                }

                await this.product.CreateProduct(formData).then(async (result) => {

                    if (result) {
                        console.log(result);
                        this.ResetData();
                        this.ResetImage();
                        this.loading = false;
                        this.$toast.add({
                            severity: "success",
                            summary: "สำเร็จ",
                            detail: "เพิ่มรายการสินค้าสำเร็จ",
                            life: 3000,
                        })
                    }
                })
            }
        },

        SetImages(e) {
            const files = e.target.files;

            if (this.img_upload.length + files.length > 3) {
                this.dialog_img_warning = true;
                return; 
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileSize = file.size;
                if (fileSize > 500000) {
                    this.dialog_img_warning = true;
                    return; 
                }
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.addEventListener("load", (event) => {
                    this.imagePreviews.push(event.target.result);
                });
                this.img_upload.push(file);

                if (this.img_upload.length > 3) {
                    this.dialog_img_warning = true;
                    this.removeImage(this.img_upload.length - 1); 
                    return;
                }
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
}

.custom-header-panel .p-panel-content {
    background-color: #FFFDE3;
    color: #C21010;
    border: none;
}
</style>