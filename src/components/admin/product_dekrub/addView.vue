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
                                <Image v-for="(preview, index) in imagePreviews" :key="index" :src="preview" width="200"
                                    :preview="true" />
                                    
                            </div>
                            <FileUpload mode="basic" chooseLabel="เลือกรูปสินค้า" :auto="true" @uploader="chooseImg"
                                :customUpload="true" accept="image/png, image/jpeg, image/jpg" :fileLimit="3"
                                :maxFileSize="2097152" invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                                :disabled="isDisabled" class="border-red-400 mt-3" style="background-color: #C21010;" />
                            <p><em>(ขนาดจะต้องเป็น 1:1)</em></p>
                        </div>
                    </div>

                    <div class="grid">
                        <div class="col-12 lg:col-6">
                            <div class="field">
                                <label>รหัสสินค้า :</label>
                                <InputText v-model="productDK_code" class="font w-full" placeholder="กรอกรหัสสินค้า"
                                    :disabled="isDisabled" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-6">
                            <div class="field">
                                <label>ชื่อสินค้า :</label>
                                <InputText v-model="productNBA_name" class="font w-full" placeholder="กรอกชื่อสินค้า"
                                    :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>หมวดหมู่สินค้า : </label>
                                <Dropdown v-model="productNBA_category" :options="item_category" optionLabel="name"
                                    optionValue="_id" placeholder="เลือกหมวดหมู่สินค้า" class="w-full" inputClass="font"
                                    :disabled="isDisabled" :filter="true" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>ราคาขาย (Shop) :</label>
                                <InputNumber v-model="productNBA_cost" class="w-full" inputClass="font"
                                    placeholder="กรอกราคาขายสินค้า" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>จำนวนสินค้าในสต๊อก<small>(ชิ้น)</small> :</label>
                                <InputNumber v-model="productDk_stock" class="w-full" inputClass="font"
                                    placeholder="กรอกจำนวนสินค้าในสต๊อก" :disabled="isDisabled" />
                            </div>
                        </div>


                        <div class="col-12">
                            <div class="field">
                                <label>รายละเอียดสินค้า</label>
                                <Editor v-model="productNBA_detail" editorStyle="height: 200px"
                                    placeholder="กรอกรายละเอียดเกี่ยวกับสินค้า" :disabled="isDisabled">
                                    <template #toolbar>
                                        <span class="ql-formats">
                                            <button class="ql-bold"></button>
                                            <button class="ql-italic"></button>
                                            <button class="ql-underline"></button>
                                        </span>
                                    </template>
                                </Editor>
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
            <div class="col-12">
                <div class="field">
                    <Button class="ml-2 border-gray-400" label="ยกเลิก" icon="pi pi-times "
                        style="background-color: #8D8DAA;" @click="$router.push('/homeadmin')" />
                    <Button label="บันทึก" icon="pi pi-save" class="ml-2 border-red-400" @click="addProduct()"
                        :loading="isLoading" style="background-color: #D61355;" />

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    components: {
    },
    created() {
        document.title = "เพิ่มข้อมูลสินค้าในคลัง";
    },

    data: () => ({
        isLoading: false,
        isDisabled: false,
        item_brand: [],
        item_type: [],
        imagePreviews: [], // Initialize as an empty array
        productDK_images: [], // Initialize as an empty array
        isDisabled: false, // Add this if it's used in your component
        data: {
            type_name: "",
        },
        number: 30,
        summary: 0,
        //product
        productNBA_brand_id: "ไม่มี",
        productNBA_type: [],

        productNBA_name: "",
        productDK_code: "",
        productNBA_cost: null,
        productDK_image: "",


        productNBA_detail: "",
        productDK_stock: null,
        chack_status: false,
    }),
    methods: {


        async getType() {
            await axios
                .get(`${process.env.VUE_APP_SHOP}type`, {
                    headers: {
                        "auth-token": `Bearer ${this.$store.getters.token}`,
                    },
                })
                .then((res) => {
                    this.item_type = res.data.data;
                })
                .catch((e) => {
                    if (e.response.status === 408) {
                        window.location.reload();
                    }
                });
        },

        async getCompany() {
            await axios
                .get(`${process.env.VUE_APP_SHOP}company`, {
                    headers: {
                        "auth-token": this.$store.getters.token,
                    },
                })
                .then((res) => {
                    this.company = res.data.data;
                });
        },
        chooseImg(event) {
            if (event.files.length + this.imagePreviews.length > 3) {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "คุณสามารถอัปโหลดรูปได้สูงสุด 3 รูป",
                    life: 3000,
                });
                return;
            }

            for (const file of event.files) {
                this.imagePreviews.push(file.objectURL);
                this.productDK_images.push(file);
            }
        },

        async addProduct() {
            //ตรวจสอบค่าว่าง
            if (this.productDK_image === "") {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "กรุณาเลือกรูปภาพสินค้า",
                    life: 3000,
                });
                return false;
            }

            if (
                this.productNBA_name === "" ||
                this.productDK_code === "" ||
                this.productNBA_type === "" ||
                this.productNBA_cost === null ||
                this.pruductNBA_price === null ||
                this.productNBA_detail === "" ||
                this.productDK_stock === null ||
                this.productNBA_profit.nba === null
            ) {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
                    life: 3000,
                });

                return false;
            }
            {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "การแบ่งกำไรไม่ถูกต้อง",
                    life: 3000,
                });
                return false;
            }


            //ยืนยันการเพิ่ม
            this.$confirm.require({
                message: "ต้องการเพิ่มข้อมูลสินค้านี้?",
                header: "เพิ่มสินค้า",
                icon: "pi pi-exclamation-triangle",
                acceptLabel: "ตกลง",
                rejectLabel: "ยกเลิก",
                accept: async () => {
                    this.isLoading = true;
                    this.isDisabled = true;
                    const formData = new FormData();
                    for (let i = 0; i < this.productNBA_type.length; i++) {
                        formData.append(`productNBA_type[${i}]`, this.productNBA_type[i]);
                        console.log(i);
                    }
                    formData.append("productNBA_name", this.productNBA_name);
                    formData.append("productDK_code", this.productDK_code);
                    formData.append("productNBA_brand_id", this.productNBA_brand_id);

                    formData.append("productNBA_cost", this.productNBA_cost);

                    formData.append("productDK_image", this.productDK_image);
                    formData.append("productNBA_detail", this.productNBA_detail);
                    formData.append("productDK_stock", this.productDK_stock);





                    formData.append("productNBA_date_start", dayjs(Date.now()).format());

                    await axios
                        .post(`${process.env.VUE_APP_SHOP}product/nba`, formData, {
                            headers: {
                                "auth-token": `Bearer ${this.$store.getters.token}`,
                            },
                        })
                        .then(() => {
                            this.$router.push("/product");
                            this.isDisabled = false;
                            this.isLoading = false;
                            this.$toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "เพิ่มสินค้าเรียบร้อยแล้ว",
                                life: 3000,
                            });
                        })
                        .catch((err) => {
                            if (err.response.status === 408) {
                                window.location.reload();
                            }
                            this.isDisabled = false;
                            this.isLoading = false;
                            this.$toast.add({
                                severity: "warn",
                                summary: "แจ้งเตือน",
                                detail: err.response.data.message,
                                life: 3000,
                            });
                            console.log(this.err);
                        });
                },
            });
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