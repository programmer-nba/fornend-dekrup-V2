<template>
  <div class="grid p-fluid px-3 justify-content-center">
    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon border-none" style="background-color: #C21010;">
          <i class="pi pi-search text-white"></i>
        </span>
        <InputText placeholder="ค้นหาข้อมูล" class="z-0" />
      </div>
    </div>
    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon border-none" style="background-color: #C21010;">
          <i class="pi pi-calendar text-white"></i>
        </span>
        <Calendar inputId="range" class="z-0" selectionMode="range" :manualInput="false" :showButtonBar="true" />
      </div>
    </div>
    <div class="col-12 md:col-1">
      <Button label="Clear" class="border-red-500" icon="pi pi-refresh" style="background-color: #C21010;"></Button>
    </div>
  </div>
  <DataTable :value="orders" stripedRows responsiveLayout="scroll" :paginator="true" :rows="20"
  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
  currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ" class=" px-3">
  <!-- ตรวจสอบว่ามีข้อมูลใบสั่งชื้อหรือไม่ -->
  <template #empty>
    <p class="font-italic text-center text-5xl" style="color: #BD1616;">ไม่พบข้อมูลใบสั่งชื้อ</p>
  </template>

  <Column header="เลขที่ใบสั่งชื้อ" style="width: 15%;">
    <template #body="item">
      {{ item.data.receiptnumber }}
    </template>
  </Column>
  <Column header="ชื่อ" style="width: 15%;">
    <template #body="item">
      {{ item.data.customer_name }}
    </template>
  </Column>
  <Column header="ที่อยู่" style="width: 25%;">
    <template #body="item">
      {{ item.data.customer_address }}
    </template>
  </Column>
  <Column header="สถานะ" style="width: 12%;">
    <template #body="item">
      <Chip :label="item.data.status[0].status" />
    </template>
  </Column>
  <Column field="timestamp" header="วันที่ทำรายการ" style="width: 15%;">
    <template #body="item">
      {{ new Date(item.data.timestamp).toLocaleString() }}
    </template>
  </Column>
  <Column :exportable="false" style="min-width: 8rem">
        <template #body="item">
          <DialogDetail :order="item.data" :shops="shops"  />
          <Button
            icon="pi pi-print"
            label="พิมพ์ใบส่งสินค้า"
            class="p-button-outlined p-button-sm text-sm text-teal-300"
            @click="openformorder(item.data.ponba_id)"
          />
          <FormOrderdealer
           
          />
        </template>
      </Column>
</DataTable>

</template>

<script>
import DialogDetail from "@/components/admin/order/DialogDetail.vue";
import axios from 'axios';

import { onMounted, ref } from 'vue';

export default {
  setup() {
    const orders = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/order/list`, {
          headers: {
            "token": localStorage.getItem("token"),
          },
        });

        orders.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      orders,
    };
  },
};
</script>








<style>
.p-datatable .p-datatable-thead>tr>th {
  background-color: #FFFDE3 !important;
  color: #C21010;
  border-bottom: 1px solid #CFE8A9;
}

.p-datatable .p-datatable-tbody>tr>td {
  margin-bottom: 1.5rem;
}

.p-datatable .p-datatable-footer {
  background-color: #FFE6F7 !important;
  border: none;
}

.p-paginator {
  padding: 0;
  margin-top: 1.5rem;
  border-radius: 40px;
}
</style>



