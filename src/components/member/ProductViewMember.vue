<template>
  <h1 class="px-3" style="color: #fe0000">สั่งซื้อสินค้า</h1>
  <div class="grid">
    <div class="md:col-6 col-12 mt-2">
      <div class="field">
        <div class="p-inputgroup">
          <span class="p-float-label">
            <InputText v-model="search"
              class="w-4rem font border-red-700 input-search-sercice border-round-3xl text-red-800"
              style="background-color: #ffe5e5" @keyup="searchDataAutomatically()" />
            <label class="text-red-800 px-3">ค้นหา</label>
          </span>
        </div>
      </div>
    </div>
    <div class="md:col-6 col-12 mt-2">
      <div class="field">
        <div class="card flex justify-content-start">
      <Dropdown v-model="selectedCategory" :options="category" optionValue="_id" optionLabel="name" placeholder="เลือกหมวดหมู่"
              class=" responsive-dropdown" @change="searchDataAutomatically()" />
              <Button style="margin-left: 5px;" label="สินค้าทั้งหมด" severity="danger" rounded  @click="resetDropdown"/>

        </div>
      </div>
    </div>
  </div>

  <div class="grid">
    <div class="col-6 md:col-4 lg:col-4 xl:col-3 mt-3" v-for="product in filteredProducts" :key="product.id">
      <div class="card-background">

        <div class="size-img-product">
          <img :src="getImage(product.picture)" class="img-modal-product-preview img-product" />
        </div>
        <strong class="txt-head">{{ truncateText(product.name, 25) }}</strong>
        <p class="txt-category">
          หมวดหมู่ <span>{{ getCategoryName(product.category) }}</span>
        </p>
        <p class="txt-category">
          จำนวน <span>{{ product.quantity }}</span>
        </p>
        <p class="txt-price">
          ราคา <span>{{ product.price }}</span> บาท
        </p>
      
      </div>
      <div class="flex" style="margin-top: -65px; margin-left: 10px; margin-right: 5px;">
          <Button severity="warning" icon="pi pi-shopping-cart" style="margin-right: 5px" @click="addAmount(product)" />
          <Button @click="chooseProduct(product)" class="btn-description" label="รายละเอียด" severity="danger" />
        </div>
    </div>
    
  </div>

  <!-- Dialog จำนวนสั่งซื้อ -->
  <Dialog v-model:visible="DialogaddAmount" modal header="จำนวนสั่งซื้อ">
    <InputNumber v-model="amount" inputId="minmax-buttons" mode="decimal" showButtons :min="0" />
    <template #footer>
      <Button label="ปิด" icon="pi pi-times" @click="clearData()" text />
      <Button label="สั่งซื้อ" icon="pi pi-shopping-cart" @click="addCart()" />
    </template>
  </Dialog>

  <Dialog v-model:visible="DialogChooseProduct" :modal="true" header="สินค้าของเรา" style="width: 100vh">
    <div class="grid">
      <div class="md:col-4 col-12 flex justify-content-center">
        <Image alt="Image" preview>
          <template #indicatoricon>
            <i class="pi pi-eye"></i>
          </template>
          <template #image>
            <img :src="imgSrc" class="img-modal-product" alt="image" />
          </template>
          <template #preview="slotProps">
            <img :src="imgSrc" class="img-modal-product-preview" alt="preview" :style="slotProps.style"
              @click="slotProps.onClick" />
          </template>
        </Image>
      </div>
    </div>
    <div class="card-head">
      <p class="text-red-500 text-xl" style="-webkit-text-stroke: 1px">
        {{ productMember.name }}
      </p>
      <small class="text-600" style="font-size: 14px; -webkit-text-stroke: 1px">หมวดหมู่: {{
        getCategoryName(productMember.category) }} </small>
      <br />
      <small class="text-600" style="font-size: 14px; -webkit-text-stroke: 1px">จำนวน {{ productMember.quantity }}</small>
    </div>
    <div class="my-2">
      <label class="text-700" for="" style="font-size: 20px; -webkit-text-stroke: 1px">รายละเอียดสินค้า</label>
    </div>
    <small class="text-700" for="" style="font-size: 18px">
      {{ productMember.detail }}
    </small>
    <div class="my-2">
      <label class="text-red-500" for="" style="font-size: 24px; -webkit-text-stroke: 1px">ราคา {{ productMember.price }}
        บาท</label>
    </div>
    <template #footer>
      <Button label="ปิด" icon="pi pi-times" @click="clearData()" text />
    </template>
  </Dialog>
</template>

<script>
import axios from "axios";
import Image from "primevue/image";
import { useToast } from "vue-toastification";
export default {
  components: {
    // ScrollTop,
    Image,
  },
  setup() {
    const toast = useToast();
    return {  toast };
  },


  data: () => ({
    DialogaddAmount: false,
    DialogChooseProduct: false,
    search: "", 
    category: [], 
    product: "",
    item_product: [], 
    selectedCategory: null, 
    filteredProducts: [],
    data: "",
    amount: 0,
  }),

  async mounted() {
    this.$store.commit("setLoading", true);
    try {
      const categoryResponse = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/category/member/list`, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      this.category = categoryResponse.data.data;
    } catch (error) {
      this.$store.commit("setLoading", false);
      this.$toast.add({
        severity: "error",
        summary: "ผิดพลาด",
        detail: error.response.data.message,
        life: 3000,
      });
    }

    try {
      const productResponse = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/member/list`, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      const product = productResponse.data.data;
      this.item_product = product.reverse();

      // Initialize filteredProducts with all products initially
      this.filteredProducts = this.item_product;
    } catch (error) {
      // Handle error
      this.$store.commit("setLoading", false);
      this.$toast.add({
        severity: "error",
        summary: "ผิดพลาด",
        detail: error.response.data.message,
        life: 3000,
      });
    }


    this.$store.commit("setLoading", false);
  },


  methods: {



    getCategoryName(categoryId) {
      const foundCategory = this.category.find(cat => cat._id === categoryId);
      return foundCategory ? foundCategory.name : '';
    },

    getImage(item) {
      return "https://drive.google.com/uc?export=view&id=" + item;
    },

    addAmount(item) {
      this.DialogaddAmount = true;
      this.data = item;
    },

    chooseProduct(item) {
      this.productMember = item; // เก็บข้อมูลสินค้าที่เลือกไว้ในตัวแปร productMember
      this.imgSrc = this.getImage(item.picture); // กำหนดรูปภาพของสินค้าในตัวแปร imgSrc
      this.DialogChooseProduct = true; // แสดง DialogChooseProduct
    },

    async addCart() {
      if (this.amount === 0) {
        this.toast.warning("กรุณาเพิ่มจำนวนสั่งซื้อ");
        return;
      }

      // ดำเนินการเพิ่มรายการสินค้า
      this.$store.commit("setLoading", false);
      this.total = this.data.price * this.amount;

      if (this.amount > this.data.quantity) {
        return this.toast.error("ขออภัยจำนวนสินค้าไม่เพียงพอ");
      }

      const order = {
        product_id: this.data._id,
        quantity: this.amount,
      };

      const order_detail = {
        category: this.data.category,
        name: this.data.name,
        code: this.data.code,
        price: this.total,
        quantity: this.amount,
      };

      const cus = {
        member_number: this.member_number,
        name: this.name,
        tel: this.tel,
        address: this.address,
        line: this.line,
      };

      this.$store.commit("setCus", cus);
      this.$store.dispatch("addOrder", order);
      this.$store.dispatch("addOrderDetail", order_detail);
      this.clearData();
    },

    async clearData() {
      this.DialogaddAmount = false;
      this.DialogChooseProduct = false;
      this.amount = 0;
    },

    // fix ตัวหนังสือชื่อสินค้าให้แสดงกี่ตัว
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },

    //สำหรับค้นหาข้อมูลสินค้า
    async searchDataAutomatically() {
    try {
      console.log("Selected Category:", this.selectedCategory); 
      const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/member/list`, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          query: this.search,
          category: this.selectedCategory || undefined, 
        },
      });
      console.log("API Response:", response.data); 
      const searchLower = this.search.toLowerCase();
      this.filteredProducts = response.data.data.filter(product => {
        const productNameLower = product.name.toLowerCase();
        const categoryMatch = !this.selectedCategory || product.category === this.selectedCategory;
        return (
          (productNameLower.includes(searchLower) || productNameLower.includes(this.search)) &&
          categoryMatch
        );
      });

    // ตรวจสอบค่าของ filteredProducts ใน console
        console.log("Filtered Products:", this.filteredProducts);
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "ผิดพลาด",
          detail: error.response.data.message,
          life: 3000,
        });
      }

    },

    resetDropdown() {
      this.selectedCategory = null; 
      this.searchDataAutomatically(); 
    },




  },



};
</script>

<style scoped>
.txt-font-faimily {
  font-family: "Kanit", sans-serif;
}

.p-dropdown {
  border: 2px solid red;
}

.p-inputtext {
  font-family: "Kanit", sans-serif;
  border: 2px solid #ff0000;
  box-shadow: rgba(173, 8, 8, 0.24) 0px 3px 8px;
  border-radius: 50px;
  width: 450px;
  color: red;
}

.txt-head {
  color: red;
  font-size: 25px;
  -webkit-text-stroke: 0.5px;
}

.txt-category {
  font-size: 15px;
  color: rgb(116, 113, 113);
  -webkit-text-stroke: 0.5px;
}

.txt-price {
  font-size: 18px;
  padding-top: 20px;
  color: #706a6a;
  -webkit-text-stroke: 0.5px;
}

.btn-cart {
  border-radius: 10px;
  /* background: rgb(255, 174, 0); */
  border: none;
  width: 40%;
}

.btn-description {
  border-radius: 10px;
  width: 80%;
  background: red;
  font-family: "Kanit", sans-serif;
}

.p-dropdown {
  border-radius: 50px !important;
}

.card-background {
  background: #fff1f1;
  width: 100%;
  height: 450px;
  padding: 15px;
}

.img-modal-product {
  width: 100%;
  display: block;
  justify-content: center;
}


.img-modal-product-preview {
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.size-img-product {
  width: 100%;
  height: 180px;
}

.img-product {
  width: 80%;
  height: 80%;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.responsive-dropdown{
  width: 14rem;
}


@media only screen and (max-width: 1440px) {
  .card-background {
  height: 475px;
}
}

@media only screen and (max-width: 576px) {
  .card-background {
  height: 370px;
}
  .txt-head {
    font-size: 15px;
  }

  .txt-category {
    font-size: 12px;
  }

  .txt-price {
    font-size: 15px;
  }

  .btn-cart {
    width: 50%;
  }

  .btn-description {
    font-size: 12px;
  }

  .img-modal-product {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .size-img-product {
    width: 100%;
    height: 150px;
  }

  .img-modal-product-preview {
    width: 100%;
  }
}

@media only screen and (max-width: 380px) {
  .btn-description {
    padding: 5px;
  }
}
</style>