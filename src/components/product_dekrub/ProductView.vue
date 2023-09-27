<template>
  <div class="loading" v-if="isloading === true">
    <div class="spinner"></div>
  </div>
  <div v-else>
    <div
      class="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left w-full"
      role="separator"
      aria-orientation="horizontal"
    >
      <!---->
    </div>
    <div class="grid px-3">
      <div class="col-2 mt-2">
        <div class="field">
          <Dropdown
            v-model="filter_type"
            class="w-full"
            inputClass="font"
            :options="type"
            optionLabel="type_name"
            optionValue="_id"
            :filter="true"
            filterPlaceholder="ค้นหาตามคีย์เวิร์ด"
            placeholder="FILTER"
            :autoFilterFocus="true"
            @change="filtertype()"
          >
          </Dropdown>
        </div>
      </div>
      <div class="col-2 mt-2">
        <div class="field">
          <Dropdown
            v-model="filter_brand"
            class="w-full"
            inputClass="font"
            :options="brand"
            optionLabel="brand_name"
            optionValue="_id"
            :filter="true"
            filterPlaceholder="ค้นหาตามคีย์เวิร์ด"
            placeholder="Brand"
            :autoFilterFocus="true"
            @change="filterbrand()"
          >
          </Dropdown>
        </div>
      </div>
      <div class="col-2 mt-2">
        <div class="field">
          <Dropdown
            v-model="statustype"
            class="w-full"
            inputClass="font"
            :options="status_type"
            optionLabel="name"
            optionValue="name"
            :filter="true"
            filterPlaceholder="ค้นหาตามคีย์เวิร์ด"
            placeholder="PRODUCT STATUS"
            :autoFilterFocus="true"
            @change="filterstatustype()"
          >
          </Dropdown>
        </div>
      </div>
      <div class="col-3 mt-2">
        <div class="field">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon border-red-400" style="background-color: #C21010;">
              <i class="pi pi-search text-white"></i>
            </span>
            <InputText
              v-model="search"
              @keyup="searchData()"
              class="w-full font"
              placeholder="ค้นหาสินค้า เช่น ชื่อสินค้า "
            />
          </div>
        </div>
      </div>
      <div class="col-1 mt-2">
        <div class="field">
          <Button
            label="Clear All" style="background-color: #BD1616;"
            class=" w-full border-red-400"
            @click="refiltertype()"
          />
        </div>
      </div>
      <div class="col mt-2">
        <div class="field">
          <Button
            label="Add Product"  style="background-color: #E60965;"
            class="border-red-400"
            @click="$router.push('/product/add')"
          />
        </div>
      </div>
    </div>
    <div class="grid px-3">
      <div class="col-12 lg:col-12">
        <DataTable
          :value="item_product"
          :paginator="true"
          :rows="20"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
          currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด"
          responsiveLayout="scroll"
        >
          <template #empty>
            <p class="font-italic text-center text-5xl" style="color: #BD1616;">ไม่พบข้อมูลสินค้า</p>
          </template>
          <Column
            header="ซ่อน/แสดง"
            :exportable="false"
            style="min-width: 3rem"
          >
            <template #body="slotProps">
              <InputSwitch
                :model-value="checkProductStatus(slotProps.data)"
                @change="updateProductStatus(slotProps.data)"
              />
              <!-- <switchProduct :product="slotProps.data" /> -->
            </template>
          </Column>
          <Column style="min-width: 12rem" header="บาร์โค้ดสินค้า">
            <template #body="item">
              <Chip :label="item.data.productNBA_barcode" />
            </template>
          </Column>
          <Column
            field="productNBA_name"
            header="ชื่อสินค้า"
            style="min-width: 16rem"
          ></Column>
          <Column>
            <template #body="item">
              <img
                :src="getImage(item.data.productNBA_image)"
                class="product-image"
              />
            </template>
          </Column>
          <Column field="price" header="ราคา" style="min-width: 8rem">
            <template #body="item">
              {{ numberFormat(item.data.productNBA_price) }}
            </template>
          </Column>
          <Column field="price" header="จำนวนคงเหลือ" style="min-width: 8rem">
            <template #body="item">
              {{ numberFormatShort(item.data.productNBA_stock) }}
            </template>
          </Column>
          <Column :exportable="false" style="min-width: 8rem">
            <template #body="item">
              <!-- <DetailProduct
                :product_id="item.data._id"
                :item_product="item_product"
                :product="item.data"
              /> -->
              <ProductDetail
                :product_id="item.data._id"
                :item_product="item_product"
                :product="item.data"
              />
              <!-- <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="openDialogStock(item.data)"
              /> -->
              <router-link
                :to="'/product/detail/' + item.data._id"
                style="text-decoration: none"
                ><Button
                  icon="pi pi-fw pi-list"
                  class="p-button-rounded p-button-info mr-2"
              /></router-link>
              <ImageBarcode :product="item.data" />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger mr-2"
                @click="delProduct(item.data._id)"
              />
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
// import axios from "axios";
// import DetailProduct from "../product_nba/DetailProduct.vue";
export default {


}
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
