<template>
  <div class="mt-4 ">
    <h1 class="md:m-0 text-center">จัดการข้อมูลผู้ดูแลระบบ</h1>
    <div class="grid p-fluid px-3 justify-content-center mt-3">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup  flex-1 ">
          <Button icon="pi pi-search" severity="warning" />
          <InputText v-model="search" placeholder="ค้นหาข้อมูล" @keyup="searchData()" class=" font p-3 " />
        </div>
      </div>
    </div>
    <!-- <DataTable :value="admin" :paginator="true" :rows="10" class="px-3 py-3"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate=" แสดง {first} ถึง {last} ของ {totalRecords} รายการ"
      responsiveLayout="scroll">
      <template #empty>ไม่มีข้อมูล</template>
      <Column field="admin_name" header="ชื่อผู้ดูแลระบบ"></Column>
      <Column field="admin_username" header="ชื่อผู้ใช้งานระบบ"></Column>
      <Column field="admin_position" header="ตำแหน่ง"></Column>
      <Column field="admin_date_start" header="วันที่เริ่มระบบ">
        <template #body="Props">
          {{ dateformat(Props.data.admin_date_start) }}
        </template>
      </Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="Props">
          <Button icon="pi pi-list" class="p-button-outlined" @click="openD(Props.data)" />&nbsp;
          <Button icon="pi pi-trash" class="p-button-outlined p-button-danger" @click="del(Props.data)" />
        </template>
      </Column>
    </DataTable> -->
    <!-- <Dialog :style="{ width: '900px' }" header="รายละเอียดข้อมูลผู้ดูแลระบบ" :modal="true" class="p-fluid mb-5">
      <div class="grid">
        <div class="col-12">
          <Panel>
            <template #header>ข้อมูลผู้ดูแลระบบ</template>
            <div class="grid">
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*ชื่อ-นามสกุล :</label>
                  <InputText v-model="admin_detail.admin_name" class="w-full font" type="text"
                    placeholder="กรอกชื่อ-นามสกุลของผู้ดูแลระบบ" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*ตำแหน่ง :</label><br />
                  <Dropdown v-model="admin_detail.admin_position" :options="position" optionLabel="name"
                    optionValue="value" placeholder="เลือกตำแหน่ง" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>*ชื่อผู้ใช้งาน :</label>
                  <InputText v-model="admin_detail.admin_username" class="w-full font" type="text"
                    placeholder="ผู้ใช้งาน" />
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="field">
                  <label>รีเซตรหัส :</label>
                  <Button label="รีเซตรหัส" @click="resetPassword()" class="mr-2" />
                </div>
              </div>
            </div>
            <div class="col-12 md:col-2">
              <div class="field">
                <Button label="อัพเดต" @click="openC()" class="mr-2" />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </Dialog> -->
    <Dialog :style="{ width: '450px' }" header="แก้ไขข้อมูล" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span> คูณต้องการแก้ไขข้อมูลผู้ดูแลระบบนี้ ?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="closeD" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="update" :loading="isloading" />
      </template>
    </Dialog>
    <Dialog :style="{ width: '450px' }" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="delete_name">
          คุณต้องการลบผู้ดูแลระบบ <b>{{ delete_name }} </b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="closeD" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deletedata" :loading="isloading" />
      </template>
    </Dialog>
  </div>
</template>
<script>
export default {
  
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

