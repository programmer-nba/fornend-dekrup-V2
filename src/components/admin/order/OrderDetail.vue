<template>
    <Button @click="getOrder" icon="pi pi-list" class="p-button-purple" :label="title" :loading="loading" />

    <Sidebar v-model:visible="sidebar" class="p-sidebar-lg" position="right">
        <div v-if="order !== null">
            <div class="grid">
                <div class="col-12 text-center">
                    <h2>เลขอ้างอิง : {{ order.receiptnumber }}</h2>
                    <p>{{ datetimeFormat(order.timestamp) }}</p>
                    <p><strong>สถานะ : </strong>
                        <Chip :class="getStatusColor(getLastStatus(order.status))" :label="getLastStatus(order.status)" />
                    </p>
                </div>
            </div>
            <div class="grid">
                <dic class="col-12 lg:col-6">
                    <Card class="border-1 shadow-none">
                        <template #content>
                            <p><strong>ชื่อลูกค้า : </strong>{{ order.customer_name }}</p>
                            <p><strong>เบอร์โทร : </strong>{{ order.customer_tel }}</p>
                            <p><strong>ที่อยู่จัดส่ง : </strong>{{ order.customer_address }}</p>
                        </template>
                    </Card>
                </dic>
                <div class="col-12 lg:col-3">
                    <Card class="pb-0 border-1 border-blue-500 bg-blue-500 text-white text-center">
                        <template #title>{{ numberFormat(order.totalprice) }}
                            <small>บาท</small></template>
                        <template #content>ยอดรวมในใบเสร็จ</template>
                    </Card>
                </div>
                <!-- <div class="col-12 lg:col-3">
                    <Card class="pb-0 border-1 border-blue-500 bg-blue-500 text-white text-center">
                        <template #title>{{ numberFormat(order.totalprice) }}
                            <small>บาท</small></template>
                        <template #content>ต้นทุนสินค้า</template>
                    </Card>
                </div> -->
            </div>
            <div class="grid">
                <div class="col-12">
                    <DataTable :value="order.product_detail" :paginator="true" :rows="10">
                        <Column header="รายการ">
                            <template #body="item">
                                {{ item.index + 1 }}
                            </template>
                        </Column>
                        <Column header="ชื่อสินค้า">
                            <template #body="item">
                                {{ item.data.product_name }}
                            </template>
                        </Column>
                        <Column header="ราคา">
                            <template #body="item">
                                {{ numberDigitFormat(item.data.price) }}
                            </template>
                        </Column>
                        <Column header="จำนวนสินค้า">
                            <template #body="item">
                                {{ item.data.quantity }}
                            </template>
                        </Column>
                        <Column header="ราคารวม">
                            <template #body="item">
                                {{ numberDigitFormat(item.data.totalprice) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </Sidebar>
</template>

<script>
import { datetimeFormat, numberDigitFormat, numberFormat, getImage } from '../../lib/function';
export default {
    setup() {
        return { datetimeFormat, numberDigitFormat, numberFormat, getImage }
    },
    props: {
        order_id: String,
        order: Object,
        title: String,
    },

    data: () => ({
        sidebar: false,
        loading: false,
    }),
    methods: {
        async getOrder() {
            this.loading = false;
            this.sidebar = true;
        },

        getLastStatus(item) {
            const data = item[item.length - 1].status;
            return data
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

    }
}
</script>

<style>
.product-image {
    width: 110px;
    height: 110px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>