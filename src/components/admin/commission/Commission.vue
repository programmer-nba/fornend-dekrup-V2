<template>
    <div class="grid">
        <div class="col-12 text-center">
            <h1>สรุป Commission ณ ที่จ่าย</h1>
        </div>
        <div class="col-3">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon bg-purple-500 text-white">
                    <i class="pi pi-calendar text-xl"></i>
                </span>
                <Calendar inputId="range" icon="pi pi-calendar" selectionMode="range" placeholder="FILTER DATE"
                    class="w-full" v-model="day" @date-select="searchDay" />
            </div>
        </div>
        <!-- <div class="col-2">
            <Dropdown v-model="member_id" :options="item_member" optionLabel="name" optionValue="_id" placeholder="Select Member"
                class="w-full" @change="filtermember()" />
        </div> -->
        <div class="col-1">
            <Button label="Clear All" class="p-button-text p-button-plain" @click="clear"></Button>
        </div>
        <div class="col-3">
            <Button icon="pi pi-file-export" label="Download" @click="exportCSV()" class="mr-2"></Button>
        </div>
    </div>
    <div class="grid">
        <div class="col-12">
            <DataTable :value="item_member" :paginator="true" :rows="20" ref="dt">
                <template #empty>
                    <p class="text-center"><em>-- ไม่พบข้อมูล --</em></p>
                </template>
                <Column header="#">
                    <template #body="item">
                        {{ item.index + 1 }}
                    </template>
                </Column>
                <Column header="รหัสผู้รับคอมมิชชั่น">
                    <template #body="item">
                        {{ item.data.member_number }}
                    </template>
                </Column>
                <Column header="รหัสผู้รับคอมมิชชั่น">
                    <template #body="item">
                        {{ item.data.name }}
                    </template>
                </Column>
                <Column header="Commission Register Day">
                    <template #body="item">
                        {{ getCommissionDay(item.data.member_number) }}
                    </template>
                </Column>
                <Column header="Commission Register Week">
                    <template #body="item">
                        {{ getCommissionWeek(item.data.member_number) }}
                    </template>
                </Column>
                <Column header="Commission Administer">
                    <template #body="item">
                        {{ getComAdminister(item.data.member_number) }}
                    </template>
                </Column>
                <Column header="รวมยอด ณ ที่จ่าย">
                    <template #body="item">
                        {{ getComTotal(item.data.member_number) }}
                    </template>
                </Column>
                <Column header="สมุดบัญชี (เลขที่บัญชี)">
                    <template #body="item">
                        ธนาคาร : {{ item.data.bank.name }}
                        <br>
                        เลขที่บัญชี : {{ item.data.bank.number }}
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
import * as XLSX from "xlsx";
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
        dialogCancel: false,
        member: [],

        day: '',
        member_id: '',
        item_member: [],
        commission_day: [],
        commission_week: [],
        commission_administer: [],
    }),
    async mounted() {
        await this.getComission();
        await this.getMember();
    },

    methods: {
        async getComission() {
            this.$store.commit('setLoading', true);
            await this.withdrawDay.GetComRegisterDay().then(result => {
                const order = result.data;
                this.commission_day = order.reverse();
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })

            await this.withdrawDay.GetComRegisterWeek().then(result => {
                const order = result.data;
                this.commission_week = order.reverse();
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })

            await this.withdrawDay.GetComAdminister().then(result => {
                const order = result.data;
                this.commission_administer = order.reverse();
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
                this.item_member = this.member.reverse();
            })
        },

        exportCSV() {
            const newData = [];

            this.item_member.map((item) => {
                newData.push({
                    "รหัสสมาชิกผู้รับ": item.member_number,
                    "ชื่อผู้รับ": item.name,
                    "Commission Register Day": this.getCommissionDay(item.member_number),
                    "Commission Register Week": this.getCommissionWeek(item.member_number),
                    "Commission Administer": this.getComAdminister(item.member_number),
                    "รวมยอด ณ ที่จ่าย": this.getComTotal(item.member_number),
                    "ธนาคาร": item.bank.name,
                    "เลขที่บัญชี": item.bank.number
                })
            });

            const dataArr = newData.map((row) => [
                row["รหัสสมาชิกผู้รับ"],
                row["ชื่อผู้รับ"],
                row["Commission Register Day"],
                row["Commission Register Week"],
                row["Commission Administer"],
                row["รวมยอด ณ ที่จ่าย"],
                row["ธนาคาร"],
                row["เลขที่บัญชี"]
            ]);

            dataArr.unshift(["รหัสสมาชิกผู้รับ", "ชื่อผู้รับ", "Commission Register Day", "Commission Register Week", "Commission Administer", "รวมยอด ณ ที่จ่าย", "ธนาคาร", "เลขที่บัญชี"]);
            const ws = XLSX.utils.json_to_sheet(dataArr);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws);
            XLSX.writeFile(wb, "Commission.xlsx");
        },

        getCommissionDay(item) {
            const id = item;
            const list = this.commission_day.filter(
                (item) => item.data[0].member_number === id
            )
            const total_com_day = list.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_day;
        },

        getCommissionWeek(item) {
            const id = item;
            const list = this.commission_week.filter(
                (item) => item.data[0].member_number === id
            )
            const total_com_week = list.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_week;
        },

        getComAdminister(item) {
            const id = item;
            const list = this.commission_administer.filter(
                (item) => item.data[0].member_number === id
            )
            const total_com_administer = list.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_administer;
        },

        getComTotal(item) {
            const id = item;
            const list1 = this.commission_day.filter(
                (item) => item.data[0].member_number === id
            )
            const list2 = this.commission_week.filter(
                (item) => item.data[0].member_number === id
            )
            const list3 = this.commission_administer.filter(
                (item) => item.data[0].member_number === id
            )
            const total_com_day = list1.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total_com_week = list2.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total_com_administer = list3.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total = total_com_day + total_com_week + total_com_administer;
            return total;
        },

        searchDay() {
            if (this.day && this.day[0] !== 0 && this.day[1] !== 0) {
                this.commission_day = this.commission_day.filter(
                    (item) => dayjs(item.timestamp).format() >= dayjs(this.day[0]).format() &&
                        dayjs(item.timestamp).format() <= dayjs(this.day[1]).add(1, "day").format()
                )
                this.commission_week = this.commission_week.filter(
                    (item) => dayjs(item.timestamp).format() >= dayjs(this.day[0]).format() &&
                        dayjs(item.timestamp).format() <= dayjs(this.day[1]).add(1, "day").format()
                )
                this.commission_administer = this.commission_administer.filter(
                    (item) => dayjs(item.timestamp).format() >= dayjs(this.day[0]).format() &&
                        dayjs(item.timestamp).format() <= dayjs(this.day[1]).add(1, "day").format()
                )
            }
        },

        clear() {
            this.day = "";
            this.getComission();
            this.getMember();
        },
    },
}

</script>
