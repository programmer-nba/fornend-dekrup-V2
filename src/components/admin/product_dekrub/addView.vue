<template>
    <div style="background-color: #FFDEDE; ">
        <div class="grid px-3">
            <div class="col-12 lg:col-12 mt-2">
                <Panel class="custom-header-panel">
                    <template #header>เกี่ยวกับสินค้า</template>
                    <div class="grid">
                        <div class="col-12 text-center">
                            <div class="justify-content-center mb-3"
                                style="display: flex; flex-direction: row; flex-wrap: nowrap;">
                                <!-- <Image v-for="(preview, index) in imagePreviews" :key="index" :src="preview.url" width="200"
                                    :preview="true" /> -->
                                <div v-if="img_previews.length > 3" class="alert alert-danger">
                                    คุณสามารถเพิ่มรูปได้เพียง 3 รูปเท่านั้น
                                </div>
                                <template v-for="(preview, index) in img_previews" :key="index">
                                    <Image v-if="preview" :src="preview" width="200" height="200" />
                                </template>
                            </div>
                            <label class="custom-file-input-label">
                                <span>เลือกรูปหน้าปก (เลือกได้สูงสุด 3 รูป)</span>
                                <input type="file" class="input-image" @change="SetImages($event)" multiple />
                                <span class="custom-button">เลือกไฟล์</span>
                            </label>

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
                                <label>ราคาขาย (Shop) :</label>
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
    img_previews: [],
    img_upload: null,
    img_size: null,
    dialog_img_warning: false,
    imagePreviews: [],
    name: "",
    categoryid: "",
    detail: "",
    price: "",
    quantity: "",
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
  this.img_previews = []; // เปลี่ยนเป็น img_previews
  this.img_upload = null;
  this.dialog_img_warning = false;
},

ResetData() {
  this.name = "";
  this.categoryid = "";
  this.detail = "";
  this.price = "";
  this.quantity = "";
},

async addProduct() {
      this.isloading = true;

      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("categoryid", this.categoryid);
        formData.append("detail", this.detail);
        formData.append("price", this.price);
        formData.append("quantity", this.quantity);

        for (let i = 0; i < this.img_upload.length; i++) {
          formData.append("imgCollection[]", this.img_upload[i] || null);
        }

        const response = await axios.post(
          `${process.env.VUE_APP_DEKRUP}/product/create`,
          formData,
          {
            headers: {
              token: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response) {
          console.log(response);
          this.ResetData();
          this.ResetImage();
          this.isloading = false;
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มรายการสินค้าสำเร็จ",
            life: 3000,
          });
        }
      } catch (error) {
        console.error(error);
        this.isloading = false;
        this.$toast.add({
          severity: "error",
          summary: "เกิดข้อผิดพลาด",
          detail: "ไม่สามารถเพิ่มรายการสินค้าได้",
          life: 3000,
        });
      }
    },
    
    SetImages(e) {
      const files = e.target.files;
      const maxImages = 3;
      this.img_upload = [];

      for (let i = 0; i < files.length; i++) {
        if (this.img_previews.length < maxImages) {
          const file = files[i];
          this.img_size = file.size;

          if (this.img_size > 500000) {
            this.dialog_img_warning = true;
            continue;
          }

          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.addEventListener("load", (event) => {
            this.img_previews.push(event.target.result);
            this.img_upload.push(file);
          });
        } else {
          this.dialog_img_warning = true;
          alert("คุณสามารถเพิ่มรูปได้เพียง 3 รูปเท่านั้น");
          break;
        }
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

.custom-file-input-label {
    align-items: center;
    justify-content: center;
    background-color: #007BFF;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.input-image {
    display: none;
}

.custom-button {
    background-color: #0056b3;
    padding: 5px 10px;
    border-radius: 3px;
}

.custom-button:hover {
    background-color: #003c80;
}

.alert {
    background-color: #f8d7da;
    color: #721c24;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>