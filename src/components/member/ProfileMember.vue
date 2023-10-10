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
                    <p><strong>ที่อยู่ : </strong>{{ address }} {{ subdistrict }} {{ district }} {{ province }} {{ postcode
                    }}</p>
                    <p><strong>รายได้ค่าคอมมิชชั่น : </strong>{{ commission_day }}</p>
                    <p><strong>รายได้ค่าบริหาร : </strong>{{ commission_week }}</p>
                    <p><strong>สถานะผู้ใช้ : </strong>{{ position }}</p>
                </Panel>
            </div>
            <div class="col-12 lg:col-6">
                <Panel header="สมุดบัญชีธนาคาร" class="custom-header-panel font-profile">

                </Panel>
            </div>
            <div class="col-12 lg:col-6">
                <Panel header="บัตรประชาชน" class="custom-header-panel font-profile">
                    <div class="col-12">
                        <Message><strong>เวลาทำการ : </strong> เวลาทำการตรวจสอบ ทุกวัน เวลา 9.00 น. ถึง 18.00 น.
                            หากนอกเวลาทำการจะทำการตรวจสอบในเวลาทำการของวันถัดไป</Message>
                    </div>
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
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { Member } from "../../service/member";
export default ({
    created() {
        document.title = "ข้อมูลสมาชิก | Dekrub Shop";
    },
    components: {
        Member,
    },
    setup() {
        const members = new Member();
        return { members }
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
                };
                this.$store.commit("setLogin", data_login);
                this.$store.commit('setLoading', false);
                console.log(data_login);
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
            })
            .catch(() => {
                localStorage.clear();
                this.$store.commit('setLoading', false);
                this.$store.commit("setDefaultLogin");
                this.$router.push("/login");
            });
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

        password: null,
        confirm_password: null,
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
        }
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
} */</style>