<template>
  <div>
    <Button label="เพิ่มหมวดหมู่สินค้า" icon="pi pi-plus" @click="(displayAdd = true), (category = '')" />

    <Dialog header="เพิ่มหมวดหมู่สินค้า" v-model:visible="displayAdd" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '35vw' }" :modal="true">
      <span class="p-float-label m-0 mt-5">
        <InputText id="category" type="text" v-model="category" class="w-full" />
        <label for="category">หมวดหมู่สินค้า</label>
      </span>
      <template #footer>
        <Button label="ยกเลิก" icon="pi pi-times" @click="displayAdd = false" class="p-button-text" />
        <Button label="บันทึก" icon="pi pi-check" @click="addCategory" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  props: {
    categorys: Array,
  },
  setup(props) {
    const category = ref("");
    const displayAdd = ref(false);
    const categorys = ref([]);
    const fetchProps = () => {
      categorys.value = props.categorys;
    };

    const addCategory = async () => {
      if (category.value !== "") {
        try {
          await postCategory();
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่สินค้า:", error);
        }
      }
    };

    const postCategory = async () => {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_DEKRUP}/product/category/create`,
          {
            name: category.value,
          },
          {
            headers: {
              "token": localStorage.getItem("token"),
            },
          }
        );

        if (response.data && response.data.status === true) {
          categorys.value.push(response.data.data);
          displayAdd.value = false;
          location.reload();
        } else {
          console.error("API คืนข้อมูลที่ไม่ถูกต้อง:", response.data);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
      }
    };

    return { displayAdd, fetchProps, addCategory, category };
  },
};
</script>
