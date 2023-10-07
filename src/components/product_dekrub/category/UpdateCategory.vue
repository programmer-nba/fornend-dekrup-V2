<template>
  <Button icon="pi pi-pencil" class="p-button-rounded p-button-info mr-2" @click="(displayupdate = true), (name = '')" />
  <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="showDeleteConfirmation" />
 
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
import { ref } from "vue";
import Swal from 'sweetalert2';

export default {
  props: {
    cat_id: String,
    category: Object,
    categorys: Array,
  },
  setup(props) {
    const _id = ref();
    const name = ref();

    const displayupdate = ref(false);
    const delCheck = ref(false);

    const showDeleteConfirmation = () => {
  Swal.fire({
    title: "คุณแน่ใจว่าต้องการลบข้อมูล?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ใช่, ฉันต้องการลบ",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#C21010",
    customClass: {
      title: "text-red-600", // เปลี่ยนสี title เป็นสีแดง
    },
  }).then((result) => {
    if (result.isConfirmed) {
      delCategory();
    }
  });
};


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
    Swal.fire({
      icon: "success",
      title: "สำเร็จ",
      text: "แก้ไขข้อมูลนี้แล้ว",
      timer: 1500,
      showConfirmButton: false,   
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
    Swal.fire({
      icon: "success",
      title: "สำเร็จ",
      text: "ลบข้อมูลนี้แล้ว",
      timer: 1500,
      showConfirmButton: false, // ไม่แสดงปุ่ม "ตกลง"
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลบข้อมูล: ", error);
  }
};


    return { delCategory, updateCategor, displayupdate, name ,delCheck, showDeleteConfirmation};
  },
};
</script>



