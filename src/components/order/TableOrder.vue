<template>
  <div class="grid p-fluid px-3 justify-content-center">
    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon border-none" style="background-color: #C21010;">
          <i class="pi pi-search text-white"></i>
        </span>
        <InputText placeholder="ค้นหาข้อมูล"  class="z-0"/>
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
  <DataTable stripedRows responsiveLayout="scroll" :paginator="true" :rows="20"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ" class=" px-3">
    <Column header="เลขที่ใบสั่งชื้อ" style="width: 20%;">
      <template #body="item">
      </template>
    </Column>
    <Column header="ชื่อ" style="width: 20%;">
      <template #body="item">
      </template>
    </Column>
    <Column header="ที่อยู่" style="width: 20%;">
      <template #body="item">
      </template>
    </Column>
    <Column header="สถานะ" style="width: 15%;">
      <template #body="item">
        <Chip :label="item.data.status_now" />
      </template>
    </Column>

    <Column field="timestamp" header="วันที่ทำรายการ" style="width: 15%;">
      <template #body="item">
      </template>
    </Column>
    <Column :exportable="false" style="min-width: 8rem">
      <template #body="item">
        <DialogDetail :order="item.data" />
        <Button v-if="item.data.dealer_id === 'ไม่มี'" icon="pi pi-print" label="พิมพ์ใบส่งสินค้า"
          class="p-button-outlined p-button-sm text-sm text-teal-300" />
        <FormOrderdealer v-else :orderdealer="item.data" />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const orders = ref([]);

    onMounted(async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        const response = await axios.get(`${process.env.VUE_APP_DEKRUP}/order/list`, {
  headers: {
    'auth-token': authToken,
  },
});


        orders.value = response.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
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



