<template>
    <div class="grid">
        <div class="col-12 text-center">
            <h1>Commission Register Day</h1>
            <small><strong>หมายเหตุ : </strong>ค่าคอมมิชชั่น จากการแนะนำผู้สมัคร</small>
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
        <div class="col-2">
            <Dropdown v-model="member_id" :options="item_member" optionLabel="name" optionValue="_id" placeholder="Select Member"
                class="w-full" @change="filtermember()" />
        </div>
        <div class="col-1">
            <Button label="Clear All" class="p-button-text p-button-plain" @click="clear"></Button>
        </div>
        <div class="col-3">
            <Button icon="pi pi-file-export" label="Download" @click="exportCSV()" class="mr-2"></Button>
        </div>
    </div>
    <div class="grid">
        <div class="col-12">
            <DataTable :value="item_commission" :paginator="true" :rows="20" ref="dt">
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
                        {{ numberDigitFormat(getLastCom(item.data.data)) }}
                    </template>
                </Column>
                <Column header="ภาษี ณ ที่จ่าย 3%">
                    <template #body="item">
                        {{ numberDigitFormat(getLastVat(item.data.data)) }}
                    </template>
                </Column>
                <Column header="ค่าคอมมิชชั่น (หลังหักภาษี)">
                    <template #body="item">
                        {{ numberDigitFormat(getLastComnet(item.data.data)) }}
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
        document.title = "Commission Register Day | Dekrub Shop";
    },
    data: () => ({
        item_commission: [],
        dialogCancel: false,
        member: [],

        day: '',
        member_id: '',
        item_member: [],
    }),
    async mounted() {
        await this.getComRegisterDay();
        await this.getMember();
    },

    methods: {
        async getComRegisterDay() {
            this.$store.commit('setLoading', true);
            await this.withdrawDay.GetComRegisterDay().then(result => {
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
                this.item_member = this.member.reverse();
            })
        },

        exportCSV() {
            const newData = [];

            this.item_commission.map((item) => {
                newData.push({
                    "รหัสสมาชิกผู้รับ": item.data[0].member_number,
                    "ชื่อผู้รับ": this.getMemberName(item.data[0].member_number),
                    "ก่อนหักภาษี": item.data[0].commission,
                    "หักภาษี ณ ที่จ่าย 3%": item.data[0].vat3percent,
                    "หลังหักภาษี": item.data[0].remainding_commission,
                    "วันที่": this.datetimeFormat(item.timestamp)
                })
            });

            const commission = this.item_commission.reduce((sum, item) => sum + item.data[0].commission, 0);
            const vat = this.item_commission.reduce((sum, item) => sum + item.data[0].vat3percent, 0);
            const total = this.item_commission.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);

            const dataArr = newData.map((row) => [
                row["รหัสสมาชิกผู้รับ"],
                row["ชื่อผู้รับ"],
                row["ก่อนหักภาษี"],
                row["หักภาษี ณ ที่จ่าย 3%"],
                row["หลังหักภาษี"],
                row["วันที่"]
            ]);

            dataArr.unshift(["รหัสสมาชิกผู้รับ", "ชื่อผู้รับ", "ก่อนหักภาษี", "หักภาษี ณ ที่จ่าย 3%", "หลังหักภาษี", "วันที่"]);
            dataArr.push(["", "", commission, vat, total, ""]);
            const ws = XLSX.utils.json_to_sheet(dataArr);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws);
            XLSX.writeFile(wb, "CommissionRegisterDay.xlsx");
        },

        searchDay() {
            if (this.day && this.day[0] !== 0 && this.day[1] !== 0) {
                this.item_commission = this.item_commission.filter(
                    (item) => dayjs(item.timestamp).format() >= dayjs(this.day[0]).format() &&
                        dayjs(item.timestamp).format() <= dayjs(this.day[1]).add(1, "day").format()
                )
            }
        },

        clear() {
            this.day = "";
            this.member_id = "";
            this.getComRegisterDay();
        },

        getMemberName(item) {
            const member = this.member.find((el) => el.member_number === item)
            if (member) {
                return member.name;
            } else {
                return 'สมาชิกนี้ไม่มีในฐานข้อมูลแล้ว...';
            }
        },

        getMemberCode(item) {
            const member = this.member.find((el) => el._id === item)
            if (member) {
                return member.member_number;
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

        numberDigitFormat(num) {
            return num.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
        },

        filtermember() {
            if (this.member_id !== "") {
                const id = this.getMemberCode(this.member_id);
                this.item_commission = this.item_commission.filter(
                    (item) => item.data[0].member_number === id
                )
            }
        },
    },
}

</script>
