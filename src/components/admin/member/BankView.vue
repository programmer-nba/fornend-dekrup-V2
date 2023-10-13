<template>
    <div class="mt-4 ">
        <h1 class="md:m-0 text-center">ตรวจสอบ สมุดบัญชีธนาคาร</h1>
        <DataTable :value="item_bank" :paginator="true" :rows="10" class="px-3 py-3"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate=" แสดง {first} ถึง {last} ของ {totalRecords} รายการ"
            responsiveLayout="scroll">
            <template #empty>ไม่มีข้อมูล</template>
            <Column header="รหัสสมาชิก">
                <template #body="item">
                    {{ item.data.member_number }}
                </template>
            </Column>
            <Column header="ชื่อ">
                <template #body="item">
                    {{ item.data.name }}
                </template>
            </Column>
            <Column header="รูปภาพ">
                <template #body="item">
                    <Image :src="getImage(item.data.picture)" width="100" preview />
                </template>
            </Column>
            <Column header="สถานะ">
                <template #body="item">
                    {{ getLaststatus(item.data.status) }}
                </template>
            </Column>
            <Column header="เพิ่มเติม">
                <template #body="item">
                    <Button class="p-button-success mr-1" icon="pi pi-check" @click="confirmBank(item.data)"
                        v-if="getLaststatus(item.data.status) !== 'ยืนยันเรียบร้อยแล้ว'" />
                    <!-- <Button class="p-button-danger" icon="pi pi-times" @click="showCancelDialog(item.data)"
                        v-if="getLaststatus(item.data.status) !== 'ยืนยันเรียบร้อยแล้ว'" /> -->
                </template>
            </Column>
        </DataTable>

    </div>
</template>
  
<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Member } from "../../../service/member";

export default {
    name: "Tablemember",
    data() {
        return {
            item_bank: [],
            imagePreview: null,
        };
    },
    setup() {
        const confirms = new Member();
        return { confirms };
    },
    mounted() {
        this.getdata();
    },
    methods: {
        dateformat(date) {
            return dayjs(date).locale("th").add(543, "year").format("DD/MMMM/YYYY");
        },
        datetimeFormat(date) {
            return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
        },

        async getdata() {
            let res = await axios
                .get(`${process.env.VUE_APP_DEKRUP}/verify_bank`, {
                    headers: {
                        "token": localStorage.getItem("token"),
                    },
                })
                .catch((e) => {
                    if (e.res.status === 408) {
                        window.location.reload();
                    }
                });
            const banks = res.data.data;
            const bank_list = banks.filter(
                (item) => this.getLaststatus(item.status) === 'อยู่ระหว่างการตรวจสอบ'
            )
            this.item_bank = bank_list.reverse();
        },

        getLaststatus(item) {
            const data = item[item.length - 1].status;
            return data
        },

        getImage(item) {
            return "https://drive.google.com/uc?export=view&id=" + item;
        },

        async confirmBank(item) {
            const id = item._id
            this.$store.commit('setLoading', true);
            await this.confirms.ConfirmBank(id).then(async (result) => {
                if (result) {
                    this.loading = false;
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "อัพเดตรายการสำเร็จ",
                        life: 3000,
                    })
                    this.getdata();
                }
            })
        }
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

.dialog-change .p-dialog-content {
    background: #FFFDE3;
}

.dialog-change .p-dialog-header {
    background-color: #FFFDE3;
    color: #C21010;
    /* เปลี่ยนสีตัวหนังสือที่นี่ */
    padding: 0.7rem;
    /* สีเส้นขอบล่าง */
}

.dialog-change .p-dialog-footer {
    background-color: #FFFDE3;
    color: #C21010;
    /* เปลี่ยนสีตัวหนังสือที่นี่ */
    padding: 0.7rem;
    /* สีเส้นขอบล่าง */
}
</style>
  
  