<!-- <template>
    <div><Button icon="pi pi-trash" severity="danger" rounded aria-label="Favorite" @click="delProductMember"  /></div>
</template>


<script>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";

export default {
    props:{
        product_id: String,
        products:Array,
    },
    setup(props) {

    const _id = ref();
    const toastService = useToast();
        
    const delProductMember = async () => {
      _id.value = props.product_id;
      console.log(_id.value);
      const item = props.products;
      const position = item.findIndex((el) => el._id === _id.value);

      try {
        await axios.delete(`${process.env.VUE_APP_DEKRUP}/product/delete/${_id.value}`, {
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

    return { delProductMember,name};
    },
    
}
</script> -->


<template>
  <div>
    <Button
      icon="pi pi-trash"
      severity="danger"
      rounded
      aria-label="Favorite"
      @click="deleteProduct(product)"
    />
  </div>
</template>

<script>
export default {
  setup() {
    const deleteProduct = (product) => {
      // ตรวจสอบว่าคุณต้องการลบสินค้านี้หรือไม่โดยใช้การยืนยันจากผู้ใช้
      const confirmDelete = window.confirm(
        `คุณต้องการลบ ${product.name} ใช่หรือไม่?`
      );

      if (confirmDelete) {
        // ดำเนินการลบสินค้า
        const index = item_product.value.findIndex(
          (item) => item._id === product._id
        );
        if (index !== -1) {
          item_product.value.splice(index, 1); // ลบสินค้าออกจากตารางหรืออาร์เรย์
        }

        // อาจต้องทำการส่งคำขอ API เพื่อลบข้อมูลจากเซิร์ฟเวอร์ด้วย
        // ในกรณีนี้คุณอาจเรียกใช้ API ที่มีการลบข้อมูลสินค้าจากฐานข้อมูล
        // และอัปเดตตารางหรืออาร์เรย์ของสินค้าหลังจากลบบนเซิร์ฟเวอร์สำเร็จ
      }
    };

    return {
      deleteProduct,
    };
  },
};
</script>
