<template>
    <div class="flex justify-content-center align-items-center">
        <Button @click="print()" class="border-none h-12" :label="title" :loading="loading"
            style="background-color: #c51605">
            <svg width="25" height="25" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff"
                    d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" />
            </svg>
            <label class="ml-2">ใบเสร็จรับเงิน</label>
        </Button>
    </div>
    <!-- Print -->
    <div id="printMe" style="display: none">
        <div>
            <!-- หัวกระดาษ -->
            <div style="margin: 0; padding: 0">
                <LogoImg :width="80" style="text-align: center" />
                <p class="print-p"
                    style="font-weight:bold; text-align:center; margin:0; padding-bottom: 10px; padding-top:10px">
                    ใบเสร็จรับเงิน (ชั่วคราว) แบบย่อ</p>
                <p class="print-p" style="margin: 0; text-align: center">
                    บริษัท ดีครับ คอมเมิร์ช จำกัด <br />
                    สำนักงานใหญ่ เลขที่ 30/479 ซอยนวมินทร์ 80 แขวงนวลจันทร์ เขตบึงกุ่ม
                    กรุงเทพมหานคร 10230
                </p>
                <br />
                <p class="print-p" style="text-align: center;">ใบเสร็จเลขที่ {{ this.order.receiptnumber }}</p>
                <p class="print-p" style="text-align: center;">วันที่ {{ datetimeFormat(this.order.timestamp) }}</p>
            </div>

            <div width="500">
                <!-- รายการ -->
                <br />
                <table vorder="0" style="width: 100%" class="print-table">
                    <tr>
                        <th style="text-align:right">ราคา</th>
                    </tr>
                </table>
                <table border="0" style="width: 100%;" class="print-table">
                    <tr v-for="item in order.product_detail" :key="item">
                        <td>x{{ item.quantity }}</td>
                        <td>
                            <p>{{ item.product_name }}</p>
                        </td>
                        <td style="text-align:right">{{ numberDigitFormat(item.totalprice) }}</td>
                    </tr>
                </table>
                <hr class="print-hr" />
                <table border="0" style="width:100%" class="print-table">
                    <tr>
                        <td style="text-align:left">ราคาก่อนหักภาษี :</td>
                        <td style="text-align:right">{{ numberDigitFormat(order.amount) }}</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">VAT:0.00%</td>
                        <td style="text-align:right;">{{ numberDigitFormat((order.amount * 0) / 107) }}</td>
                    </tr>
                    <tr>
                        <th style="text-align:left">ยอดสุทธิ :</th>
                        <th style="text-align:right">{{ numberDigitFormat(order.amount) }}</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import LogoImg from "@/components/LogoView.vue";
import dayjs from "dayjs";
export default {
    components: {
        LogoImg
    },
    props: {
        order: Object,
        className: String,
        productDetail: Object,
    },
    mounted() {
        // console.log(this.order);
        // console.log(this.productDetail);
    },
    methods: {
        datetimeFormat(date) {
            return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
        },

        numberDigitFormat(num) {
            return num.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
        },

        print() {
            console.log(this.order);
            const divContents = document.getElementById("printMe").innerHTML;
            const a = window.open();
            const css = `<style>
        *{font-family:"Sarabun";}
        .print-h{font-size: 14px}
        .print-p{font-size : 10px; margin: 0; padding: 0;}
        .print-table{font-size: 10px;}
        .print-hr{border:0.2px solid lightgray}
        </style>`;
            a.document.write("<html>");
            a.document.write(
                "<link href='https://fonts.googleapis.com/css?family=Sarabun' rel='stylesheet'>"
            );
            a.document.write(css);
            a.document.write(`<title>ใบเสร็จเลขที่ ${this.order.receiptnumber}</title>`);
            a.document.write("<body>");
            a.document.write('<div class="page">');
            a.document.write(divContents);
            a.document.write("</div>");
            a.document.write("</body></html>");
            a.document.close();
            setTimeout(() => {
                a.print();
                a.close();
            }, 2500);
        },
    },
};
</script>
  