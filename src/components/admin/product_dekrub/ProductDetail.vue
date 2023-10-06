<template>
  <Dialog :visible="displayDialog">
    <div class="p-fluid">
      <h1>แก้ไขสินค้า</h1>

      <div class="p-field">
        <label for="name">ชื่อสินค้า:</label>
        <InputText id="name" v-model="editedProduct.name" />
      </div>

      <div class="p-field">
        <label for="category">หมวดหมู่สินค้า:</label>
        <Dropdown
          id="category"
          v-model="editedProduct.category"
          :options="categoryOptions"
          optionLabel="name"
          optionValue="value"
        />
      </div>
      <div class="p-field">
        <label for="costPrice">ราคาทุน:</label>
        <InputText id="costPrice" v-model="editedProduct.cost" />
      </div>

      <div class="p-field">
        <label for="sellingPrice">ราคาขาย:</label>
        <InputText id="sellingPrice" v-model="editedProduct.price" />
      </div>

      <div class="p-field">
        <label for="stockQuantity">จำนวนสินค้าในสต็อก(ชิ้น):</label>
        <InputText id="stockQuantity" v-model="editedProduct.quantity" />
      </div>

      <div class="p-field">
        <label for="image">รูปสินค้า:</label>
        <div class="col-12">
        <img :src="getImage(editedProduct.picture)" class="product-image" style="width: 200px;"/>
      </div>
      <label for="newImage">เปลี่ยนรูปสินค้า:</label>
  <input type="file" id="newImage" accept="image/*" @change="handleImageChange" />
      </div>

      <div class="p-field mt-3">
        <Button label="บันทึก" @click="saveEditedProduct" />
      </div>

      <div class="p-field mt-2">
        <Button label="ยกเลิก" @click="cancelEdit" class="p-button-secondary" />
      </div>

    </div>
  </Dialog>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: {
    product: Object,
    displayDialog: Boolean,
  },
  setup(props, { emit }) {
    const editedProduct = ref({ ...props.product });
    const categoryOptions = ref([]);

    watch(
      () => props.product,
      (newValue) => {
        editedProduct.value = { ...newValue };
      }
    );

    onMounted(() => {
      fetchCategoryOptions(); 
    });

    const fetchCategoryOptions = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/product/category/list`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        if (response.data && Array.isArray(response.data)) {
          categoryOptions.value = response.data.map((category) => ({
            name: category.name,
            value: category.id,
          }));
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงหมวดหมู่สินค้า:', error);
      }
    };

    const getImage = (picture) => {
      if (typeof picture === 'string') {
        return `https://drive.google.com/uc?export=view&id=${picture}`;
      } else if (Array.isArray(picture) && picture.length > 0) {
        const firstImageId = picture[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    };

    const saveEditedProduct = () => {
      emit('save-edit', editedProduct.value);

      // ซ่อน Dialog
      onHide();
    };

    const cancelEdit = () => {
      onHide();
    };

    const onHide = () => {
      emit('update:displayDialog', false);
    };

    return {
      editedProduct,
      saveEditedProduct,
      onHide,
      cancelEdit,
      categoryOptions,
      getImage,
    };
  },
};
</script>
