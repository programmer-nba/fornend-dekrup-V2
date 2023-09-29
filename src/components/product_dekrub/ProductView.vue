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
        <div class="field">
          <Dropdown v-model="filter_type" class="w-full z-0" inputClass="font" :options="type" optionLabel="type_name"
            optionValue="_id" :filter="true" filterPlaceholder="ค้นหาตามคีย์เวิร์ด" placeholder="FILTER"
            :autoFilterFocus="true" @change="filtertype()">
          </Dropdown>
        </div>
      </div>
      <div class="col-12 lg:col-2 mt-2">
        <div class="field">
          <Dropdown v-model="filter_brand" class="w-full z-0" inputClass="font" :options="brand" optionLabel="brand_name"
            optionValue="_id" :filter="true" filterPlaceholder="ค้นหาตามคีย์เวิร์ด" placeholder="Brand"
            :autoFilterFocus="true" @change="filterbrand()">
          </Dropdown>
        </div>
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

      <!-- สร้างคอลัมน์สำหรับแสดงข้อมูล -->
      <Column field="code" header="รหัสสินค้า" style="min-width: 16rem"></Column>
      <Column>
        <template #body="item">
          <img :src="getImage(item.data.picture)" class="product-image" />
        </template>
      </Column>
      <Column field="name" header="ชื่อสินค้า" style="min-width: 16rem"></Column>
      <Column field="detail" header="รายละเอียด" style="min-width: 16rem"></Column>
      <Column field="price" header="ราคา" style="min-width: 8rem">
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
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="item">
          <ProductDetail :product_id="item.data._id" :item_product="item_product" :product="item.data" />
          <router-link :to="'/product/detail/' + item.data._id" style="text-decoration: none">
            <Button icon="pi pi-fw pi-list" class="p-button-rounded p-button-info mr-2" />
          </router-link>
          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="delProduct(item.data._id)" />
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

export default {
  components: { ProductDetail },
  data() {
    return {
      item_product: [], // เริ่มต้นเป็นอาเรย์เปล่า
      search: "",
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/list`, {
          headers: {
            "token": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.item_product = response.data.data.reverse();
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "ผิดพลาด",
          detail: error.response.data.message,
          life: 3000,
        });
      }
    },


searchData() {
  if (this.search === "") {
    this.getData();
  } else {
    this.item_product = this.item_product.filter(
      (el) => el.name.includes(this.search)
    );
  }
},
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
