<template>
    <div v-if="isLoading" class="loading-overlay">
        <div class="loader"></div>
    </div>
    <div class="grid">
        <div class="col-12 text-center">
            <h1>Order Product Dekrub</h1>
        </div>
        <div class="col-8 lg:col-3 ml-3">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon text-white" style="background-color: #c21010">
                    <i class="pi pi-calendar text-xl"></i>
                </span>
                <Calendar inputId="range" icon="pi pi-calendar" selectionMode="range" placeholder="FILTER DATE"
                    class="w-full" v-model="day" @date-select="searchDay" />
            </div>
        </div>
        <!-- <div class="col-2">
            <Dropdown v-model="product_id" :options="item_product" optionLabel="name" optionValue="_id"
                placeholder="Select Product" class="w-full" @change="filterproduct()" />
        </div> -->
        <div class="col-1">
            <Button label="Clear All" class="p-button-text p-button-plain" @click="clear"></Button>
        </div>
        <div class="col-12 lg:col-1 ">
            <Button icon="pi pi-file-export" label="Export" @click="exportCSV()" class="mr-2 border-red-600"
                style="background-color: #c21010"></Button>
        </div>
    </div>
    <div class="grid mt-2">
        <div class="col-12">
            <DataTable :value="item_order" :paginator="true" :rows="20" ref="dt">
                <template #empty>
                    <p class="text-center"><em>-- ไม่พบข้อมูล --</em></p>
                </template>
                <Column header="เลขที่ใบเสร็จ">
                    <template #body="item">
                        {{ item.data.receiptnumber }}
                    </template>
                </Column>
                <Column header="ชื่อผู้สั่ง">
                    <template #body="item">
                        {{ item.data.customer_name }}
                    </template>
                </Column>
                <Column header="ที่อยู่ในการจัดส่ง" style="width: 15%">
                    <template #body="item">
                        {{ item.data.customer_address }}
                    </template>
                </Column>
                <Column header="เบอร์โทร">
                    <template #body="item">
                        {{ item.data.customer_tel }}
                    </template>
                </Column>
                <Column header="ราคา">
                    <template #body="item">
                        {{ numberDigitFormat(item.data.totalprice) }}
                    </template>
                </Column>
                <Column header="สลิปโอนเงิน">
                    <template #body="item">
                        <Image :src="getImage(item.data.picture)" preview width="100" />
                    </template>
                </Column>
                <Column header="สถานะ">
                    <template #body="item">
                        <Chip :class="getStatusColor(getLastStatus(item.data.status))"
                            :label="getLastStatus(item.data.status)" />
                    </template>
                </Column>
                <Column header="วันที่">
                    <template #body="item">
                        {{ datetimeFormat(item.data.timestamp) }}
                    </template>
                </Column>
                <Column header="เพิ่มเติม">
                    <template #body="item">
                        <div class="mt-1 ">
                            <Button class="p-button-success mr-1 " icon="pi pi-check" @click="confirmOrder(item.data)"
                                v-if="getLastStatus(item.data.status) === 'รอตรวจสอบ'" />
                            <Button v-if="getLastStatus(item.data.status) === 'รอตรวจสอบ'" class="p-button-danger mt-2"
                                icon="pi pi-times" @click="cancelOrder(item.data)" />
                            <OrderDetail title="รายละเอียด" :order="item.data"
                                v-if="getLastStatus(item.data.status) === 'ยืนยันออเดอร์'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <div>
        <Dialog v-model:visible="displayOrderDetail" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '700px' }" header="รายละเอียดออเดอร์">
            <div v-if="selectedOrder">
                <div v-for="(product, index) in selectedOrder.product_detail" :key="index">
                    <h1>{{ product.product_name }}</h1>
                    <p>รายละเอียด: {{ product.product_detail }}</p>
                    <p>จำนวน: {{ product.quantity }}</p>
                    <p>ราคา: {{ product.price }}</p>
                    <p>รวม: {{ product.totalprice }}</p>
                </div>
            </div>
            <template #footer>
                <Button label="ปิด" class=" p-button-danger" icon="pi pi-times" @click="closeOrderDetailDialog" />
            </template>
        </Dialog>
    </div>
</template>
  
<script>
import { ConfirmService } from '@/components/lib/OrderService';
import { datetimeFormat, numberDigitFormat, numberFormat } from '../../lib/function';
import OrderDetail from './OrderDetail.vue';

import dayjs from "dayjs";
import "dayjs/locale/th";

import axios from 'axios';
import * as XLSX from "xlsx";
export default {
    components: {
        OrderDetail,
    },
    created() {
        document.title = "Order Product | Dekrub Shop";
    },
    setup() {
        const OrderService = new ConfirmService();
        return {
            OrderService,
            isCancelling: false,
            datetimeFormat,
            numberDigitFormat,
            numberFormat
        }
    },
    data: () => ({
        item_order: [],
        item_member: [],
        item_product: [],
        amount: 0,
        amount1: 0,
        isLoading: false,

        day: '',
        product_id: '',

        displayOrderDetail: false,
    }),
    async mounted() {
        await this.getOrder();
        await this.getProduct();
        await this.getMember();
    },
    methods: {
        async getOrder() {
            await axios.get(`${process.env.VUE_APP_DEKRUP}/order/admin/list`, {
                headers: {
                    'token': `${localStorage.getItem('token')}`
                }

            }).then((res) => {
                const order = res.data.data;
                this.item_order = order.reverse();
            })
        },

        getImage(item) {
            return "https://drive.google.com/uc?export=view&id=" + item;
        },

        getLastStatus(item) {
            const data = item[item.length - 1].status;
            return data
        },

        async getMember() {
            await axios.get(`${process.env.VUE_APP_DEKRUP}/member`, {
                headers: {
                    'token': `${localStorage.getItem('token')}`
                }
            }).then((res) => {
                this.item_member = res.data.data;
            })
        },

        async getProduct() {
            await axios.get(`${process.env.VUE_APP_DEKRUP}/product/list`, {
                headers: {
                    'token': `${localStorage.getItem('token')}`
                }
            }).then((res) => {
                this.item_product = res.data.data;
            })
        },

        getCodeProduct(item) {
            const product = this.item_product.find((el) => el._id === item)
            if (product) {
                return product.code;
            } else {
                return 'สินค้านี้ไม่มีในฐานข้อมูลแล้ว...';
            }
        },

        getNameProduct(item) {
            const product = this.item_product.find((el) => el._id === item)
            if (product) {
                return product.name;
            } else {
                return 'สินค้านี้ไม่มีในฐานข้อมูลแล้ว...';
            }
        },

        getNameMember(item) {
            const member = this.item_member.find((el) => el.member_number === item)
            if (member) {
                return member.name;
            } else {
                return 'สมาชิกนี้ไม่มีในฐานข้อมูลแล้ว...';
            }
        },

        getTelMember(item) {
            const member = this.item_member.find((el) => el.member_number === item)
            if (member) {
                return member.tel;
            } else {
                return 'สมาชิกนี้ไม่มีในฐานข้อมูลแล้ว...';
            }
        },

        getAddressMember(item) {
            const member = this.item_member.find((el) => el.member_number === item)
            if (member) {
                const address = `${member.address} ${member.subdistrict} ${member.district} ${member.province} ${member.postcode}`
                return address;
            } else {
                return 'สมาชิกนี้ไม่มีในฐานข้อมูลแล้ว...';
            }
        },

        getStatusColor(item) {
            switch (item) {
                case 'รอตรวจสอบ':
                    return 'bg-yellow-500 text-white';
                case 'ยืนยันออเดอร์':
                    return 'bg-green-500 text-white';
                case 'ยกเลิกออเดอร์':
                    return 'bg-red-500 text-white';
                default:
                    return '';
            }
        },

        //รับออเดอร์
        async confirmOrder(item) {
            const id = item._id;
            const status = this.getLastStatus(item.status);
            if (status !== 'รอตรวจสอบ') {
                await this.getOrder();
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'รายการนี้ถูกดำเนินการเรียบร้อยแล้ว', life: 3000 })
                return false
            }
            await axios
                .put(`${process.env.VUE_APP_DEKRUP}/order/confirm/${id}`, {
                    headers: {
                        'token': `${localStorage.getItem('token')}`
                    },
                })
                .then(() => {
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ยืนยันการรับออเดอร์สำเร็จ",
                        life: 3000,
                    });
                })
                .catch(() => {
                    this.$toast.add({
                        severity: "danger",
                        summary: "ไม่สำเร็จ",
                        detail: "ยืนยันการรับออเดอร์ไม่สำเร็จ",
                        life: 3000,
                    });
                });
        },

        async cancelOrder(item) {
            const id = item._id;
            const status = this.getLastStatus(item.status);
            if (status !== 'รอตรวจสอบ') {
                await this.getOrder();
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'รายการนี้ถูกดำเนินการเรียบร้อยแล้ว', life: 3000 })
                return false
            }
            await axios
                .put(`${process.env.VUE_APP_DEKRUP}/order/cancel/${id}`, {
                    headers: {
                        'token': localStorage.getItem('token'),
                    },
                })
                .then(() => {
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ยกเลิกออเดอร์สำเร็จ",
                        life: 3000,
                    });
                })
                .catch(() => {
                    this.$toast.add({
                        severity: "danger",
                        summary: "ไม่สำเร็จ",
                        detail: "ยกเลิกออเดอร์ไม่สำเร็จ",
                        life: 3000,
                    });
                });
        },

        clear() {
            this.day = "";
            this.product_id = "";
            this.getOrder();
            this.getProduct();
            this.getMember();
        },

        searchDay() {
            if (this.day && this.day[0] !== 0 && this.day[1] !== 0) {
                this.item_order = this.item_order.filter(
                    (item) => dayjs(item.timestamp).format() >= dayjs(this.day[0]).format() &&
                        dayjs(item.timestamp).format() <= dayjs(this.day[1]).add(1, "day").format()
                )
            }
        },

        exportCSV() {
            const newData = [];

            this.item_order.map((item) => {
                const status = this.getLastStatus(item.status)
                if (status === 'ยืนยันออเดอร์') {
                    const amount = item.product_detail.length;
                    for (let i = 0; i < amount; i++) {
                        newData.push({
                            "วันที่": this.datetimeFormat(item.timestamp),
                            "รหัสสินค้า": this.getCodeProduct(item.product_detail[i].product_id),
                            "ชื่อสินค้า": this.getNameProduct(item.product_detail[i].product_id),
                            "จำนวน": item.product_detail[i].quantity,
                            "ชื่อผู้สั่ง": this.getNameMember(item.member_number),
                            "เบอร์โทรผู้สั่ง": this.getTelMember(item.member_number),
                            "ที่อยู่จัดส่ง": this.getAddressMember(item.member_number),
                        })
                    }
                }
            })

            const dataArr = newData.map((row) => [
                row["วันที่"],
                row["รหัสสินค้า"],
                row["ชื่อสินค้า"],
                row["จำนวน"],
                row["ชื่อผู้สั่ง"],
                row["เบอร์โทรผู้สั่ง"],
                row["ที่อยู่จัดส่ง"]
            ]);

            dataArr.unshift(["วันที่", "รหัสสินค้า", "ชื่อสินค้า", "จำนวน", "ชื่อผู้สั่ง", "เบอร์โทรผู้สั่ง", "ที่อยู่จัดส่ง"]);
            const ws = XLSX.utils.json_to_sheet(dataArr);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws);
            XLSX.writeFile(wb, "PreOrder.xlsx");
        },

        filterproduct() {
            if (this.product_id !== "") {
                const id = this.getCodeProduct(this.product_id);
                this.item_order = this.item_order.filter(
                    (item) => this.getCodeProduct(item.product_detail[0].product_id) === id
                )
            }
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

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loader {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  
  