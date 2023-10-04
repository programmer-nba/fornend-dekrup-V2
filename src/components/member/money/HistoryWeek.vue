<template>
    <v-row class="mt-2">
        <v-col cols="12">
            <v-text-field v-model="date" type="month" variant="outlined" density="comfortable" @change="chooseDate()"
                class="w-100" />
        </v-col>
    </v-row>
    <!-- <v-row class="mb-3">
        <v-col>
            <p>ค่าคอมมิชชั่นรวมของท่าน <span style="color:green"> {{ alltime_commission.toFixed(2) }} </span> บาท</p>
        </v-col>
    </v-row> -->
    <!-- <v-list v-if="comission_history.length !== 0"> -->
    <v-list>
        <v-divider />
        <div v-for="(item, index) in comission_history" :key="index">
            <p>{{ dateformat(item.createdAt) }}</p>
            <p>คุณได้รับค่า commission จำนวน <span style="color:green;background-color: #fff;border-radius: 5px;"> + {{ item.remainding_commission.toFixed(2) }}  </span>
                บาท</p>
            <p><italic>จากรายการ</italic></p>
            <div v-for="(data, i) in item.orderData[0]" :key="i" class="commision-list mt-0">
                <p>ชื่อ : {{ data.packagename }}</p>
                <p>รายละเอียด : {{ data.packagedetail }}</p>
            </div>
            <v-divider />
        </div>
    </v-list>
    <v-row>
        <v-col cols="12">
            <p class="text-center"><em>--ไม่มีรายการแจ้งเติมเงิน--</em></p>
        </v-col>
    </v-row>
</template>

<script>
import dayjs from 'dayjs'
// import axios from 'axios';
// import HistoryItemListDetail from './HistoryItemListDetail.vue';
// import { Point } from "@/services/pointservice";

export default {
    components: {
        // HistoryItemListDetail
    },
    setup() {
        // const pointservice = new Point();
        const dateformat = (date) => {
            return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss น.");
            // return new Date(date).toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
        return { dateformat }
    },
    async created() {
       
    },
    data: () => ({
        
        date: dayjs(Date.now()).format('YYYY-MM')
    }),
    async mounted() {
        
        console.log(this.$store.state.user)
    },
    methods: {
        chooseDate() {
            this.item_history = this.history.filter((el) => dayjs(el.createdAt).format('YYYY-MM') === dayjs(this.date).format('YYYY-MM'));
        },
        
    }
}
</script>

<style>
.w-100 {
    max-width: 15rem;
}

.commision-list {
    margin: 1rem 1rem 1rem 1rem;
}</style>