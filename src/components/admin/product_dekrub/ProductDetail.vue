<template>


  <Dialog :visible="displayDialog" >
    <div class="p-fluid">
      <h1>แก้ไขสินค้า</h1>

      <!-- แสดงรายละเอียดสินค้า -->
      <div class="p-field">
        <label for="name">ชื่อสินค้า:</label>
        <InputText id="name" v-model="editedProduct.name" />
      </div>
      <!-- เพิ่มฟิลด์อื่น ๆ ตามที่คุณต้องการแก้ไข -->

      <!-- ปุ่มบันทึก -->
      <div class="p-field">
        <Button label="บันทึก" @click="saveEditedProduct" />
      </div>
      <!-- ปุ่มยกเลิก -->
<div class="p-field">
  <Button label="ยกเลิก" @click="cancelEdit" class="p-button-secondary" />
</div>

    </div>
  </Dialog>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    product: Object, 
    displayDialog: Boolean, 
  },
  setup(props, { emit }) {
    const editedProduct = ref({}); 

    watch(
      () => props.product,
      (newValue) => {
        editedProduct.value = { ...newValue };
      }
    );

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
};
  },
};
</script>

<style scoped>
/* รูปแบบสไตล์ของ Dialog แก้ไขสินค้า */
</style>
