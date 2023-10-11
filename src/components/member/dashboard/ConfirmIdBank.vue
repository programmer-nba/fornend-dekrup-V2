<template>
    <div class="container">
        <div class="flex justify-content-end" style="background: red;height: 60px; width: 100%;">
            <Button type="button" severity="danger" label="กลับไปยังหน้าล็อกอิน" icon="pi pi-power-off" :loading="loading"
                @click="logout()" /><br>
        </div>
        <h1 class="text-center mt-2" style="-webkit-text-stroke: 1px;">ยืนยันบัตรประชาชนและบัญชีธนาคาร</h1>

        <div class="grid size-confirm">
            <div class="col-12 lg:col-6">
                <Panel class="mt-3" header="STEP 2 : กรอกข้อมูลเลขบัญชีธนาคารของท่าน">
                    <div class="col-12">
                        <div class="field">
                            <span class="p-float-label">
                                <div>เลือกบัญชีธนาคารธนาคาร</div>
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
            </div>
            <div class="col-12 lg:col-6">
                <Panel class="mt-3" header="STEP 2 : กรอกข้อมูลบัตรประชาชนของท่าน">
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
            </div>
            
        </div>
       
     
        <Button label="ทำรายการถัดไป" class="p-button-danger mt-5" style="width: 150px; margin-left: auto;margin-right: auto;display: block;" @click="confirm()" /><br>     
        <div class="text-center" style="color: red; font-size: 20; -webkit-text-stroke: 1px;">
            <div>*** หากท่านยืนยันบัญชีและยืนยันบัตรประชาชนแล้วกรุณากด ทำรายการถัดไป *** </div>
        </div>


    </div>
</template>



<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { Member } from "../../../service/member";
export default {
    data: () => ({
        checked: false,
        bank_img: null,
        member_img: null,
        img_previewBank: null,
        img_previewMember: null,

        bank_number: '',
        iden_number: '',
        bank: '',
    }),
    setup() {
        const members = new Member();
        return { members }
    },
    methods: {

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

        async confirm(){
            this.$router.push("/member/dashboard");
        }

    }
}





</script>

<style>
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
}
</style>


