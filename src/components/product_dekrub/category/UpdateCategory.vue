<template>
  <Button icon="pi pi-pencil" class="p-button-rounded p-button-info mr-2" @click="(displayupdate = true), (name = '')" />
  <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="delCategory" />
  <Dialog header="แก้ไขหมวดหมู่สินค้า" v-model:visible="displayupdate" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '35vw' }" :modal="true">
    <span class="p-float-label m-0 mt-5">
      <InputText id="category" type="text" v-model="name" class="w-full" />
      <label for="category">{{ category.name }}</label>
    </span>
    <template #footer>
      <Button label="ยกเลิก" icon="pi pi-times" @click="displayupdate = false" class="p-button-text" />
      <Button label="บันทึก" icon="pi pi-check" @click="updateCategor" autofocus />
    </template>
  </Dialog>
</template>

<script>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

export default {
  props: {
    cat_id: String,
    category: Object,
    categorys: Array,
  },
  setup(props) {
    const toastService = useToast();
    const toastServiceRef = ref(toastService);

    const _id = ref();
    const name = ref();

    const displayupdate = ref(false);


    const updateCategor = async () => {
      _id.value = props.cat_id;
      const category = props.category;

      try {
        await axios.put(
          `${process.env.VUE_APP_DEKRUP}/product/category/update/${_id.value}`,
          { name: name.value },
          {
            headers: {
              "token": localStorage.getItem("token"),
            },
          }
        );

        category.name = name.value;
        toastService.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "แก้ไขข้อมูลนี้แล้ว",
          life: 3000,
        });

        displayupdate.value = false;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล: ", error);
      }
    };


    const delCategory = async () => {
      _id.value = props.cat_id;
      console.log(_id.value);
      const item = props.categorys;
      const position = item.findIndex((el) => el._id === _id.value);

      try {
        await axios.delete(`${process.env.VUE_APP_DEKRUP}/product/category/delete/${_id.value}`, {
          headers: {
            "token": localStorage.getItem("token"),
          },
        });

        item.splice(position, 1);
        toastService.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "ลบข้อมูลนี้แล้ว",
          life: 3000,
        });
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบข้อมูล: ", error);
      }
    };

    return { delCategory, updateCategor, displayupdate, name };
  },
};
</script>


<style lang="scss" scoped></style>
