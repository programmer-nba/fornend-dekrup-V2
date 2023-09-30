<template>
  <div class="loading" v-if="isloading === true">
    <div class="spinner"></div>
  </div>
  <div v-else>
    <div class="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left w-full" role="separator"
      aria-orientation="horizontal">
      <!---->
    </div>
    <div class="grid  z-0 justify-content-center">
      <div class="col-12 lg:col-2 mt-2">
        <!-- <div class="field">
          <Dropdown v-model="filter_type" class="w-full z-0" inputClass="font" :options="type" optionLabel="type_name"
            optionValue="_id" :filter="true" filterPlaceholder="ค้นหาตามคีย์เวิร์ด" placeholder="FILTER"
            :autoFilterFocus="true" @change="filtertype()">
          </Dropdown>
        </div> -->
      </div>
      <div class="col-12 lg:col-2 mt-2">
        <!-- <div class="field">
          <Dropdown v-model="filter_brand" class="w-full z-0" inputClass="font" :options="brand" optionLabel="brand_name"
            optionValue="_id" :filter="true" filterPlaceholder="ค้นหาตามคีย์เวิร์ด" placeholder="Brand"
            :autoFilterFocus="true" @change="filterbrand()">
          </Dropdown>
        </div> -->
      </div>

      <div class="col-12 lg:col-2 mt-2">
        <div class="field">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon border-red-400" style="background-color: #C21010;">
              <i class="pi pi-search text-white"></i>
            </span>
            <InputText v-model="search" class="w-full font z-0" placeholder="ค้นหาสินค้า เช่น ชื่อสินค้า " />
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-1 mt-2">
        <div class="field">
          <Button label="Clear All" style="background-color: #BD1616;" class=" w-full border-red-400 z-0"
            @click="refiltertype()" />
        </div>
      </div>
      <div class="col-12 lg:col-2 mt-2">
        <div class="field">
          <Button label="Add product" style="background-color: #E60965;" class="border-red-400"
            @click="$router.push('/admin/product/add')" />
        </div>
      </div>
    </div>
    <div class="grid px-3">
      <div class="col-12 lg:col-12">
        <DataTable :value="item_product" :paginator="true" :rows="20"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
          currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด" responsiveLayout="scroll">
          <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->
          <template #empty>
            <p class="font-italic text-center text-5xl" style="color: #BD1616;">ไม่พบข้อมูลสินค้า</p>
          </template>

          <Column header="รูป" style="width: 15%">
            <template #body="item">
              <img :src="getImage(item.data.picture)" class="product-image" />
            </template>
          </Column>
          <Column field="code" header="รหัสสินค้า" style="width: 15%"></Column>
          <Column field="name" header="ชื่อสินค้า" style="width: 15%"></Column>
          <Column field="detail" header="รายละเอียด" style="width: 15%"></Column>
          <Column field="price" header="ราคา" style="width: 15%min-width: 8rem">
            <template #body="item">
              {{ numberFormat(item.data.price) }}
            </template>
          </Column>
          <Column field="quantity" header="จำนวนคงเหลือ" style="min-width: 8rem">
            <template #body="item">
              {{ numberFormatShort(item.data.quantity) }}
            </template>
          </Column>
          <Column field="category" header="หมวดหมู่" style="min-width: 16rem"></Column>
          <Column header="แก้ไข" style="width: 15%">

    <template #body="item">
      <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editProduct(item.data._id)" />
      <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteProduct(item.data._id)" />
    </template>
  </Column>

        </DataTable>


      </div>
    </div>

    <!--Dialog-->
    <!-- <Dialog
      v-model:visible="dialogStock"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '20vw' }"
    >
      <template #header>
        <strong>แก้ไขสต๊อกสินค้า</strong>
      </template>
      <div class="grid">
        <div class="col-12">
          <div class="field">
            <label>จำนวนสินค้า :</label>
            <InputNumber
              v-model="new_stock"
              class="w-full"
              inputClass="font"
              placeholder="กรอกจำนวนสินค้าในสต๊อก"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="ยกเลิก"
          class="p-button-text"
          @click="dialogStock = false"
        />
        <Button label="บันทึก" @click="updateStock" />
      </template>
    </Dialog> -->
  </div>
</template>

<script>
import axios from "axios";
import ProductDetail from "../product_dekrub/ProductDetail.vue";
import { onMounted, ref } from "vue";

export default {
  components: { ProductDetail },
  setup() {
    const item_product = ref([]);
    const search = ref("");
    const category = ref("");

    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/list`, {
          headers: {
            "token": `${localStorage.getItem("token")}`,
          },
        });

        item_product.value = response.data.data.reverse();
      } catch (error) {
        console.error(error);
      }
    };


    const searchData = () => {
      if (search.value === "") {
        getData();
      } else {
        item_product.value = item_product.value.filter(
          (el) => el.name.includes(search.value)
        );
      }
    };
    const getImage = (item) => {
  if (typeof item === 'string') {
    return `https://drive.google.com/uc?export=view&id=${item}`;
  } else if (Array.isArray(item) && item.length > 0) {
    const firstImageId = item[0];
    return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
  } else {
    return ""; 
  }
};




    const filtercategory = () => {
      if (category.value !== "") {
        const _id = category.value;
        item_product.value = item_product.value.filter(
          (item) => item.product_category === _id
        );
      } else {
        getData(); // คืนค่ารายการสินค้าทั้งหมดหากไม่มีการเลือกหมวดหมู่
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

    onMounted(() => {
      getData();
    });

    return {
      item_product,
      search,
      category, // เพิ่ม category เข้าไปในการ return
      getData,
      searchData,
      getImage,
      filtercategory, // เพิ่ม filtercategory เข้าไปในการ return
      numberFormat,
      numberFormatShort,
    };
  },
};
</script>






<style scoped>
.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

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

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
