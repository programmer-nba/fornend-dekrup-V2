<template>
    <div style="background-color: #FFDEDE; ">
        <div class="grid px-3">
            <div class="col-12 lg:col-12 mt-2">
                <Panel class="custom-header-panel">
                    <template #header>เกี่ยวกับสินค้า</template>
                    <div class="grid">
                        <div class="col-12 text-center">
                            <div class="justify-content-center"
                                style="display: flex; flex-direction: row; flex-wrap: nowrap;">
                                <!-- <Image v-for="(preview, index) in imagePreviews" :key="index" :src="preview.url" width="200"
                                    :preview="true" /> -->
                                <label v-if="!img_preview" class="file-input-label">
                                    <span>เลือกรูปหน้าปก</span>
                                    <input type="file" class="input-image" @change="SetImage" />
                                </label>
                                <Image v-if="img_preview" :src="img_preview" width="200" height="200" />
                            </div>
                            <!-- <FileUpload mode="basic" chooseLabel="เลือกรูปสินค้า" :auto="true" @change="SetImage"
                                :customUpload="true" accept="image/png, image/jpeg, image/jpg" :fileLimit="3"
                                :maxFileSize="2097152" invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                                :disabled="isDisabled" class="border-red-400 mt-3" style="background-color: #C21010;" />
                            <p><em>(ขนาดจะต้องเป็น 1:1)</em></p> -->
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
                                <InputNumber v-model="cost" class="w-full" inputClass="font"
                                    placeholder="กรอกราคาทุนสินค้า" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
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
        img_upload: null,
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

        SetImage(e) {
            const file = e.target.files;
            if (file) {
                this.img_size = file[0].size;

                if (this.img_size > 500000) {
                    this.dialog_img_warning = true;
                }
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file[0]);
                fileReader.addEventListener("load", (event) => {
                    this.img_preview = event.target.result;
                })
                this.img_upload = file;
            }
        },


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