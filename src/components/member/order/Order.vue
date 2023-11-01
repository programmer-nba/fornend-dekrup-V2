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
                <Column header="ใบสั่งสินค้า">
                    <template #body="item">
                        <OrderDetail title="รายละเอียด" :order_id="item.data._id" :order="item.data"
                            :categoty="item.data.servicename" v-if="getLastStatus(item.data.status) === 'ยืนยันออเดอร์'" />
                    </template>
                </Column>
                <Column header="เพิ่มเติม">
                    <template #body="item">
                        <div class="mt-1 ">
                                <PrintReceipt title="ใบออเดอร์" :order_id="item.data._id" :order="item.data"
                            :categoty="item.data.servicename" v-if="getLastStatus(item.data.status) === 'ยืนยันออเดอร์'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
 
</template>
  

  
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
  
  import { ConfirmService } from '@/components/lib/OrderService';
import { datetimeFormat, numberDigitFormat, numberFormat } from '../../lib/function';
import Order from './Order.vue';
import OrderDetail from './OrderDetail.vue';
import PrintReceipt from './PrintReceipt.vue';
import dayjs from "dayjs";
import "dayjs/locale/th";
import axios from 'axios';
import * as XLSX from "xlsx";
