<template>
    <div v-if="isLoading" class="loading-overlay">
        <div class="loader"></div>
    </div>
    <div class="grid my-2">
        <div class="col-12 text-center">
            <h1>รายการสั่งซื้อ </h1>
        </div>
    </div>
    <div class="grid mx-2">
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
                        <OrderDetail title="รายละเอียด" :order_id="item.data._id" :order="item.data"
                            :categoty="item.data.servicename" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { datetimeFormat, numberDigitFormat, numberFormat } from '../../lib/function';
import OrderDetail from "@/components/member/order/OrderDetail.vue"
import { Order } from '@/service/order.member';
import dayjs from "dayjs";
import "dayjs/locale/th";

import axios from 'axios';

export default {
    components: {
        OrderDetail,
    },
    created() {
        document.title = "Order Product | Dekrub Shop";
    },
    setup() {
        const order = new Order();

        return {
            isCancelling: false,
            datetimeFormat,
            numberDigitFormat,
            numberFormat,
            order,
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
            await axios.get(`${process.env.VUE_APP_DEKRUP}/order/list`, {
                headers: {
                    'token': `${localStorage.getItem('token')}`
                }

            }).then(async (res) => {
                const order = res.data.data;
                await this.order.getMe().then(async result => {
                    this.member_number = result.data.member_number;
                    const order_product = order.filter(
                        (item) => item.member_number === this.member_number
                    )
                    this.item_order = order_product.reverse();
                })
            })
        },

        async getCommissionWeek() {
            this.$store.commit('setLoading', true);
            await this.order.getMe().then(async result => {
                this.member_number = result.data.member_number;
                console.log(this.member_number);
                await this.order.getOrder().then(result => {
                    const order = result.data;
                    const id = this.member_number;
                    const order_list = order.filter(
                        (item) => item.data[0].member_number === id
                    )
                    this.item_commission = order_list.reverse();
                })
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
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
            await axios.get(`${process.env.VUE_APP_DEKRUP}/member/list`, {
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
  
