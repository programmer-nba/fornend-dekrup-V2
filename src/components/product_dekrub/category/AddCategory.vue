<template>
  <div class="mt-3">
    <Button
      label="เพิ่มหมวดหมู่สินค้า"
      style="background-color: #C21010;"
      icon="pi pi-plus"
      class="border-none"
      @click="(displayAdd = true), (category = '')"
    />

    <Dialog
      header="เพิ่มหมวดหมู่สินค้า"
      v-model:visible="displayAdd"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '35vw' }"
      :modal="true"
    >
      <span class="p-float-label m-0 mt-5">
        <InputText
          id="category"
          type="text"
          v-model="category"
          class="w-full"
        />
        <label for="category">หมวดหมู่สินค้า</label>
      </span>
      <template #footer>
        <Button
          label="ยกเลิก"
          icon="pi pi-times"
          @click="displayAdd = false"
          class="p-button-text text-red-600"
        />
        <Button
          label="บันทึก"
          style="background-color: #C21010;"
          icon="pi pi-check"
          class="border-none"
          @click="addCategory"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

export default {
  props: {
    categorys: Array,
  },
  setup(props) {
    const confirm = useConfirm();
    const toast = useToast();
    const category = ref("");
    const displayAdd = ref(false);
    const categorys = ref([]);
    const fetchProps = () => {
      categorys.value = props.categorys;
    };

 

    const addCategory = async () => {
      if (category.value !== "") {
        confirm.require({
          message: "คุณต้องการเพิ่มหมวดหมู่สินค้านี้ ?",
          header: "การยืนยัน",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            postCategory();
          },
        });
      }
    };

    const postCategory = async () => {
      console.log(category.value);
      await axios
        .post(
          `${process.env.VUE_APP_DEKRUP}/product/category/create`,
          {
            name: category.value,
          },
          {
            headers: {
              "token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          categorys.value.push(res.data.data);
          displayAdd.value = false;
          toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "การเพิ่มหมวดหมู่สินค้าสำเร็จ",
            life: 3000,
          });
        })
        .catch((err) => {
          toast.add({
            severity: "warn",
            summary: "เตือน",
            detail: err.response.data.message,
            life: 3000,
          });
        });
    };

    return { displayAdd, fetchProps, addCategory, category };
  },
};
</script>


<style >

.dialog-change .p-dialog-content {
    background: #FFFDE3;
}

.dialog-change .p-dialog-header {
    background-color: #FFFDE3;
    color: #C21010;
    /* เปลี่ยนสีตัวหนังสือที่นี่ */
    padding: 0.7rem;
    /* สีเส้นขอบล่าง */
}
.dialog-change .p-dialog-footer {
    background-color: #FFFDE3;
    color: #C21010;
    /* เปลี่ยนสีตัวหนังสือที่นี่ */
    padding: 0.7rem;
    /* สีเส้นขอบล่าง */
}</style>
