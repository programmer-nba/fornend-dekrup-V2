<template>
    <div class="text-center">
        <h1>Commission Week</h1>
    </div>
    <div class="grid">
        <div class="col-12">
            <DataTable :value="item_commission" :paginator="true" :rows="20">
                <template #empty>
                    <p class="text-center"><em>-- ไม่พบข้อมูล --</em></p>
                </template>
                <Column header="รหัสผู้ใช้">
                    <template #body="item">
                        {{ item.data.member_number }}
                    </template>
                </Column>
                <Column header="จำนวน">
                    <template #body="item">
                        {{ item.data.amount }}
                    </template>
                </Column>
                <Column header="สถานะ">
                    <template #body="item">
                        {{ getLastStatus(item.data.status) }}
                    </template>
                </Column>
                <Column header="วันที่">
                    <template #body="item">
                        {{ item.data.timestamp }}
                    </template>
                </Column>
                <Column header="ตัวเลือก">
                    <template #body="item">
                        <CommissionDetail title="รายละเอียด" :order_id="item.data._id"
                            v-if="getLastStatus(item.data.status) !== 'รอตรวจสอบ'" />
                        <div class="mt-1">
                            <Button class="p-button-success mr-1" icon="pi pi-check"
                                v-if="getLastStatus(item.data.status) === 'รอตรวจสอบ'" @click="confirmOrder(item.data)" />
                            <Button v-if="getLastStatus(item.data.status) === 'รอตรวจสอบ'" class="p-button-danger"
                                icon="pi pi-times" @click="showCancelDialog(item.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- Diglog Cancel-->
        <Dialog header="ยกเลิกรายการ" v-model:visible="dialogCancel" modal :style="{ width: '35vw' }"
            :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
            <template #footer>
                <Button label="ยกเลิก" class="p-button-text" @click="dialogCancel = false" />
                <Button label="ตกลง" @click="cancelOrder()" />
            </template>
        </Dialog>
    </div>
</template>


<script>
import axios from 'axios';
import CommissionDetail from "./CommissionDetail.vue";
import { Withdraw } from "../../../service/commission.withdraw";
export default {
    components: {
        CommissionDetail,
    },
    setup() {
        const withdrawWeek = new Withdraw();
        return { withdrawWeek };
    },
    created() {
        document.title = "รายงานการถอน | Commission Week";
    },

    data: () => ({
        item_commission: [],
        dialogCancel: false,
    }),
    async mounted() {
        await this.getWithdrawWeek();
    },

    methods: {
        async getWithdrawWeek() {
            this.$store.commit('setLoading', true);
            await this.withdrawWeek.GetWithdrawWeek().then(result => {
                const order = result.data;
                this.item_commission = order.reverse();
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })
        },

        getLastStatus(item) {
            const data = item[item.length - 1].status;
            return data
        },

        async confirmOrder(item) {
            const id = item._id;
            if (this.getLastStatus(item.status) !== 'รอตรวจสอบ') {
                await this.getWithdrawWeek();
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'รายการนี้ถูกดำเนินการเรียบร้อยแล้ว', life: 3000 })
                return false
            }
            await this.withdrawWeek.ConfirmOrderWeek(id).then(async (result) => {
                await this.getWithdrawWeek();
                console.log(result);
                this.$toast.add({
                    severity: "success",
                    summary: "สำเร็จ",
                    detail: "ยืนยันการรับออเดอร์สำเร็จ",
                    life: 3000,
                });
            })
        },

        //ยกเลิกออเดอร์
        async showCancelDialog(item) {
            this.item_order = item;
            this.dialogCancel = true;
        },
        async cancelOrder() {
            if (this.getLastStatus(this.item_order.status) !== 'รอตรวจสอบ') {
                await this.getWithdrawWeek();
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'รายการนี้ถูกดำเนินการเรียบร้อยแล้ว', life: 3000 })
                return false
            }
            await this.withdrawWeek.CanccelOrderWeek(this.item_order._id).then(async (result) => {
                await this.getWithdrawWeek();
                console.log(result)
                this.$toast.add({
                    severity: "success",
                    summary: "สำเร็จ",
                    detail: "ยกเลิกรายการสำเร็จ",
                    life: 3000,
                });
                this.dialogCancel = false;
            })
        },
    },
}

</script>
