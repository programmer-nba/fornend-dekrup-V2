<template>
  <Button
    icon="pi pi-pencil"
    class="p-button-rounded p-button-info mr-2"
    @click="(displayupdate = true), (name = '')"
  />
  <Button
    icon="pi pi-trash"
    class="p-button-rounded p-button-danger"
    @click="delCategory"
  />
  <Dialog
    header="แก้ไขหมวดหมู่สินค้า"
    v-model:visible="displayupdate"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '35vw' }"
    :modal="true"
  >
    <span class="p-float-label m-0 mt-5">
      <InputText id="category" type="text" v-model="name" class="w-full" />
      <label for="category">{{ category.name }}</label>
    </span>
    <template #footer>
      <Button
        label="ยกเลิก"
        icon="pi pi-times"
        @click="displayupdate = false"
        class="p-button-text"
      />
      <Button
        label="บันทึก"
        icon="pi pi-check"
        @click="startEdit"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

export default {
  props: {
    cat_id: String,
    category: Object,
    categorys: Array,
  },
  setup(props) {
    const confirm = useConfirm();
    const toast = useToast();

    const _id = ref(props.cat_id);
    const name = ref(props.category.name);

    const displayupdate = ref(false);

    const startEdit = () => {
      displayupdate.value = true;
    };

    const updateCategory = () => {
      confirm.require({
        message: "คุณต้องการแก้ไขหมวดหมู่นี้?",
        header: "ยืนยันการแก้ไข",
        icon: "pi pi-info-circle",
        accept: async () => {
          try {
            const response = await axios.put(
              `${process.env.VUE_APP_DEKRUP}/product/category/update/${_id.value}`,
              { name: name.value },
              {
                headers: {
                  "token": localStorage.getItem("token"),
                },
              }
            );

            if (response.status === 200) {
              props.category.name = name.value;
              toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "แก้ไขหมวดหมู่แล้ว",
                life: 3000,
              });
              displayupdate.value = false;
            } else {
              // กรณีที่เกิดข้อผิดพลาดในการแก้ไข
              toast.add({
                severity: "error",
                summary: "เกิดข้อผิดพลาด",
                detail: "ไม่สามารถแก้ไขหมวดหมู่ได้",
                life: 3000,
              });
            }
          } catch (error) {
            console.error("เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่: ", error);
          }
        },
      });
    };

    const delCategory = async () => {
      confirm.require({
        message: "คุณต้องการลบหมวดหมู่นี้?",
        header: "ยืนยันการลบ",
        icon: "pi pi-info-circle",
        accept: async () => {
          try {
            const response = await axios.delete(
              `${process.env.VUE_APP_DEKRUP}/product/category/delete/${_id.value}`,
              {
                headers: {
                  "token": localStorage.getItem("token"),
                },
              }
            );
            if (response.status === 200) {
              const updatedCategories = props.categorys.filter(category => category._id !== _id.value);

              emit("update:categorys", updatedCategories);

              toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ลบหมวดหมู่แล้ว",
                life: 3000,
              });

              displayupdate.value = false;
            } else {
              // กรณีที่เกิดข้อผิดพลาดในการลบ
              toast.add({
                severity: "error",
                summary: "เกิดข้อผิดพลาด",
                detail: "ไม่สามารถลบหมวดหมู่ได้",
                life: 3000,
              });
            }
          } catch (error) {
            console.error("เกิดข้อผิดพลาดในการลบหมวดหมู่: ", error);
          }
        },
      });
    };

    // ส่วนอื่น ๆ อยู่ตรงนี้

    return { delCategory, startEdit, updateCategory, displayupdate, name };
  },
};

</script>

<style lang="scss" scoped></style>
