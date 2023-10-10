<template>
    <div class="grid">
        <div class="col-12 text-center">
            <h1>Commission Register Week</h1>
            <small><strong>หมายเหตุ : </strong>ค่าคอมมิชชั่น จากการแนะนำผู้สมัคร</small>
        </div>
        <div class="col-12 text-right">
            <Button icon="pi pi-file-export" label="Download" @click="export_data" class="mr-2"></Button>
        </div>
    </div>
    <div class="grid">
        <div class="col-12">
            <DataTable :value="item_commission" :paginator="true" :rows="20">
                <template #empty>
                    <p class="text-center"><em>-- ไม่พบข้อมูล --</em></p>
                </template>
                <Column header="ผู้รับคอมมิชชั่น">
                    <template #body="item">
                        {{ getMemberName(getLastNumber(item.data.data)) }}
                        <br>
                        (รหัสสมาชิก - {{ getLastNumber(item.data.data) }})
                    </template>
                </Column>
                <Column header="ค่าคอมมิชชั่น (ก่อนหักภาษี)">
                    <template #body="item">
                        {{ getLastCom(item.data.data) }}
                    </template>
                </Column>
                <Column header="ภาษี ณ ที่จ่าย 3%">
                    <template #body="item">
                        {{ getLastVat(item.data.data) }}
                    </template>
                </Column>
                <Column header="ค่าคอมมิชชั่น (หลังหักภาษี)">
                    <template #body="item">
                        {{ getLastComnet(item.data.data) }}
                    </template>
                </Column>
                <Column header="ได้รับจาก">
                    <template #body="item">
                        {{ getMemberName(item.data.from_member) }}
                        <br>
                        (รหัสสมาชิก - {{ item.data.from_member }})
                    </template>
                </Column>
                <Column header="วันที่">
                    <template #body="item">
                        {{ datetimeFormat(item.data.timestamp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import CommissionDetail from "./CommissionDetail.vue";
import { Withdraw } from "../../../service/commission.withdraw";
import dayjs from 'dayjs';
import axios from 'axios';
export default {
    components: {
        CommissionDetail,
    },
    setup() {
        const withdrawDay = new Withdraw();
        return { withdrawDay };
    },
    created() {
        document.title = "รายงานการถอน | Commission Day";
    },
    data: () => ({
        item_commission: [],
        dialogCancel: false,
        member: [],
    }),
    async mounted() {
        await this.getComissionDay();
        await this.getMember();
    },

    methods: {
        async getComissionDay() {
            this.$store.commit('setLoading', true);
            await this.withdrawDay.GetComRegisterWeek().then(result => {
                const order = result.data;
                this.item_commission = order.reverse();
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })
        },

        async getMember() {
            await axios.get(`${process.env.VUE_APP_DEKRUP}/member`, {
                headers: {
                    'token': `${localStorage.getItem('token')}`
                }
            }).then((res) => {
                this.member = res.data.data;
            })
        },

        getMemberName(item){
            const member = this.member.find((el) => el.member_number === item);
            if (member) {
                return member.name;
            } else {
                return 'สมาชิกนี้ไม่มีในฐานข้อมูลแล้ว...';
            }
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

        getLastComnet(item) {
            const data = item[item.length - 1].remainding_commission;
            return data
        },

        datetimeFormat(date) {
            return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
        },
    },
}

</script>
