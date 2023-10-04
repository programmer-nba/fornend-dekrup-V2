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
                <Message><strong>หมายเหตุ : </strong> หากท่านทำการส่งข้อมูลแจ้งชำระเงินเรียบร้อยแล้ว กรุณารอการยืนยันจากเจ้าหน้าที่ 10-15 นาที เพื่อทำการเข้าสู่ระบบ</Message>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 lg:col-3">
                <Panel header="STEP 1 : Package เริ่มต้น">
                    <div class="grid">
                        <div class="col-12" v-if="this.amount === 0">
                            <DataView :value="item_product">
                                <template #list="slotProps">
                                    <div class="col-12">
                                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                                            <div
                                                class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                                    <div class="text-2xl font-bold text-900">
                                                        {{ slotProps.data.name }}
                                                    </div>
                                                    <div class="text-1xl font-bold text-500">
                                                        {{ slotProps.data.detail }}
                                                    </div>
                                                </div>
                                                <div
                                                    class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                                    <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                                                    <Button icon="pi pi-shopping-cart"
                                                        @click="addprice(slotProps.data.price)"></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </DataView>

                        </div>
                        <div v-else>
                            <Message><strong>หมายเหตุ : </strong>กรุณาแสกน QR Code ด้านล่างเพื่อชำระเงิน พร้อมแนบสลิป
                            </Message>
                            <Image :src="require('../../../assets/QRdekrub.jpg')" :preview="true" imageClass="w-full" />
                        </div>
                    </div>
                </Panel>
            </div>
            <div class="col-12 lg:col-3">
                <Panel header="STEP 2 : โอนเงินเข้าบัญชีบริษัท">
                    <div class="grid">
                        <div class="col-12">
                            <!-- <Image :src="require('@/assets/img/scb_bank.jpg')" :preview="true" imageClass="w-full" /> -->
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
                            <Checkbox v-model="checked" :binary="true" /> ยอมรับเงื่อนไขการและข้อความแจ้งเตือนข้างต้น
                            <!-- <Button label="เงื่อนไขและข้อตกลง" class="p-button-text p-0 m-0" /> -->
                        </div>
                        <div class="col-12">
                            <Button label="ส่งข้อมูลแจ้งชำระเงิน" icon="pi pi-send" @click="confirm()" />
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Member } from "../../../service/member";
export default {
    components: {
        Member,
    },
    setup() {
        const members = new Member();
        return { members }
    },
    async created() {
        await axios.get(`${process.env.VUE_APP_DEKRUP}/me`, {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        }).catch((err) => {
            if (err.response.status === 408) {
                localStorage.clear();
                window.location.reload();
            }
        })
        await axios.get(`${process.env.VUE_APP_DEKRUP}/product/member/list`, {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            this.item_product = res.data.data;
        })
            .catch((err) => {
                if (err.response.status === 408) {
                    localStorage.clear();
                    window.location.reload();
                }
            })
        document.title = "ชำระเงิน Package เริ่มต้น"
    },
    data: () => ({
        member_number: '',
        amount: 0,
        slip_img: null,
        img_preview: null,
        checked: false,
        item_product: [],
    }),
    methods: {
        clearImage() {
            this.img_preview = null;
            this.slip_img = null;
        },
        chooseImage(event) {
            this.slip_img = event.files[0];
            this.img_preview = event.files[0].objectURL;
        },

        async addprice(item) {
            this.amount = item;
        },

        async clearprice() {
            this.amount = 0;
        },

        async confirm() {
            this.loading = true;
            if (this.slip_img) {
                const data = {
                    member_number: this.$store.getters.member_number,
                    name: this.$store.getters.name,
                    amount: this.amount,
                }
                const formData = new FormData();
                formData.append('member_number', this.$store.getters.member_number);
                formData.append('name', this.$store.getters.name);
                formData.append('amount', this.amount);
                formData.append('imgCollection', this.slip_img);
                console.log(data)
                await this.members.orderNewMember(formData).then(async (result) => {

                    if (result) {
                        console.log(result);
                        this.loading = false;
                        this.$toast.add({
                            severity: "success",
                            summary: "สำเร็จ",
                            detail: "แจ้งชำระเงินเรียบร้อย รอการตรวจสอบจากส่วนกลางในวันเวลาทำการภายใน 10-15 นาที",
                            life: 3000,
                        })
                        this.$store.commit("setLoginDefault");
                        window.location.reload('/');
                    }
                })
            }
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

<style></style>