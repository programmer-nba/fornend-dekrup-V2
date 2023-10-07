<template>
  <div>
    <Button label="เพิ่มหมวดหมู่สินค้า" class="border-none"  icon="pi pi-plus" @click="showAddCategoryAlert" style="background-color: #F31559;" />

  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  props: {
    categorys: Array,
  },
  setup(props) {
    const category = ref("");
    const categorys = ref([]);

    const fetchProps = () => {
      categorys.value = props.categorys;
    };

    const showAddCategoryAlert = () => {
  Swal.fire({
    title: "เพิ่มหมวดหมู่สินค้า",
    input: "text",
    inputPlaceholder: "กรอกชื่อหมวดหมู่สินค้า",
    showCancelButton: true,
    confirmButtonText: "บันทึก",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#C21010",
    customClass: {
      title: "text-red-600", // เปลี่ยนสี title เป็นสีแดง
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      category.value = result.value;
      addCategory();
    }
  });
};


const addCategory = async () => {
  if (category.value !== "") {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_DEKRUP}/product/category/create`,
        {
          name: category.value,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (response.data && response.data.status === true) {
        // เพิ่มข้อมูลใหม่ลงใน categorys ทันที
        categorys.value.push(response.data.data);
        Swal.fire({
          icon: "success",
          title: "เพิ่มหมวดหมู่สินค้าสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // รีโหลดหน้าเว็บใหม่
          window.location.reload();
        });
      } else {
        console.error("API คืนข้อมูลที่ไม่ถูกต้อง:", response.data);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
    }
  }
};




    return { fetchProps, showAddCategoryAlert };
  },
};
</script>
