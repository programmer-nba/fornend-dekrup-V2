<template>
  <div class="card-oder border-red-500 border-2 mt-8">
    <div class="top">
      <div
        class="title flex align-items-center justify-content-center h-3rem w-full"
      >
        ตระกร้าของฉัน
      </div>
    </div>
    <div class="grid py-2 px-2">
      <div class="col-6">
        <div
          class="flex flex-column align-items-center justify-content-center h-7rem text-900 border-round m-2"
          style="background-color: #ffae35; font-size: 20px"
        >
          <label style="font-size: 20px">สินค้า/รายการ</label>
          <div style="font-size: 20px">{{ orders.length }}</div>
        </div>
      </div>
      <div class="col-6">
        <div
          class="flex flex-column align-items-center justify-content-center h-7rem font-bold text-white border-round m-2"
          style="background-color: #da2121"
        >
          <label style="font-size: 18px">ยอดเงินที่ต้องชำระ</label>
          <label style="font-size: 20px">{{ calculateTotal() }} บาท</label>
          <label style="font-size: 14px">กดเพื่อชำระเงิน</label>
        </div>
      </div>
    </div>
    <div class="grid px-2">
      <div class="col-12">
        <DataTable :value="orders">
          <Column header="รายการ">
            <template #body="slotProps">
              {{ slotProps.data.product.name }}
            </template>
          </Column>
          <Column header="ราคา">
            <template #body="slotProps">
              {{ slotProps.data.product.price }}
            </template>
          </Column>
          <Column header="จำนวนสั่งซื้อ">
            <template #body="slotProps">
              {{ slotProps.data.quantity }}
            </template>
          </Column>
          <Column header="ราคารวม">
            <template #body="slotProps">
              {{ slotProps.data.product.price * slotProps.data.quantity }}
            </template>
          </Column>
          
        </DataTable>
  
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const orders = ref(store.state.orders); 

    const calculateTotal = () => {
      let total = 0;
      for (const order of orders.value) {
        total += order.product.price * order.quantity;
      }
      return total.toFixed(2);
    };

    return {
      orders,
      calculateTotal,
    };
  },
};
</script>

<style scoped>
.card-oder {
  border-radius: 16px;
  max-width: 100%;
  /* ขยาย card ให้เต็มขนาดของ container */
  margin: 0 auto;
  /* จัดตำแหน่งกลาง */
}

.top {
  background: rgba(212, 21, 21, 0.63);
  border-radius: 16px;
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.top .title {
  color: #fff;
  font-weight: bolder;
}
</style>

<style>
.p-datatable .p-datatable-thead > tr > th {
  background-color: #d9d9d9 !important;
  color: #292d32;
}

.p-datatable .p-datatable-tbody > tr > td {
  margin-bottom: 1.5rem;
}

.p-datatable .p-datatable-footer {
  background-color: #ffe6f7 !important;
  border: none;
}
</style>
