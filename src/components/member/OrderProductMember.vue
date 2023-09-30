<template >
    <div class=" card-oder border-red-500 border-2 mt-8" >

        <div class="top">
            <div class="title flex align-items-center justify-content-center h-3rem w-full">
ตระกร้าของฉัน
            </div>
        </div>
        <div class="grid py-2 px-2 ">
            <div class="col-6">
                <div class=" flex flex-column align-items-center justify-content-center h-7rem  text-900 border-round m-2"
                    style="background-color: #FFAE35; font-size: 20px;">
                    <label style="font-size: 20px;">สินค้า/รายการ</label>
                    <div style="font-size: 20px;">xxx รายการ</div>
                </div>

            </div>
            <div class="col-6">
                <div class="flex flex-column align-items-center justify-content-center h-7rem font-bold text-white border-round m-2"
                    style="background-color: #DA2121;">
                    <label style="font-size: 18px;">ยอดเงินที่ต้องชำระ</label>
                    <label style="font-size: 20px;">xxx บาท</label>
                    <label style="font-size: 14px;">กดเพื่อชำระเงิน</label>

                </div>
            </div>

        </div>
        <div class="grid px-2">
            <div class="col-12">
                <DataTable :rows="5" :paginator="true">
                    <template #empty>
                        <p class="p-0 m-0 text-center"><em>-- ไม่มีรายการ --</em></p>
                    </template>
                    <Column header="รายการ" style=" ">
                        <template>
                            <p class="p-0 m-0"></p>
                        </template>
                    </Column>
                    <Column header="หน่วย" style="width: 25%; ">
                        <template>
                        </template>
                    </Column>
                    <Column header="จำนวน" style="width: 25%; ">
                        <template>
                            <p class="p-0 m-0"> 1 </p>
                        </template>
                    </Column>
                    <Column header="ราคา" style="width: 15%; ">
                        <template>
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";


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
.p-datatable .p-datatable-thead>tr>th {
    background-color: #D9D9D9 !important;
    color: #292D32;
}

.p-datatable .p-datatable-tbody>tr>td {
    margin-bottom: 1.5rem;
}

.p-datatable .p-datatable-footer {
    background-color: #FFE6F7 !important;
    border: none;
}
</style>