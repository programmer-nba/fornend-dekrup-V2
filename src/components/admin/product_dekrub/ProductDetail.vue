<template>
  <Button icon="pi pi-pencil" class="p-button-rounded p-button-info mr-2" @click="(displayupdate = true)" />

  <Dialog header="แก้ไขสินค้า" v-model:visible="displayupdate" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '35vw' }" :modal="true" class="p-fluid">
    <label for="name">ชื่อสินค้า</label>
    <span class="p-float-label m-0 ">
      <InputText id="name" type="text" v-model="name" class="w-full" />
    </span>

    <label for="detail">รายละเอียดสินค้า</label>
    <span class="p-float-label m-0 ">
      <Textarea id="detail" type="text" v-model="detail" class="w-full" />
    </span>

    <label for="price">ราคาขาย</label>
    <span class="p-float-label m-0 ">
      <InputText id="price" type="text" v-model="price" class="w-full" />
    </span>

    <label for="cost">ราคาทุน</label>
    <span class="p-float-label m-0 ">
      <InputText id="cost" type="text" v-model="cost" class="w-full" />
    </span>

    <label for="quantity">จำนวนคงเหลือ</label>
    <span class="p-float-label m-0 ">
      <InputText id="quantity" type="text" v-model="quantity" class="w-full" />
    </span>

    <label for="category">หมวดหมู่</label>
    <span class="p-float-label m-0">
      <Dropdown id="category" optionLabel="name" class="w-full" v-model="selectedCategory" :options="categories"
        optionValue="_id" />
    </span>

    <label for="picture">รูปภาพ</label>
    <span class="p-float-label m-0 ">
      <input type="file" id="picture" @change="handleImageChange" class="w-full" />
    </span>
    
    <img
  v-if="displayupdate && imagePreview"
  :src="imagePreview"
  alt="รูปภาพ"
  style="width: 120px;"
/>
    <img v-else-if="displayupdate && imgCollection.length > 0" :src="URL.createObjectURL(imgCollection[0])" alt="รูปภาพ"
      style="width: 120px;" />

    <template #footer>
      <Button label="ยกเลิก" icon="pi pi-times" @click="displayupdate = false" class="p-button-text" />
      <Button label="บันทึก" icon="pi pi-check" @click="updateProduct" />
    </template>
  </Dialog>
</template>


<script>
import axios from "axios";
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from "vue";

export default {
  props: {
    cat_id: String,
    product: Object,
    item_product: Array,
  },
  setup(props, { emit }) {
    const _id = ref(props.cat_id);
    const name = ref(props.product.name);
    const detail = ref(props.product.detail);
    const price = ref(props.product.price);
    const cost = ref(props.product.cost);
    const quantity = ref(props.product.quantity);
    const picture = ref(null);
    const imagePreview = ref(props.product.picture);
    const imgCollection = ref([]); // เพิ่มตรงนี้
    const categories = ref([]);
    const displayupdate = ref(false);
    const selectedCategory = ref(props.product.category);

    const selectedCategoryName = computed(() => {
      const foundCategory = categories.value.find(category => category._id === selectedCategory.value);
      return foundCategory ? foundCategory.name : '';
    });

    // เพิ่ม default value สำหรับ selectedCategoryName
    if (typeof selectedCategoryName.value !== 'string') {
      selectedCategoryName.value = '';
    }


    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_DEKRUP}/product/category/list`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        categories.value = response.data.data.map((category) => ({
          ...category,
        }));
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    const updateProduct = async () => {
      try {
        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("detail", detail.value);
        formData.append("price", price.value);
        formData.append("cost", cost.value);
        formData.append("quantity", quantity.value);
        formData.append("category", selectedCategory.value);

        // เพิ่มรูปภาพใน imgCollection เข้าไปใน formData
        if (imgCollection.value.length > 0) {
          imgCollection.value.forEach((img, index) => {
            formData.append(`imgCollection[${index}]`, img);
          });
        }
        await axios.put(
          `${process.env.VUE_APP_DEKRUP}/product/update/${_id.value}`,
          formData,
          {
            headers: {
              "token": localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        selectedCategory.value = props.product.category;

        // อัพเดท imagePreview เมื่อมีรูปใหม่
        if (imgCollection.value.length > 0) {
          imagePreview.value = URL.createObjectURL(imgCollection.value[0]);
        }

        // แสดง SweetAlert2 เมื่อบันทึกสำเร็จ
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'แก้ไขข้อมูลสินค้าสำเร็จ',
        });

        displayupdate.value = false;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแก้ไขสินค้า: ", error);
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

    
    const handleImageChange = (event) => {
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeInBytes = file.size;
        const maxSizeInBytes = 1000000; // 1 MB
        const allowedFileTypes = ['image/jpeg', 'image/png']; // ยอมรับไฟล์ JPEG และ PNG

        if (!allowedFileTypes.includes(file.type)) {
          Swal.fire('แจ้งเตือน', 'รูปภาพต้องเป็นไฟล์ประเภท JPEG หรือ PNG เท่านั้น', 'warning');
          return;
        }

        if (fileSizeInBytes > maxSizeInBytes) {
          Swal.fire('แจ้งเตือน', 'ขนาดของรูปภาพใหญ่เกินกำหนด (มากกว่า 1 MB)', 'warning');
          return;
        }

        imgCollection.value.push(file); // เพิ่มรูปภาพเข้า imgCollection

        // กำหนดค่า index ตรงนี้
        const index = imgCollection.value.length - 1;

        imagePreview.value = URL.createObjectURL(file); // สร้าง URL สำหรับการแสดงตัวอย่างรูปภาพ
      }
    };




    onMounted(async () => {
      await fetchCategory();

      if (!props.product) {
        console.error('props.product is undefined or null');
        return;
      }

      selectedCategory.value = props.product.category;
      imagePreview.value = getImage(props.product.picture);
    });


    return {
      updateProduct,
      displayupdate,
      name,
      detail,
      price,
      cost,
      quantity,
      selectedCategory,
      selectedCategoryName,
      imagePreview,
      categories,
      picture,
      handleImageChange
    };
  },
};
</script>

<style >
/* กำหนด z-index สำหรับ Dialog */
.p-dialog {
  z-index: 9997;
  /* ให้ค่าน้อยกว่า SweetAlert2 */
}

/* กำหนด z-index สำหรับ SweetAlert2 */
.swal2-container {
  z-index: 9999;
}
</style>


