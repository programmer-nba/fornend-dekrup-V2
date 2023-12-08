<template>
    <div>
        <div class="grid mt-2">
            <div class="col-12 text-center">
                <h1 class="mb-0">Package สำหรับสมาชิกใหม่</h1>
                <p class="mt-0"><strong>ประเภท :</strong> แนบสลิปการโอน</p>
                <Button class="p-button-danger z-0" label="ออกจากระบบ" icon="pi pi-power-off" @click="logout()" />

            </div>
        </div>
        <div class="grid">
            <div class="col-12">
                <Message><strong>เวลาทำการ : </strong> เวลาทำการตรวจสอบ ทุกวัน เวลา 9.00 น. ถึง 18.00 น.
                    หากนอกเวลาทำการจะทำการตรวจสอบในเวลาทำการของวันถัดไป</Message>
                <Message><strong>หมายเหตุ : </strong> หากท่านทำการส่งข้อมูลแจ้งชำระเงินเรียบร้อยแล้ว
                    กรุณารอการยืนยันจากเจ้าหน้าที่ 10-15 นาที เพื่อทำการเข้าสู่ระบบ</Message>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 lg:col-3">
                <Panel header="STEP 1 : Package เริ่มต้น">
                    <div class="grid">
                        <div class="col-12" v-if="this.amount === 0">
                            <DataView :value="item_product">
                                <template #list="slotProps">
                                    <div class="col-6  lg:col-12 xl:col-6 mt-5 px-1">
                                        <div class="background-product" style="padding: 5%;">
                                            <img :src="`https://drive.google.com/uc?export=view&id=` + slotProps.data.picture"
                                                class="img-productCon" />
                                            <div>
                                                <h3 style="-webkit-text-stroke:1px;padding-bottom: 30px;">{{
                                                    slotProps.data.name }}</h3>
                                                <Button icon="pi pi-shopping-cart" style="padding: 5px;"
                                                    class="mb-1 p-button-danger z-0 w-full" label="ใส่ตระกร้า"
                                                    @click="addprice(slotProps.data)" />
                                                <Button label="รายละเอียด" severity="warning" style="padding: 5px;"
                                                    @click="showDetailDialog(slotProps.data)" class="w-full" />
                                                <Dialog :visible="slotProps.data.showDetail" modal header="รายละเอียดสินค้า"
                                                    class="size-dialog">
                                                    <img :src="`https://drive.google.com/uc?export=view&id=` + slotProps.data.picture"
                                                        class="img-productConDialog" />
                                                    <h2>{{ slotProps.data.name }}</h2>
                                                    <p>
                                                        {{ slotProps.data.detail }}
                                                    </p>
                                                    <template #footer>
                                                        <Button label="ปิด" icon="pi pi-times"
                                                            @click="closeDetailDialog(slotProps.data)" text />
                                                    </template>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </DataView>
                        </div>
                        <div v-else>
                            <Message><strong>หมายเหตุ : </strong>กรุณาแสกน QR Code ด้านล่างเพื่อชำระเงิน พร้อมแนบสลิป
                            </Message>
                            <!-- <Image :src="require('../../../assets/QRdekrub.jpg')" :preview="true" imageClass="w-full" /> -->
                            <img :src="getImage(images)" width="300" />
                        </div>
                    </div>
                </Panel>
            </div>
            <div class="col-12 lg:col-3">
                <Panel header="STEP 2 : โอนเงินเข้าบัญชีบริษัท">
                    <div class="grid">
                        <div class="col-12">
                            <!-- <Image :src="require('@/assets/img/scb_bank.jpg')" :preview="true" imageClass="w-full" /> -->
                            <!-- <img :src="getImage(images)" width="300" /> -->
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="field">
                            <span class="p-float-label">
                                <InputNumber v-model="amount" inputClass="font" class="w-full" disabled />
                            </span>
                            <div class="col-12 text-center" v-if="this.amount !== 0">
                                <Button label="เปลี่ยนสินค้า" @click="clearprice()" icon="pi pi-trash"
                                    class="p-button-danger" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="field text-center">
                            <FileUpload mode="basic" :auto="true" chooseLabel="แนบรูปภาพหลักฐานการโอน"
                                uploadIcon="pi pi-paperclip" @uploader="chooseImage" :customUpload="true"
                                v-if="slip_img === null" />
                        </div>
                    </div>
                </Panel>
            </div>

            <div class="col-12 lg:col-3">
                <Panel header="STEP 3 : รูปภาพหลักฐานการโอน">
                    <div class="grid" v-if="img_preview !== null">
                        <div class="col-12">
                            <Image :src="img_preview" imageClass="w-full" :preview="true" />
                        </div>
                        <div class="col-12 text-center">
                            <Button label="ลบ" @click="clearImage()" icon="pi pi-trash" class="p-button-danger" />
                        </div>
                    </div>
                    <div class="grid" v-else>
                        <div class="col-12 text-center">
                            <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/document_view.png"
                                width="200" />
                        </div>
                    </div>
                </Panel>
            </div>
            <div class="col-12 lg:col-3">
                <Panel header="STEP 4 : แจ้งชำระเงิน">
                    <div class="grid">
                        <div class="col-12">
                            <Checkbox v-model="checked" :binary="true" /> ยอมรับเงื่อนไขการใช้งานและข้อความแจ้งเตือนข้างต้น
                        </div>
                        <div class="col-12">
                            <Button label="ส่งข้อมูลแจ้งชำระเงิน" icon="pi pi-send" @click="confirm()" />
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    </div>

    <!--dialog แสดงเงินทอน-->
    <Dialog :aria-current="true" v-model:visible="dialogChange" header="ทำรายการเสร็จสิ้น" :modal="true" :closable="false" :style="{ width: '25vw' }"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
        <div class="grid">
            <div class="col-12">
                <div class="grid mt-2">
                    <div class="col-6">
                        <PrintReceipt :order="res" className="w-full" />
                    </div>
                    <div class="col-6">
                        <Button class="p-button-danger z-0" label="ออกจากระบบ" icon="pi pi-power-off" @click="logout()" />
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { Member } from "../../../service/member";
import PrintReceipt from "../PrintReceipt/PrintReceiptMember.vue"
export default {
    components: {
        PrintReceipt
    },
    setup() {
        const members = new Member();
        return { members }
    },

    created() {
        document.title = "Order New Member | Dekrub Shop";
    },

    data: () => ({
        visible: false,
        dialogChange: false,

        member_number: '',
        amount: 0,
        product_id: '',
        slip_img: null,
        img_preview: null,
        checked: false,
        item_product: [],

        images: null,

        res: '',
    }),

    async mounted() {
        await this.getProduct();
        const id = "image_qrcode";
        await axios.get(`${process.env.VUE_APP_DEKRUP}/more/function_more/${id}`,)
            .then((res) => {
                this.images = res.data.data.func_detail.reverse();
            })
    },

    methods: {
        async getProduct() {
            this.$store.commit('setLoading', true);
            await this.members.GetProduct().then(result => {
                this.item_product = result.data;
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })
        },

        clearImage() {
            this.img_preview = null;
            this.slip_img = null;
        },

        getImage(item) {
            if (Array.isArray(item) && item.length > 0) {
                const firstImageId = item[0];
                return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
            } else {
                return "";
            }
        },

        chooseImage(event) {
            if (event.files[0].size > 1048576) {
                // Check if the image size exceeds 1 MB
                Swal.fire("แจ้งเตือน", "ขนาดรูปภาพเกิน 1 MB", "error");
                return; // Don't set the image if it exceeds the size limit
            }
            this.slip_img = event.files[0];
            this.img_preview = event.files[0].objectURL;
        },
        async addprice(item) {
            this.product_id = item._id;
            this.amount = item.price;
        },

        async clearprice() {
            this.amount = 0;
            this.product_id = '';
        },

        async confirm() {
            this.loading = true;

            if (!this.slip_img) {
                // ถ้ายังไม่มีรูปภาพแนบ
                Swal.fire('แจ้งเตือน', 'กรุณาแนบรูปภาพหลักฐานการโอน', 'warning');
                this.loading = false;
                return;
            }

            const data = {
                member_number: this.$store.getters.member_number,
                name: this.$store.getters.name,
                amount: this.amount,
                product_id: this.product_id,
            };

            console.log(data);

            const formData = new FormData();
            formData.append('member_number', this.$store.getters.member_number);
            formData.append('name', this.$store.getters.name);
            formData.append('amount', this.amount);
            formData.append('imgCollection', this.slip_img);
            formData.append('product_id', this.product_id);

            await this.members.orderNewMember(formData).then(async (result) => {
                if (result) {
                    this.loading = false;
                    this.res = result.data;
                    this.dialogChange = true;
                    // this.$store.commit('setLoginDefault');

                    // Swal.fire({
                    //     title: 'แจ้งชำระเงินเรียบร้อย',
                    //     text:
                    //         'รอการตรวจสอบจากส่วนกลางในวันเวลาทำการภายใน 10-15 นาที',
                    //     showConfirmButton: true,
                    // }).then(() => {
                    //     window.location.reload('/');

                    // });
                }
            });
        },

        showDetailDialog(item) {
            item.showDetail = true;
        },

        closeDetailDialog(item) {
            item.showDetail = false;
        },


        async logout() {
            this.$store.commit("setLoading", true);
            await axios
                .post(`${process.env.VUE_APP_DEKRUP}/logout`, null, {
                    headers: {
                        token: this.$store.getters.token,
                    },
                })
                .then(() => {
                    this.$store.commit("setLoginDefault");
                    window.location.reload('/');
                })
                .catch((err) => {
                    this.$store.commit("setLoading", false);
                    this.$toast.error(err.response.data.message);
                });
        },
    }
}
</script>


<style>
.background-product {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: auto;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    border: 1px solid rgb(230, 222, 222);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.img-productCon {
    width: 100%;
    margin-left: auto;
    margin-right: auto;

}

.img-productConDialog {
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    display: block;
}

.size-dialog {
    width: 50vw;
}

@media only screen and (max-width:768px) {
    .size-dialog {
        width: 80vw;
    }

}
</style>