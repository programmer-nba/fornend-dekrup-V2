<template>
    <div class="img-login">
        <div class="background-login">
            <img class="img-logo" src="../assets/img/Deekrub.png" />
            <h2 class="text-center font-reset mb-3">สมัครสมาชิก</h2>
            <div class="grid">
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <InputText v-model="member.member_ref" label="รหัสผู้แนะนำ" variant="outlined" density="comfortable"
                            placeholder="กรอกเบอร์โทรศัพท์ผู้แนะนำ(ถ้ามี)" :disabled="ref_status" hide-details="auto"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');"
                            :append-inner-icon="(ref_status ? 'mdi-check' : '')" @change="checkRefMember" />
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <InputText v-model="member.name" placeholder="ชื่อ-นามสกุล" class="style-font" />
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-phone"></i>
                        </span>
                        <InputText v-model="member.tel" placeholder="เบอร์โทรศัพท์" class="style-font" />
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user-edit"></i>
                        </span>
                        <InputText v-model="member.username" placeholder="ยูสเซอร์เนม" class="style-font" />
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        <Password v-model="member.password" toggleMask placeholder="รหัสผ่าน" class="style-font" />
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        <Password v-model="member.confirm_password" toggleMask placeholder="ยืนยันรหัสผ่าน"
                            class="style-font" />
                    </div>
                </div>
                <div class="sm:col-12 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-map-marker"></i>
                        </span>
                        <InputText v-model="member.address" placeholder="ที่อยู่" class="style-font" />
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-map-marker"></i>
                        </span>
                        <div class="card flex justify-content-center">
                            <Dropdown v-model="province" class="w-full w-13rem sm:w-11rem md:w-12rem lg:w-14rem xl:w-16" inputClass="font"
                                :options="item_province" placeholder="เลือกจังหวัด" optionLabel="name_th" :filter="true"
                                filterPlaceholder="ค้นหาจังหวัด" @change="chooseProvince" />
                        </div>
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-map-marker"></i>
                        </span>
                        <div class="card flex justify-content-center">
                            <Dropdown v-model="amphure" class="w-full w-13rem sm:w-11rem md:w-12rem lg:w-14rem xl:w-16" inputClass="font"
                                :options="item_amphure" placeholder="เลือกเขต/จังหวัด" optionLabel="name_th" :filter="true"
                                filterPlaceholder="ค้นหาเขต/อำเภอ" @change="chooseAmphure" />
                        </div>
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-map-marker"></i>
                        </span>
                        <div class="card flex justify-content-center">
                            <Dropdown v-model="tambon" class="w-full w-13rem sm:w-11rem md:w-12rem lg:w-14rem xl:w-16" inputClass="font"
                                :options="item_tambon" placeholder="เลือกตำบล" @change="chooseToDistrict"
                                optionLabel="name_th" :filter="true" filterPlaceholder="ค้นหาแขวง/ตำบล" />
                        </div>
                    </div>
                </div>
                <div class="sm:col-6 col-12">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-map-marker"></i>
                        </span>
                        <div class="card flex justify-content-center">
                            <InputText v-model="postcode" class="w-full w-13rem sm:w-11rem md:w-12rem lg:w-14rem xl:w-16" :disabled="isDisabled"
                                placeholder="รหัสไปรษณ์" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-content-center">
                <Button label="สมัครสมาชิก" style="font-family: 'Kanit', sans-serif;   width: -webkit-fill-available;"
                    class="button-login mt-5" severity="danger" @click="confirm()" />
            </div>
        </div>
    </div>
</template>
    
<script>
import Dropdown from 'primevue/dropdown';
import Password from "primevue/password";
import Button from "primevue/button";

import axios from 'axios';

export default {
    created() {
        document.title = "สมัครสมาชิก | Dekrub Shop";
    },
    async mounted() {
        this.$store.commit('setLoading', true);
        await axios.get(`${process.env.VUE_APP_THAILAND}thailand/province`, {
            headers: {
                'auth-token': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            this.item_province = res.data;
            this.$store.commit('setLoading', false);
        }).catch((err) => {
            console.log(err);
            this.$store.commit('setLoading', false);
            this.$toast.add({
                severity: "error",
                summary: "ไม่สำเร็จ",
                detail: err.response.data.message,
                life: 3000,
            });
        })
    },
    components: {
        Dropdown,
        Password,
        Button
    },
    data: () => ({
        isLoading: false,
        isDisabled: false,

        item_province: [],
        item_amphure: [],
        item_tambon: [],

        province: null,
        amphure: null,
        tambon: null,
        postcode: '',

        member: {
            member_ref: '',
            name: '',
            username: '',
            password: '',
            confirm_password: '',
            tel: '',
            address: '',
            subdistrict: '',
            district: '',
            province: '',
            postcode: '',
        },

        ref_status: false

    }),

    methods: {
        async checkRefMember() {
            if (this.member.member_ref !== '') {
                await axios.get(`${process.env.VUE_APP_DEKRUP}/public/member/check/${this.member.member_ref}`, {
                }).then((res) => {
                    this.$toast.add({ severity: 'success', summary: res.data.data.name, detail: `${res.data.data.address}, ${res.data.data.subdistrict} ${res.data.data.district} ${res.data.data.province} ${res.data.data.postcode}`, life: 7000 })
                }).catch((err) => {
                    console.log(err);
                    this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'เบอร์นี้ยังไม่ได้สมัครแพลตฟอร์ม ไม่สามารถรับค่าคอมมิชชั่นได้ กรุณาแจ้งให้พาร์ทเนอร์สมัครแพลตฟอร์ม', life: 5000 })
                })
            }
        },

        clear() {
            this.province = null;
            this.district = null;
            this.subdistrict = null;
            this.postcode = '';
            this.item_subdistrict = [];
            this.item_district = [];
        },
        async chooseProvince(evt) {
            this.member.province = evt.value.name_th;
            await axios.get(`${process.env.VUE_APP_THAILAND}thailand/amphure/by-province-id/${evt.value.id}`, {
                headers: {
                    'auth-token': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                this.item_amphure = res.data;
                this.item_tambon = [];
                this.member.district = null;
                this.amphure = null;
                this.tambon = null;
            });
        },
        async chooseAmphure(evt) {
            await axios.get(`${process.env.VUE_APP_THAILAND}thailand/tambon/by-amphure-id/${evt.value.id}`, {
                headers: {
                    'auth-token': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                this.item_tambon = res.data;
                this.member.district = null;
                this.tambon = null;
            })
        },
        chooseToDistrict(evt) {
            this.district = evt.value;
            this.postcode = evt.value.zip_code;
        },
        async checkPlatform() {
            await axios.get(`${process.env.VUE_APP_PLATFORM}public/member/check/${this.tel_platform}`, {
                headers: {
                    'auth-token': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                this.$toast.add({ severity: 'success', summary: res.data.data.name, detail: `${res.data.data.address}, ${res.data.data.subdistrict} ${res.data.data.district} ${res.data.data.province} ${res.data.data.postcode}`, life: 7000 })
            }).catch((err) => {
                console.log(err);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'เบอร์นี้ยังไม่ได้สมัครแพลตฟอร์ม ไม่สามารถรับค่าคอมมิชชั่นได้ กรุณาแจ้งให้พาร์ทเนอร์สมัครแพลตฟอร์ม', life: 5000 })
            })
        },

        confirm() {
            if (
                this.member.member_ref === '' ||
                this.member.name === '' ||
                this.member.username === '' ||
                this.member.tel === '' ||
                this.province === null ||
                this.amphure === null ||
                this.tambon === null ||
                this.postcode === ''
            ) {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "กรุณากรอกข้อมูลทั่วไปให้ครบถ้วน",
                    life: 3000,
                });
                return false;
            }
            if (this.member.password.length < 8) {
                this.toast.info('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษรขึ้นไป')
                return false;
            }
            //check password
            if (this.member.password === '' || this.member.confirm_password === '') {
                this.toast.info('กรุณากำหนดและยืนยันรหัสผ่าน');
                return false;
            }
            if (this.member.password !== this.member.confirm_password) {
                this.toast.info('รหัสผ่านไม่ตรงกัน')
                return false;
            }
            const member_data = {
                member_ref: this.member.member_ref,
                name: this.member.name,
                username: this.member.username,
                password: this.member.password,
                tel: this.member.tel,
                address: this.member.address,
                subdistrict: this.tambon.name_th,
                district: this.amphure.name_th,
                province: this.province.name_th,
                postcode: this.postcode,
            }
            this.$confirm.require({
                messagr: "ยืนยันข้อมูลและสมัครสมาชิกตอนนี้?",
                header: "ยืนยันข้อมูล",
                icon: "warn",
                acceptLabel: "ตกลง",
                rejectLabel: "ยกเลิก",
                accept: async () => {
                    this.isLoading = true;
                    await axios
                        .post(`${process.env.VUE_APP_DEKRUP}/register`, member_data, {
                        }).then(() => {
                            this.isLoading = false;
                            this.$toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "ทำการสมัครสมาชิกเรียบร้อยแล้ว",
                                life: 3000,
                            })
                            this.$router.push("/login");
                        }).catch((err) => {
                            this.isLoading = false;
                            if (err.response.status === 408) {
                                window.location.reload();
                            }
                            this.$toast.add({
                                severity: "error",
                                summary: "ไม่สำเร็จ",
                                detail: err.response.data.message,
                                life: 3000,
                            });
                        });
                }
            })
        },
    }
}


</script>
  
      
<style scoped>


.style-font {
    font-family: 'Kanit', sans-serif;

}

.img-login {
    width: 100%;
    background: url("../assets/img/backgrond.jpg");
    height: 100vh;
    background-size: cover;
    /* This will cover the entire container */
    background-repeat: no-repeat;
    background-position: center center;
    /* Center the image horizontally and vertically */
    display: flex;
    align-items: center;

}

.background-login {
    background: rgb(255, 255, 255);
    margin-left: auto;
    margin-right: 3%;
    padding: 3%;
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 25px;
    border: 3px solid #ffff;
    width: 40%;
}

.font-reset {
    color: #ec0606;
    -webkit-text-stroke: 0.5px;
}

.img-logo {
    width: 100px;
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 5%;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
}

.p-inputgroup-addon {
    background: #ff0000;
    color: #ffffff;
    border-top: 1px solid #ff0000;
    border-left: 1px solid #ff0000;
    border-bottom: 1px solid #ff0000;
    padding: 0.75rem 0.75rem;
    min-width: 3rem;
}
@media only screen and (max-width: 1850px) {
    .background-login {
        width: 42%;
    }


}
@media only screen and (max-width: 1750px) {
    .background-login {
        width: 45%;
    }


}
@media only screen and (max-width: 1580px) {
    .background-login {
        width: 50%;
    }


}
@media only screen and (max-width: 1350px) {
    .background-login {
        margin-left: auto;
        margin-right: auto;
        width: 60%;
        background: #ffffffde;
    }
}
@media only screen and (max-width: 1140px) {
    .background-login {
        width: 70%;
    }
}

@media only screen and (max-width: 650px) {
    .background-login {
        width: 85%;
    }
}

@media only screen and (max-width: 576px) {
    .img-login {
        width: 100%;
        height: auto;
    }

    .background-login {
        width: 80%;
        margin-top: 5%;
    }
}
</style>