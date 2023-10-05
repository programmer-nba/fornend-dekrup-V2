<template>
  <h1 class="px-3" style="color: #fe0000">สั่งซื้อสินค้า</h1>
  <div class="grid">
    <div class="md:col-6 col-12 mt-2">
      <div class="field">
        <div class="p-inputgroup">
          <span class="p-float-label">
            <InputText
              v-model="search"
              class="w-4rem font border-red-700 input-search-sercice border-round-3xl text-red-800"
              style="background-color: #ffe5e5"
              @keyup="searchData()"
              @keydown.delete.prevent="deleteLastCharacter"
            />
            <label class="text-red-800 px-3">ค้นหา</label>
          </span>
        </div>
      </div>
    </div>
    <div class="md:col-6 col-12 mt-2">
      <div class="field">
        <div class="card flex justify-content-start">
          <Dropdown
            v-model="selectedCategory"
            :options="categories"
            optionLabel="name"
            placeholder="Select a Category"
            class="w-full md:w-14rem"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="grid">
    <div
      class="col-6 md:col-4 xl:col-3 "
      v-for="product in item_product"
      :key="product.id"
    >
      <div class="card-background">
        <div class="size-img-product"><img
          :src="getImage(product.picture)"
          class="img-modal-product-preview img-product"
        /></div>
        
        <strong class="txt-head">{{ product.name }}</strong>
        <p class="txt-category">
          หมวดหมู่ <span>{{ product.category }}</span>
        </p>
        <p class="txt-category">
          จำนวน <span>{{ product.quantity }}</span>
        </p>
        <p class="txt-price">
          ราคา <span>{{ product.price }}</span> บาท
        </p>
        <div class="flex">
          <Button
            severity="warning"
            icon="pi pi-shopping-cart"
            style="margin-right: 5px"
            @click="chooseProductQuantity(product)"
          />
          <Button
            @click="choose(product)"
            class="btn-description"
            label="รายละเอียด"
            severity="danger"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog จำนวนสั่งซื้อ -->
  <Dialog
    v-model:visible="addNumberProduct"
    modal
    header="จำนวนสั่งซื้อ"
  >
    <InputNumber
      v-model="quantityToOrder"
      inputId="minmax-buttons"
      mode="decimal"
      showButtons
      :min="0"
    />
    <template #footer>
      <Button label="สั่งซื้อ" icon="pi pi-shopping-cart" @click="addToOrder" />
      <Button
        label="ปิด"
        icon="pi pi-times"
        @click="addNumberProduct = false"
        text
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="dialogChooseProduct"
    :modal="true"
    header="สินค้าของเรา"
    style="width: 100vh"
  >
    <div class="grid">
      <div class="md:col-4 col-12">
        <Image alt="Image" preview>
          <template #indicatoricon>
            <i class="pi pi-eye"></i>
          </template>
          <template #image>
            <img
              :src="getImage(productMember.picture)"
              class="img-modal-product"
              alt="image"
            />
          </template>
          <template #preview="slotProps">
            <img
              :src="getImage(productMember.picture)"
              class="img-modal-product-preview"
              alt="preview"
              :style="slotProps.style"
              @click="slotProps.onClick"
            />
          </template>
        </Image>
      </div>
    </div>
    <div class="card-head">
      <p class="text-red-500 text-xl" style="-webkit-text-stroke: 1px">
        {{ productMember.name }}
      </p>
      <small class="text-600" style="font-size: 14px; -webkit-text-stroke: 1px"
        >หมวดหมู่: {{ productMember.category }}</small
      >
      <br />
      <small class="text-600" style="font-size: 14px; -webkit-text-stroke: 1px"
        >จำนวน {{ productMember.quantity }}</small
      >
    </div>
    <div class="my-2">
      <label
        class="text-700"
        for=""
        style="font-size: 20px; -webkit-text-stroke: 1px"
        >รายละเอียดสินค้า</label
      >
    </div>
    <small class="text-700" for="" style="font-size: 18px">
      {{ productMember.detail }}</small
    >
    <div class="my-2">
      <label
        class="text-red-500"
        for=""
        style="font-size: 24px; -webkit-text-stroke: 1px"
        >ราคา {{ productMember.price }} บาท</label
      >
    </div>
    <template #footer>
      <Button
        label="ปิด"
        icon="pi pi-times"
        @click="dialogChooseProduct = false"
        text
      />
    </template>
  </Dialog>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import Image from "primevue/image";
import axios from "axios";
import { useStore } from "vuex";

export default {
  components: {
    Image,
  },

  setup() {
    const store = useStore();

    const addNumberProduct = ref(false);
    const selectedCategory = ref([]);
    const categories = ref([]);
    const item_product = ref([]);
    const productMember = ref("");
    const dialogChooseProduct = ref(false);
    const selectedQuantity = ref(0); // นิยาม selectedQuantity และกำหนดค่าเริ่มต้นเป็น 0
    const total = ref(0);
    const search = ref("");
    const quantityToOrder = ref(0); // เปลี่ยนชื่อ quantity เป็น quantityToOrder

    const originalItemProduct = ref([]);
    const orders = ref([]); // เพิ่มตัวแปรเพื่อเก็บรายการออเดอร์

    const getCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_DEKRUP}/product/category/list`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        categories.value = response.data.data.reverse();
      } catch (error) {}
    };

    const getCategoryData = async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/category/member/list`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    const categoryData = response.data.data;
    return categoryData;
  } catch (error) {
    console.error(error);
    return [];
  }
};


const getData = async () => {
  try {
    const [productResponse, categoryData] = await Promise.all([
      axios.get(`${process.env.VUE_APP_DEKRUP}/product/member/list`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      getCategoryData(), // เรียกใช้ฟังก์ชัน getCategoryData ที่คุณสร้างขึ้น
    ]);

    const products = productResponse.data.data.map((product) => ({
      ...product,
      category: getCategoryName(product.category, categoryData),
    }));

    item_product.value = products.reverse();
    originalItemProduct.value = [...products];
  } catch (error) {
    console.error(error);
  }
};

// ฟังก์ชันสำหรับแปลงรหัสหมวดหมู่เป็นชื่อหมวดหมู่
const getCategoryName = (categoryId, categories) => {
  const category = categories.find((category) => category._id === categoryId);
  return category ? category.name : "";
};


    const chooseProductQuantity = (product) => {
      if (product) {
        productMember.value = product;
        addNumberProduct.value = true;
        quantityToOrder.value = 0;
      }
    };
    
    const checkStock = (product, quantity) => {
  if (product.quantity >= quantity) {
    return true; // สินค้ามีจำนวนเพียงพอให้เพิ่มลงในตะกร้า
  } else {
    return false; // สินค้ามีจำนวนไม่เพียงพอ
  }
};

// const addToOrder = () => {
//   if (quantityToOrder.value > 0 && productMember.value) {
//     const product = productMember.value;
//     const quantity = quantityToOrder.value;

//     if (checkStock(product, quantity)) {
//       const order = {
//         product: {
//           name: product.name,
//           price: product.price,
//           quantity: product.quantity,
//           category: product.category,
//         },
//         quantity: quantityToOrder.value,
//       };
//       orders.value.push(order);

//       // ลดจำนวนสินค้าในสต๊อก
//       product.quantity -= quantityToOrder.value;

//       productMember.value = "";
//       quantityToOrder.value = 0;
//       addNumberProduct.value = false;
//       store.commit("addToOrder", order);
//       console.log("Orders:", orders.value);
//     } else {
//       alert("ขออภัยจำนวนสินค้าไม่เพียงพอ");
//     }
//   }
// };


const addToOrder = () => {
  if (quantityToOrder.value > 0 && productMember.value) {
    const product = productMember.value;
    const quantity = quantityToOrder.value;

    // ตรวจสอบว่าสินค้าอยู่ในรายการออเดอร์แล้วหรือไม่
    const existingOrder = orders.value.find((order) => {
      return (
        order.product &&
        order.product.name === product.name &&
        order.product.category === product.category
      );
    });

    if (existingOrder) {
      // หากสินค้ามีอยู่ในรายการออเดอร์แล้ว ให้เพิ่มจำนวนสินค้าในรายการเดิม
      if (checkStock(product, quantity)) {
        existingOrder.quantity += quantityToOrder.value;

        // ลดจำนวนสินค้าในสต๊อก
        product.quantity -= quantityToOrder.value;

        productMember.value = "";
        quantityToOrder.value = 0;
        addNumberProduct.value = false;
        console.log("Orders:", orders.value);
      } else {
        alert("ขออภัยจำนวนสินค้าไม่เพียงพอ");
      }
    } else {
      // หากสินค้ายังไม่มีในรายการออเดอร์ ให้สร้างรายการใหม่
      if (checkStock(product, quantity)) {
        const order = {
          product: {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            category: product.category,
          },
          quantity: quantityToOrder.value,
        };
        orders.value.push(order);

        // ลดจำนวนสินค้าในสต๊อก
        product.quantity -= quantityToOrder.value;

        productMember.value = "";
        quantityToOrder.value = 0;
        addNumberProduct.value = false;
        store.commit("addToOrder", order);
        console.log("Orders:", orders.value);
      } else {
        alert("ขออภัยจำนวนสินค้าไม่เพียงพอ");
      }
    }
  }
};

const editProductQuantity = (product) => {
      if (product) {
        productMember.value = product;
        addNumberProduct.value = true;
        quantityToOrder.value = product.quantity; // กำหนดจำนวนสินค้าใน Dialog เป็นจำนวนที่มีอยู่ในตาราง
      }
    };




    

    const choose = (product) => {
      if (product) {
        productMember.value = product;
        dialogChooseProduct.value = true;
      }
    };

    const numberDigitFormat = (number) => {
      return number.toFixed(2);
    };
    const searchData = () => {
      if (search.value !== "") {
        item_product.value = originalItemProduct.value.filter((el) =>
          el.name.toLowerCase().includes(search.value.toLowerCase())
        );
      } else {
        item_product.value = [...originalItemProduct.value];
      }
    };

    const deleteLastCharacter = () => {
      if (search.value.length > 0) {
        search.value = search.value.slice(0, -1);
      }
    };

    const getImage = (item) => {
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    };


    const filteredProducts = computed(() => {
      return search.value
        ? originalItemProduct.value.filter((el) =>
            el.name.toLowerCase().includes(search.value.toLowerCase())
          )
        : [...originalItemProduct.value];
    });

    onMounted(() => {
      getData();
      getCategory();
    });

    return {
      item_product,
      getImage,
      selectedCategory,
      addNumberProduct,
      productMember,
      dialogChooseProduct,
      choose,
      categories,
      total,
      searchData,
      search,
      filteredProducts,
      deleteLastCharacter,
      numberDigitFormat,
      addToOrder,
      selectedQuantity,
      quantityToOrder,
      chooseProductQuantity,
      checkStock,
      editProductQuantity,
      getCategoryData
    };
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
  height: auto;
  padding: 15px;
}

.img-modal-product {
  width: 100%;
}

.img-modal-product {
  width: 50%;
}

.img-modal-product-preview {
  width: 100%;
}
.size-img-product{
  width: 100%;
  height: 200px;
}
.img-product{
  width: 80%;
  height: auto;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 576px) {
  .txt-head {
    font-size: 16px;
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
  .size-img-product{
  width: 100%;
  height: 150px;
}
}

@media only screen and (max-width: 380px) {
  .btn-description {
    padding: 5px;
  }
}
</style>
