
<template>
  <div class="card flex justify-content-center">
      <!-- <Button label="Show" icon="pi pi-external-link" /> -->
      <Button icon="pi pi-pencil" severity="warning" rounded aria-label="Notification" @click="visible = true" />

      <Dialog v-model:visible="visible" modal header="แก้ไขจำนวนสินค้าที่สั่งซื้อ">
        <InputNumber v-model="value2" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" />

            <template #footer>
                <Button label="ยกเลิก" icon="pi pi-times" @click="visible = false" text />
                <Button label="อัพเดตตระกร้าสินค้า" icon="pi pi-check" @click="visible = false" autofocus />
            </template>
        </Dialog>
  </div>
</template>

<script>
export default {
  data() {
      return {
          visible: false,
          value2: 0,
      };
  },
  setup(){
    const editProductQuantity = (product) => {
      if (product) {
        productMember.value = product;
        addNumberProduct.value = true;
        quantityToOrder.value = product.quantity; // กำหนดจำนวนสินค้าใน Dialog เป็นจำนวนที่มีอยู่ในตาราง
      }
    };

    return {
        editProductQuantity
      }
  },

 

};
</script>