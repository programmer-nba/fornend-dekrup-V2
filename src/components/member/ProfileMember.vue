<template>
    <div>
        <div class="grid mt-3">
            <div class="col-12">
                <h1 class="text-center">โปรไฟล์ของฉัน</h1>
            </div>
        </div>
        <div class="grid ml-2">
            <div class="col-12 lg:col-6">
                <Panel header="ข้อมูลทั่วไป" class="custom-header-panel font-profile">
                    <p><strong>ยูสเซอร์เนม : </strong>{{ username }}</p>
                    <p><strong>รหัสสมาชิก : </strong>{{ member_number }}</p>
                    <p><strong>ชื่อ-นามสกุล :</strong> {{ name }}</p>
                    <p><strong>เบอร์โทร : </strong>{{ tel }}</p>
                    <p><strong>ที่อยู่ : </strong>{{ address }} {{ subdistrict }} {{ district }} {{ province }} {{
                        postcode }}</p>
                    <p><strong>สถานะผู้ใช้ : </strong>{{ position }}</p>
                    <p><strong>บัตรประจำตัวประชาชน : </strong>{{ status_iden }}</p>
                    <p><strong>หน้าสมุดบัญชีธนาคาร : </strong>{{ status_bank }}</p>
                    <br>
                    <p>------ Commission (สะสม) ------</p>
                    <p><strong>รายได้ค่าคอมมิชชั่น (150 บาท) : </strong>{{ getCommissionDay(member_number) }} บาท</p>
                    <p><strong>รายได้ค่าคอมมิชชั่น (10 บาท) : </strong>{{ getCommissionWeek(member_number) }} บาท</p>
                    <p><strong>รายได้ค่าบริหาร (75 บาท) : </strong>{{ getComAdminister(member_number) }} บาท</p>
                    <p><strong>ยอดสะสมรวม : </strong>{{ getComTotal(member_number) }} บาท</p>
                    <br>
                    <p>------ Commission (วันที่ {{ datetimeFormat(day) }}) ------</p>
                    <p><strong>รายได้ค่าคอมมิชชั่น (150 บาท) : </strong>{{ getCommissionDay1(member_number) }} บาท</p>
                    <p><strong>รายได้ค่าคอมมิชชั่น (10 บาท) : </strong>{{ getCommissionWeek1(member_number) }} บาท</p>
                    <p><strong>รายได้ค่าบริหาร (75 บาท) : </strong>{{ getComAdminister1(member_number) }} บาท</p>
                    <p><strong>ยอดสะสมรวม : </strong>{{ getComTotal1(member_number) }} บาท</p>
                </Panel>
            </div>
            <div class="col-12 lg:col-6">
                <Panel header="เปลี่ยนรหัสผ่าน" class="custom-header-panel">
                    <div class="grid ">
                        <div class="col-12">
                            <div class="field">
                                <label>เปลี่ยนรหัสผ่านใหม่ :</label>
                                <Password v-model="password" inputClass="font" inputStyle="width: 100%;" class="w-full"
                                    placeholder="กรอกรหัสผ่านที่ต้องการเปลี่ยน" />
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-12">
                            <div class="field">
                                <label>ยืนยันรหัสผ่านใหม่อีกครั้ง :</label>
                                <InputText type="password" v-model="confirm_password" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                                    class="font w-full" />
                            </div>
                        </div>
                    </div>
                    <Button label="เปลี่ยนรหัสผ่าน" class="bg-red-500 border-none" @click="confirm()" />
                </Panel>
            </div>

            <div class="col-12 lg:col-6 xl:col-3">
                <Panel header="ท่านยังไม่ได้ยืนยันสมุดบัญชีธนาคาร" class="custom-header-panel font-profile"
                    v-if="status_bank === ''">
                    <div class="col-12">
                        <Message><strong>เวลาทำการ : </strong> เวลาทำการตรวจสอบ ทุกวัน เวลา 9.00 น. ถึง 18.00 น.
                            หากนอกเวลาทำการจะทำการตรวจสอบในเวลาทำการของวันถัดไป</Message>
                    </div>
                    <div class="col-12">
                        <div class="field">
                            <span class="p-float-label">
                                <div>กรอกชื่อบัญชีธนาคารธนาคาร</div>
                                <div class="card flex justify-content-start">
                                    <InputText v-model="bank" inputClass="font" placeholder="กรอกธนาคาร" />
                                </div>
                                <div>กรอกเลขบัญชี</div>
                                <InputText v-model="bank_number" inputClass="font" placeholder="กรอกเลขบัญชี" />
                                <div>แนบรูปภาพบัญชีธนาคารของท่าน</div>
                                <FileUpload mode="basic" :auto="true" chooseLabel="แนบรูปภาพบัญชีของท่าน"
                                    uploadIcon="pi pi-paperclip" @uploader="chooseImageBank" :customUpload="true"
                                    v-if="bank_img === null" />
                                <div class="grid" v-if="img_previewBank !== null">
                                    <div class="col-12">
                                        <Image :src="img_previewBank" :preview="true" />
                                    </div>
                                    <div class="col-12 text-center">
                                        <Button label="ลบ" @click="clearImageBank()" icon="pi pi-trash"
                                            class="p-button-danger" />
                                    </div>
                                </div>
                                <br>
                                <div class="grid">
                                    <div class="col-12 text-center">
                                        <Button label="ยืนยัน" @click="confirmBank()" />
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </Panel>
                <Panel header="ยืนยันสมุดบัญชีธนาคาร" class="custom-header-panel font-profile"
                    v-if="status_bank === 'อยู่ระหว่างการตรวจสอบ'">
                    <Message style="color: red; -webkit-text-stroke: 1px;" class="mb-2"><strong>สถานะการตรวจสอบ :
                        </strong>ท่านได้แนบสมุดบัญชีแล้ว เจ้าหน้าที่กำลังตรวจสอบ </Message>
                    <Message><strong>เวลาทำการ : </strong>รอตรวจสอบจากเจ้าหน้าที่ เวลาทำการตรวจสอบ ทุกวัน เวลา 9.00 น. ถึง
                        18.00 น.
                        หากนอกเวลาทำการจะทำการตรวจสอบในเวลาทำการของวันถัดไป</Message>
                </Panel>
                <Panel header="สมุดบัญชีธนาคาร" class="custom-header-panel font-profile text-center"
                    v-if="status_bank === 'ยืนยันเรียบร้อยแล้ว'">
                    <Image :src="getImage(image_bank)" preview />
                </Panel>
            </div>
            <div class="col-12 lg:col-6 xl:col-3 ">
                <Panel header="ท่านยังไม่ได้ยืนยันบัตรประชาชน" class="custom-header-panel font-profile"
                    v-if="status_iden === ''">
                    <div class="col-12">
                        <Message><strong>เวลาทำการ : </strong> เวลาทำการตรวจสอบ ทุกวัน เวลา 9.00 น. ถึง 18.00 น.
                            หากนอกเวลาทำการจะทำการตรวจสอบในเวลาทำการของวันถัดไป</Message>
                    </div>
                    <div class="col-12">
                        <div class="field">
                            <span class="p-float-label">
                                <div>กรอกเลขบัตรประชาชน</div>
                                <InputText v-model="iden_number" inputClass="font"
                                    placeholder="กรอกเลขบัตรประจำตัวประชาชน" />
                                <div>แนบรูปภาพบัตรประชาชนของท่าน</div>
                                <FileUpload mode="basic" :auto="true" chooseLabel="แนบรูปภาพบัตรประชาชนของท่าน"
                                    uploadIcon="pi pi-paperclip" @uploader="chooseImageMember" :customUpload="true"
                                    v-if="member_img === null" />
                                <div class="grid" v-if="img_previewMember !== null">
                                    <div class="col-12">
                                        <Image :src="img_previewMember" :preview="true" />
                                    </div>
                                    <div class="col-12 text-center">
                                        <Button label="ลบ" @click="clearImageMember()" icon="pi pi-trash"
                                            class="p-button-danger" />
                                    </div>
                                </div>
                                <br>
                                <div class="grid">
                                    <div class="col-12 text-center">
                                        <Button label="ยืนยัน" @click="confirmIden()" />
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </Panel>
                <Panel header="อยู่ระหว่างการตรวจสอบ" class="custom-header-panel font-profile"
                    v-if="status_iden === 'อยู่ระหว่างการตรวจสอบ'">
                    <Message style="color: red; -webkit-text-stroke: 1px;" class="mb-2"><strong>สถานะการตรวจสอบ :
                        </strong>ท่านได้แนบบัตรประชาชนแล้ว เจ้าหน้าที่กำลังตรวจสอบ </Message>
                    <Message><strong>เวลาทำการ : </strong>รอตรวจสอบจากเจ้าหน้าที่ เวลาทำการตรวจสอบ ทุกวัน เวลา 9.00 น. ถึง
                        18.00 น.
                        หากนอกเวลาทำการจะทำการตรวจสอบในเวลาทำการของวันถัดไป</Message>
                </Panel>
                <Panel header="บัตรประชาชน" class="custom-header-panel font-profile text-center"
                    v-if="status_iden === 'ยืนยันเรียบร้อยแล้ว'">
                    <Image :src="getImage(image_iden)" preview />
                </Panel>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { Member } from "../../service/member";
import { Withdraw } from "../../service/commission.withdraw";
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
export default ({
    created() {
        document.title = "Profile Member | Dekrub Shop";
    },
    components: {
        Member,
    },
    setup() {
        const members = new Member();
        const commission = new Withdraw();
        return { members, commission }
    },
    async beforeCreate() {
        this.$store.commit('setLoading', true);
        await axios
            .get(`${process.env.VUE_APP_DEKRUP}/me`, {
                headers: {
                    'token': localStorage.getItem('token'),
                },
            })
            .then(async (res) => {
                const decode = await jwtDecode(localStorage.getItem("token"));
                const data_login = {
                    logedIn: true,
                    username: res.data.data.username,
                    name: res.data.data.name,
                    member_number: res.data.data.member_number,
                    tel: res.data.data.tel,
                    address: res.data.data.address,
                    subdistrict: res.data.data.subdistrict,
                    district: res.data.data.district,
                    province: res.data.data.province,
                    postcode: res.data.data.postcode,
                    commission_day: res.data.data.commission_day,
                    commission_week: res.data.data.commission_week,
                    position: res.data.data.position,

                    id: decode._id,

                    status_bank: res.data.data.bank.remark,
                    image_bank: res.data.data.bank.image,
                    status_iden: res.data.data.iden.remark,
                    image_iden: res.data.data.iden.image,
                };
                this.$store.commit("setLogin", data_login);
                this.$store.commit('setLoading', false);
                this.name = data_login.name;
                this.username = data_login.username;
                this.member_number = data_login.member_number;
                this.tel = data_login.tel;
                this.address = data_login.address;
                this.subdistrict = data_login.subdistrict;
                this.district = data_login.district;
                this.province = data_login.province;
                this.postcode = data_login.postcode;
                this.commission_day = data_login.commission_day;
                this.commission_week = data_login.commission_week;
                this.position = data_login.position;
                this.status_bank = data_login.status_bank;
                this.status_iden = data_login.status_iden;
                this.image_bank = data_login.image_bank;
                this.image_iden = data_login.image_iden;
            })
            .catch(() => {
                localStorage.clear();
                this.$store.commit('setLoading', false);
                this.$store.commit("setDefaultLogin");
                this.$router.push("/login");
            });
    },

    async mounted() {
        await this.getComission();
    },

    data: () => ({
        name: '',
        username: '',
        member_number: '',
        tel: '',
        address: '',
        subdistrict: '',
        district: '',
        province: '',
        postcode: '',
        commission_day: '',
        commission_week: '',
        position: '',

        com_day: [],
        com_week: [],
        com_administer: [],

        password: null,
        confirm_password: null,

        bank_img: null,
        member_img: null,
        img_previewBank: null,
        img_previewMember: null,

        bank_number: '',
        iden_number: '',
        bank: '',

        status_bank: '',
        image_bank: '',
        status_iden: '',
        image_iden: '',

        day: dayjs(Date.now()),
    }),

    methods: {
        async confirm() {
            if (this.password.length < 8) {
                this.toast.info('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษรขึ้นไป')
                return false;
            }
            //check password
            if (this.password === '' || this.confirm_password === '') {
                this.toast.info('กรุณากำหนดและยืนยันรหัสผ่าน');
                return false;
            }
            if (this.password !== this.confirm_password) {
                this.toast.info('รหัสผ่านไม่ตรงกัน')
                return false;
            }
            const new_password = {
                password: this.password,
            }
            console.log(new_password);
            await this.members.setPassword(new_password).then(async (result) => {
                if (result) {
                    console.log(result);
                    this.loading = false;
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "สมัครสมาชิกสำเร็จ",
                        life: 3000,
                    })
                    window.location.reload('/member/profile');
                }
            })
        },

        async getComission() {
            this.$store.commit('setLoading', true);
            await this.commission.GetComRegisterDay().then(result => {
                const order = result.data;
                this.com_day = order.reverse();
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })

            await this.commission.GetComRegisterWeek().then(result => {
                const order = result.data;
                this.com_week = order.reverse();
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })

            await this.commission.GetComAdminister().then(result => {
                const order = result.data;
                this.com_administer = order.reverse();
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })
        },

        getImage(item) {
            return "https://drive.google.com/uc?export=view&id=" + item;
        },

        clearImageBank() {
            this.img_previewBank = null;
            this.bank_img = null;
        },
        chooseImageBank(event) {
            this.bank_img = event.files[0];
            this.img_previewBank = event.files[0].objectURL;
        },
        clearImageMember() {
            this.img_previewMember = null;
            this.member_img = null;
        },
        chooseImageMember(event) {
            this.member_img = event.files[0];
            this.img_previewMember = event.files[0].objectURL;
        },

        datetimeFormat(date) {
            return dayjs(date).format("DD/MM/YYYY");
        },

        async confirmBank() {
            this.loading = true;
            if (!this.bank_img) {
                // ถ้ายังไม่มีรูปภาพแนบ
                Swal.fire('แจ้งเตือน', 'กรุณาแนบรูปหน้าสมุดบัญชีของท่าน', 'warning');
                this.loading = false;
                return;
            }

            if (!this.bank_number) {
                Swal.fire('แจ้งเตือน', 'กรุณากรอกเลขที่บัญชีของท่าน', 'warning');
                this.loading = false;
                return;
            }

            if (!this.bank) {
                Swal.fire('แจ้งเตือน', 'กรุณาเลือกธนาคารของท่าน', 'warning');
                this.loading = false;
                return;
            }

            const formData = new FormData();
            formData.append('bank_image', this.bank_img);
            formData.append('name', this.bank);
            formData.append('number', this.bank_number);

            await this.members.AddBank(formData).then(async (result) => {
                if (result) {
                    console.log(result);
                    Swal.fire({
                        title: 'แนบรูปสมุดบัญชีเรียบร้อย',
                        text:
                            'รอการตรวจสอบจากส่วนกลางในวันเวลาทำการภายใน 10-15 นาที',
                        showConfirmButton: true,
                    })
                }
            });
        },

        async confirmIden() {
            this.loading = true;

            if (!this.member_img) {
                // ถ้ายังไม่มีรูปภาพแนบ
                Swal.fire('แจ้งเตือน', 'กรุณาแนบบัตรประจำตัวประชาชน', 'warning');
                this.loading = false;
                return;
            }

            if (!this.iden_number) {
                Swal.fire('แจ้งเตือน', 'กรุณากรอกเลขบัตรประจำตัวประชาชน', 'warning');
                this.loading = false;
                return;
            }

            const formData = new FormData();
            formData.append('iden_image', this.member_img);
            formData.append('number', this.iden_number);

            await this.members.AddIden(formData).then(async (result) => {
                if (result) {
                    console.log(result);
                    Swal.fire({
                        title: 'แนบรูปบัตรประจำตัวประชาชนเรียบร้อย',
                        text:
                            'รอการตรวจสอบจากส่วนกลางในวันเวลาทำการภายใน 10-15 นาที',
                        showConfirmButton: true,
                    })
                }
            });
        },

        getCommissionDay(item) {
            const id = item;
            const list = this.com_day.filter(
                (item) => item.data[0].member_number === id
            )
            const total_com_day = list.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_day;
        },

        getCommissionDay1(item) {
            const id = item;
            const list = this.com_day.filter(
                (item) => item.data[0].member_number === id
            )
            const day = list.filter(
                (item) => this.datetimeFormat(item.timestamp) === this.datetimeFormat(this.day)
            )
            const total_com_day = day.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_day;
        },

        getCommissionWeek(item) {
            const id = item;
            const list = this.com_week.filter(
                (item) => item.data[0].member_number === id
            )
            const total_com_week = list.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_week;
        },

        getCommissionWeek1(item) {
            const id = item;
            const list = this.com_week.filter(
                (item) => item.data[0].member_number === id
            )
            const day = list.filter(
                (item) => this.datetimeFormat(item.timestamp) === this.datetimeFormat(this.day)
            )
            const total_com_week = day.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_week;
        },

        getComAdminister(item) {
            const id = item;
            const list = this.com_administer.filter(
                (item) => item.data[0].member_number === id
            )
            const total_com_administer = list.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_administer;
        },

        getComAdminister1(item) {
            const id = item;
            const list = this.com_administer.filter(
                (item) => item.data[0].member_number === id
            )
            const day = list.filter(
                (item) => this.datetimeFormat(item.timestamp) === this.datetimeFormat(this.day)
            )
            const total_com_administer = day.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            return total_com_administer;
        },

        getComTotal(item) {
            const id = item;
            const list1 = this.com_day.filter(
                (item) => item.data[0].member_number === id
            )
            const list2 = this.com_week.filter(
                (item) => item.data[0].member_number === id
            )
            const list3 = this.com_administer.filter(
                (item) => item.data[0].member_number === id
            )
            const total_com_day = list1.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total_com_week = list2.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total_com_administer = list3.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total = total_com_day + total_com_week + total_com_administer;
            return total;
        },

        getComTotal1(item) {
            const id = item;
            const list1 = this.com_day.filter(
                (item) => item.data[0].member_number === id
            )
            const day1 = list1.filter(
                (item) => this.datetimeFormat(item.timestamp) === this.datetimeFormat(this.day)
            )
            const list2 = this.com_week.filter(
                (item) => item.data[0].member_number === id
            )
            const day2 = list2.filter(
                (item) => this.datetimeFormat(item.timestamp) === this.datetimeFormat(this.day)
            )
            const list3 = this.com_administer.filter(
                (item) => item.data[0].member_number === id
            )
            const day3 = list3.filter(
                (item) => this.datetimeFormat(item.timestamp) === this.datetimeFormat(this.day)
            )
            const total_com_day = day1.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total_com_week = day2.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total_com_administer = day3.reduce((sum, item) => sum + item.data[0].remainding_commission, 0);
            const total = total_com_day + total_com_week + total_com_administer;
            return total;
        },
    }
})
</script>




<style >
.custom-header-panel .p-panel-header {
    background-color: #FE0000;
    color: aliceblue;
    border: none;
}

.font-profile {
    -webkit-text-stroke: 1px;
    color: rgb(95, 93, 93);
}

/* .custom-header-panel .p-panel-content {
    color: #FE0000;
} */

.p-image-preview-container>img {
    cursor: pointer;
    width: 200px;
}

.p-image-preview-container:hover>.p-image-preview-indicator {
    opacity: 1;
    cursor: pointer;
    width: 200px;
}

.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    text-align: center;
    height: 60px;

}

.size-confirm {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}

@media only screen and (max-width:776px) {
    .size-confirm {
        width: 90%;
        margin-bottom: 200px;
    }

    .footer {
        margin-top: 80px;
    }
}</style>