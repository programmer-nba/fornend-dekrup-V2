<template>
    <div class="mt-4 ">
        <h1 class="md:m-0 text-center">ค่าบริหาร (Week)</h1>
        <p class="mt-0 text-center"><strong>หมายเหตุ : </strong>ค่าบริหารจากการที่ผู้แนะนำทำการซื้อสินค้า</p>
        <DataTable :value="com_day" :paginator="true" :rows="10" class="px-3 py-3"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate=" แสดง {first} ถึง {last} ของ {totalRecords} รายการ"
            responsiveLayout="scroll">
            <template #empty>ไม่มีข้อมูล</template>
            <Column></Column>
            <Column></Column>
            <Column header="ชื่อผู้ดูแลระบบ">
                <template #body="item">
                    {{ getLastNumber(item.data.data) }}
                </template>
            </Column>
            <Column header="ค่าคอมมิชชั่น">
                <template #body="item">
                    {{ getLastCom(item.data.data) }}
                </template>
            </Column>
            <Column header="หัก vat 3%">
                <template #body="item">
                    {{ getLastVat(item.data.data) }}
                </template>
            </Column>
            <Column header="ค่าคอมมิชชั่นที่ได้รับ">
                <template #body="item">
                    {{ getLastCommission(item.data.data) }}
                </template>
            </Column>
            <Column field="from_member" header="ค่าคอมมิชชั่นการสมัครจาก"></Column>
            <Column field="timestamp" header="วันที่"></Column>
        </DataTable>
    </div>
</template>
  
<script>
import { CommissionMember } from "../../service/commission.member"
export default {
    created() {
        document.title = "Commission Day | Dekrub Shop";
    },
    async mounted() {
        this.$store.commit('setLoading', true);

        await this.GetCommissionWeek();
    },
    setup() {
        const commission_day = new CommissionMember();
        return { commission_day }
    },
    data: () => ({
        com_day: [],
    }),
    methods: {
        async GetCommissionWeek() {
            await this.commission_day.getCommissionWeek().then(result => {
                this.com_day = result.data;
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })
        },
        getLastNumber(item) {
            const data = item[item.length - 1].member_number;
            return data
        },
        getLastCom(item) {
            const data = item[item.length - 1].commission;
            return data
        },
        getLastVat(item) {
            const data = item[item.length - 1].vat3percent;
            return data
        },
        getLastCommission(item) {
            const data = item[item.length - 1].remainding_commission;
            return data
        },
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
  
  