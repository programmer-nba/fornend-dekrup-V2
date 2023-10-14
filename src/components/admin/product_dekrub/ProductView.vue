<template>
  <div class="loading" v-if="isloading === true">
    <div class="spinner"></div>
  </div>
  <div v-else>
    <div class="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left w-full" role="separator"
      aria-orientation="horizontal">
      <!---->
    </div>
    <div class="grid z-0 justify-content-center">
      <div class="col-12 lg:col-4 mt-2">
        <div class="field">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon border-red-400" style="background-color: #c21010">
              <i class="pi pi-search text-white"></i>
            </span>
            <InputText v-model="search" @keyup="searchDataAutomatically()" class="w-full font z-0"
              placeholder="ค้นหาสินค้า เช่น ชื่อสินค้า รหัสสินค้า " />
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-4 mt-2">
        <div class="field">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon border-red-400" style="background-color: #c21010">
              <i class="pi pi-search text-white"></i>
            </span>
            <Dropdown class="w-full font z-0" placeholder="เลือกหมวดหมู่สินค้า" :options="categories" v-model="category"
              optionLabel="name" optionValue="_id" @change="filterProductsByCategory" />
            <Button class="w-8rem font z-0 border-none" label="รีเซ็ต" @click="resetSearch"
              style="background-color: #7d7c7c" />
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-2 mt-2">
        <div class="field">
          <Button label="Add product" style="background-color: #e60965" class="border-red-400"
            @click="$router.push('/admin/product/add')" />
        </div>
      </div>
    </div>
    <div class="grid px-3">
      <div class="col-12 lg:col-12">
        <DataTable :value="item_product" :paginator="true" :rows="20"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
          currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด" responsiveLayout="stack">
          <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->
          <template #empty>
            <p class="font-italic text-center text-5xl" style="color: #bd1616">
              ไม่พบข้อมูลสินค้า
            </p>
          </template>

          <Column header="รูป" style="width: 10%">
            <template #body="item">
              <Image :src="getImage(item.data.picture)" class="product-image" width="100" preview />
            </template>
          </Column>
          <Column field="code" header="รหัสสินค้า" class="text-center" style="width: 10%"></Column>
          <Column field="name" header="ชื่อสินค้า" class="text-center" style="width: 10%"></Column>
          <Column field="detail" header="รายละเอียด" class="detail-column text-center" style="width: 25%"></Column>
          <Column field="price" header="ราคาขาย" class="text-center" style="width: 5%">
            <template #body="item">
              {{ numberFormat(item.data.price) }}
            </template>
          </Column>
          <Column field="price" header="ราคาทุน" class="text-center" style="width: 5%">
            <template #body="item">
              {{ numberFormat(item.data.cost) }}
            </template>
          </Column>
          <Column field="quantity" header="จำนวนคงเหลือ" class="text-center" style="width: 7%">
            <template #body="item">
              {{ numberFormatShort(item.data.quantity) }}
            </template>
          </Column>
          <Column field="category" class="text-center" header="หมวดหมู่">
            <template #body="item">
              {{ getCategoryName(item.data.category) }}
            </template>
          </Column>
          <Column :exportable="false" class="text-center" header="แก้ไข" style="width: 10%">
            <template #body="item">
              <Button @click="editProduct(item.data)" class="border-none" style="background-color: #e60965">แก้ไข</Button>
            </template>
          </Column>
        </DataTable>

        <Dialog v-model:visible="displayEdit" :modal="true" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
          :style="{ width: '700px' }">
          <div>
            <h2>แก้ไขสินค้า</h2>
            <div class="field">
              <label for="name">ชื่อสินค้า</label>
              <InputText id="name" v-model="edit_product.name" class="w-full" autofocus />
            </div>
            <div class="field">
              <label for="detail">รายละเอียด</label>
              <Textarea id="detail" v-model="edit_product.detail" class="w-full" autofocus />
            </div>

            <div class="field">
              <label for="price">ราคา</label>
              <InputText id="price" v-model="edit_product.price" class="w-full" autofocus />
            </div>

            <div class="field">
              <label for="cost">ราคาทุน</label>
              <InputText id="cost" v-model="edit_product.cost" class="w-full" autofocus />
            </div>
            <div class="field">
              <label for="quantity">จำนวนคงเหลือ</label>
              <InputText id="quantity" v-model="edit_product.quantity" class="w-full" autofocus />
            </div>
            <div class="field">
              <label for="category">หมวดหมู่</label>
              <Dropdown v-model="edit_product.category" optionLabel="name" optionValue="_id" :options="categories"
                class="w-full" />
            </div>

            <div class="field">
              <label for="image">รูปภาพ</label> <br />
              <Image v-if="edit_productImage" :src="imagePreview" class="product-image" width="100" height="100"
                preview />
              <br />
              <input type="file" @change="onImageChange" accept="image/*" />
            </div>
            <Button @click="saveEdit" class="mr-2 bg-red-600 border-none">บันทึก</Button>
            <Button @click="closeDialog" class="surface-500 border-none">ยกเลิก</Button>
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

export default {
  created() {
    document.title = "Product | Dekrub Shop";
  },

  setup() {
    const item_product = ref([]);
    const search = ref("");
    const category = ref("");
    const displayEdit = ref(false);
    const edit_product = ref({
      newImage: null,
    });
    const categories = ref([]);
    const item_productFull = ref([]);

    const edit_productImage = ref("");
    const edit_productImageFile = ref(null);
    const imagePreview = ref("");

    const resetSearch = () => {
      search.value = ""; // รีเซ็ตค่าค้นหาเป็นข้อความว่าง
      category.value = ""; // รีเซ็ตค่าหมวดหมู่เป็นค่าว่าง
      getData(); // เรียกใช้ฟังก์ชัน searchData เพื่อแสดงรายการสินค้าทั้งหมด
    };

    const searchDataAutomatically = async () => {
      try {
        const searchTermLower = search.value.toLowerCase();
        const codeLower = search.value.toLowerCase();

        if (search.value === "" && !category) {
          // ถ้าคำค้นหาว่าง และไม่มีหมวดหมู่ที่ถูกเลือก
          item_product.value = item_productFull.value;
        } else {
          // มีคำค้นหาให้กรองรายการสินค้าตามคำค้นหา
          item_product.value = item_productFull.value.filter(
            (product) =>
              (product.category === category._value || !category._value) &&
              (product.name.toLowerCase().includes(searchTermLower) ||
                product.code.toLowerCase().includes(codeLower))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    const filterProductsByCategory = async () => {
      console.log("Selected Category:", category);

      if (category) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/list`, {
            headers: {
              token: localStorage.getItem("token"),
            },
            params: {
              category: category._value, // เลือก _value จาก ref แทนค่า ref เอง
            },
          });

          item_product.value = response.data.data
            .reverse()
            .map((item) => {
              if (item.category === category._value) {
                return item;
              }
              return null;
            })
            .filter((item) => item !== null);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        item_product.value = item_productFull.value;
      }
    };

    const getCategoryName = (categoryId) => {
      const category = categories.value.find((c) => c._id === categoryId);
      return category ? category.name : "";
    };

    const getData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_DEKRUP}/product/list`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        const categoryResponse = await axios.get(
          `${process.env.VUE_APP_DEKRUP}/product/category/list`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log("Product Data:", productResponse.data);

        categories.value = categoryResponse.data.data;

        item_product.value = productResponse.data.data.reverse().map((item) => {
          if (item.category && categories.value.find((c) => c._id === item.category)) {
            return { ...item, category: item.category };
          }
          return item;
        });

        item_productFull.value = [...item_product.value]; // ทำการสร้างคัดลอกข้อมูลเพื่อ item_productFull
      } catch (error) {
        console.error(error);
      }
    };

    const getCategoryData = async () => {
      try {
        const categoryResponse = await axios.get(
          `${process.env.VUE_APP_DEKRUP}/product/category/list`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        categories.value = categoryResponse.data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const searchData = () => {
      const searchTermLower = search.value.toLowerCase();
      const codeLower = search.value.toLowerCase();
      let filteredProducts = item_productFull.value;

      if (category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category._value
        );
      }

      if (search.value === "") {
        item_product.value = filteredProducts;
      } else {
        item_product.value = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTermLower) ||
            product.code.toLowerCase().includes(codeLower)
        );
      }
    };

    const numberFormat = (number) => {
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const numberFormatShort = (number) => {
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    };

    const saveEdit = async () => {
      try {
        if (edit_product.value && edit_product.value.name) {
          console.log("Name is defined:", edit_product.value.name);
          console.log("Image file is defined:", edit_productImageFile.value);
          const formData = new FormData();
          formData.append("name", edit_product.value.name);
          formData.append("detail", edit_product.value.detail);
          formData.append("price", edit_product.value.price);
          formData.append("cost", edit_product.value.cost);
          formData.append("quantity", edit_product.value.quantity);
          formData.append("category", edit_product.value.category);

          if (edit_productImageFile.value) {
            formData.append("imgCollection", edit_productImageFile.value);
          }

          console.log("FormData:", formData);

          const response = await axios.put(
            `${process.env.VUE_APP_DEKRUP}/product/update/${edit_product.value._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                token: localStorage.getItem("token"),
              },
            }
          );
          console.log("Response data:", response.data);

          if (response.data.message === "อัพเดทสินค้าสำเร็จ") {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "บันทึกข้อมูลสำเร็จ",
            }).then(() => {
              if (
                response.data.updatedProduct &&
                "picture" in response.data.updatedProduct
              ) {
                const updatedImage = getImage(response.data.updatedProduct.picture);
                edit_productImage = updatedImage; // อัพเดทรูปภาพทันที
              }

              // รีเซ็ตค่าฟิลด์อัพโหลดรูปภาพ
              edit_productImageFile.value = null;
              getData();
              displayEdit.value = false;
            });
          }
        } else {
          console.error("edit_product is undefined.");
        }
      } catch (error) {
        console.error("Error saving data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save data",
        });
      }
    };

    const getImage = (item) => {
      if (item) {
        if (typeof item === "string") {
          return `https://drive.google.com/uc?export=view&id=${item}`;
        } else if (Array.isArray(item) && item.length > 0) {
          const firstImageId = item[0];
          return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
        }
      }
      return "";
    };

    const onImageChange = (event) => {
      console.log("onImageChange function called");

      const file = event.target.files[0];
      console.log("Selected file:", file);

      if (file && file.size > 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "ขนาดไฟล์รูปภาพต้องไม่เกิน 1 MB",
        });
        event.target.value = "";
        return;
      }

      if (file) {
        // อัพเดต edit_productImageFile ทันที
        edit_productImageFile.value = file;
        edit_product.newImage = file;
        const reader = new FileReader();
        reader.onload = () => {
          // อัพเดต imagePreview ทันที
          imagePreview.value = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        if (!edit_productImageFile.value) {
          // ใช้ค่าเดิมแทนการรีเซ็ตเมื่อไม่มีไฟล์ใหม่
          if (edit_product.value && edit_product.value.picture) {
            imagePreview.value = getImage(edit_product.value.picture);
          } else {
            // ไม่มีรูปเดิม
            imagePreview.value = "";
          }
        }
      }
    };

    const editProduct = (item) => {
      if (item && item.picture) {
        displayEdit.value = true;
        edit_product.value = { ...item };

        // ใช้รูปภาพทั้งหมดในอาร์เรย์ item.picture
        if (Array.isArray(item.picture) && item.picture.length > 0) {
          const images = item.picture.map((imageId) => getImage(imageId));
          edit_productImage.value = images[0]; // ใช้รูปแรกเป็นตัวอย่าง

          // แสดงรูปแรกใน imagePreview หรืออื่น ๆ
          imagePreview.value = images[0];
        } else {
          console.error("Invalid item or missing picture property");
        }
      }
    };

    const closeDialog = () => {
      if (displayEdit !== undefined) {
        displayEdit.value = false;
      } else {
        console.error("displayEdit is undefined");
      }
    };

    onMounted(() => {
      getData();
      getCategoryData();
    });

    return {
      item_product,
      search,
      category,
      getData,
      searchData,
      getImage,
      numberFormat,
      numberFormatShort,
      searchDataAutomatically,
      displayEdit,
      closeDialog,
      editProduct,
      edit_product,
      saveEdit,
      edit_productImage,
      categories,
      onImageChange,
      imagePreview,
      filterProductsByCategory,
      getCategoryName,
      resetSearch,
    };
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #b434db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 960px) {
  .product-image {
    width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}

/* CSS for responsive design */
@media (max-width: 768px) {
  .detail-column {
    display: none;
    /* ซ่อนคอลัมน์รายละเอียดเมื่อหน้าจอขนาดเล็ก */
  }
}
</style>

<style>
.p-dialog {
  z-index: 9997;
}

.swal2-container {
  z-index: 9999;
}

.p-datatable .p-datatable-thead>tr>th {
  background-color: #fffde3 !important;
  color: #c21010;
  border-bottom: 1px solid #cfe8a9;
  text-align: center !important;
  justify-content: center;
}

.p-datatable .p-column-header-content {
  /* display: flex; */
  align-items: center !important;
  justify-content: center !important;
}
</style>
