<template>
   
    <div class="size-datatable">
        <DataTable :key="index" paginator :rows="10" :rowsPerPageOptions="[ 10, 20, 30, 50]" tableStyle="min-width: 50rem" :value="dataTableData" style="-webkit-text-stroke: 1px;">
        <!-- <Column field="_id" header="ไอดี" ></Column> -->
            <Column field="member_number" header="สมาชิก" ></Column>
            <Column field="commission" header="ค่าคอมมิชชั่น"></Column>
            <Column field="vat3percent" header="ค่า vat3%"></Column>
            <Column field="remainding_commission" header="ค่าคอมมิชชั่น(หลังหักค่า vat3%)"></Column>
            <Column field="from_member" header="ค่าคอมมิชชั่นจากผู้ใช้"></Column>
            <Column field="date_comisstion" header="วันที่ทำรายการ"></Column>
        </DataTable>
            <v-row>
                <v-col cols="12" >
                    <p class="text-center"><em>--ไม่มีรายการ--</em></p>
                </v-col>
            </v-row>
    </div>
    
</template>
<script>
import axios from 'axios';
import dayjs from 'dayjs'




export default {
  data() {
    return {
      data: [],
      date: null,
      dataTableData: [] // ตัวแปร dataTableData ต้องเป็น Array

    };
  },
  setup() {
        const dateformat = (date) => {
            return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss น.");
        }
        return { dateformat}
    },

    methods: {
    filterDataByDate() {
      this.filteredData = this.data.filter(item => {
        const selectedDate = dayjs(this.date).format("DD/MM/YYYY");
        const itemDate = dayjs(item.createdAt).format("DD/MM/YYYY");
        return itemDate === selectedDate;
      });
    }
  },


  created() {
  // ดึงข้อมูล commission จาก API
  axios.get(`${process.env.VUE_APP_DEKRUP}/commission/week`, {
    headers: {
      'token': localStorage.getItem('token'),
    },
  })
  .then((response) => {
    const loggedInMemberNumber = "DK96900000001"; // ค่า "member_number" ของสมาชิกที่ล็อกอิน เปลี่ยนเป็นค่าที่เหมาะสมตามการล็อกอินจริง
    this.dataTableData = response.data.data
      .filter(item => item.data[0].member_number === loggedInMemberNumber)
      .map(item => ({
        member_number:  item.data[0].member_number,
        commission: item.data[0].commission,
        vat3percent:  item.data[0].vat3percent,
        remainding_commission:  item.data[0].remainding_commission,
        from_member: item.from_member,
        date_comisstion: this.dateformat(item.createdAt),
      }));
  })
  .catch((error) => {
    console.error(error);
  });
},





};
</script>


<style>
.size-datatable{
    width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.p-datatable .p-datatable-thead > tr > th {
    background-color: #d9d9d9 !important;
    color: #ce0606 !important;
}
</style>