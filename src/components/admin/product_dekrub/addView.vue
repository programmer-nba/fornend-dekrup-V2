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
                                <Image v-for="(preview, index) in imagePreviews" :key="index" :src="preview.url" width="200"
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
                                <label>ชื่อสินค้า :</label>
                                <InputText v-model="name" class="font w-full" placeholder="กรอกชื่อสินค้า"
                                    :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>หมวดหมู่สินค้า :</label>
                                <Dropdown v-model="product.categoryid" :options="item_category" optionLabel="name"
                                    optionValue="_id" placeholder="เลือกหมวดหมู่สินค้า" class="w-full" inputClass="font"
                                    :disabled="isDisabled" :filter="true" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>ราคาขาย (Shop) :</label>
                                <InputNumber v-model="product.price" class="w-full" inputClass="font"
                                    placeholder="กรอกราคาขายสินค้า" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>จำนวนสินค้าในสต๊อก<small>(ชิ้น)</small> :</label>
                                <InputNumber v-model="product.quantity" class="w-full" inputClass="font"
                                    placeholder="กรอกจำนวนสินค้าในสต๊อก" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="field">
                                <label>รายละเอียดสินค้า</label>
                                <Editor v-model="detail" editorStyle="height: 200px"
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

export default {
    name: "addView",
    data() {
        return {
            isDisabled: false,
            imagePreviews: [],
            product: {
                imagePreviews: [],
                productDK_images: [],
                price: null,
                quantity: null,
            },
            item_category: [], 

        };
    },
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


        save() {
            if (
                this.product.name === "" ||
                this.product.categoryid === "" ||
                this.product.price === "" ||
                this.product.quantity === "" ||
                this.product.detail === ""

            )
                this.$toast.add({
                    severity: "error",
                    summary: "แจ้งเตือน",
                    detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
                    life: 3000,
                });
            else {
                this.confirmDialog = true;
            }
        },
        chooseImg(event) {
            if (event.files.length + this.product.imagePreviews.length > 3) {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "คุณสามารถอัปโหลดรูปได้สูงสุด 3 รูป",
                    life: 3000,
                });
                return;
            }
            for (const file of event.files) {
                const objectURL = URL.createObjectURL(file); // สร้าง URL สำหรับรูปภาพ
                this.imagePreviews.push({ url: objectURL }); // เพิ่ม URL ลงในอาร์เรย์
                this.product.imagePreviews.push({ url: objectURL }); // เพิ่ม URL ลงในอาร์เรย์ใน product
                this.product.productDK_images.push(file);
            }

            // ลบรูปภาพตัวอย่างหลังจาก 5 วินาที
            setTimeout(() => {
                this.product.imagePreviews = [];
            }, 5000);
        },
        async addProduct() {
      this.isloading = true;

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_DEKRUP}/product/create`,
          {
            name: this.product.name,
            categoryid: this.product.categoryid,
            price: this.product.price,
            quantity: this.product.quantity,
            detail: this.product.detail,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        this.isloading = false;
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "เพิ่มข้อมูลเรียบร้อย",
          life: 3000,
        });
        this.confirmDialog = false;
        this.$router.push("/admin/admin");
      } catch (error) {
        this.isloading = false;
        if (error.response && error.response.status === 408) {
          window.location.reload();
        }
        this.$toast.add({
          severity: "error",
          summary: "แจ้งเตือน",
          detail: error.response
            ? error.response.data.message
            : "มีข้อผิดพลาดในการส่งข้อมูล",
          life: 3000,
        });
        this.confirmDialog = false;
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