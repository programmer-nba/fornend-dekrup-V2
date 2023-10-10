<template>
    <div class="container">
        <div class="flex justify-content-end" style="background: red;height: 60px; width: 100%;">
            <Button type="button" severity="danger" label="กลับไปยังหน้าล็อกอิน" icon="pi pi-power-off" :loading="loading"  @click="logout()" /><br>
        </div>
        <h1 class="text-center mt-2" style="-webkit-text-stroke: 1px;">ยืนยันบัตรประชาชนและบัญชีธนาคาร</h1>
        
        <div class="grid size-confirm" >
            <div class="col-12 lg:col-6"><Panel class="mt-3" header="STEP 2 : กรอกข้อมูลเลขบัญชีธนาคารของท่าน">
                    <div class="col-12">
                        <div class="field">
                            <span class="p-float-label">
                                <div>เลือกบัญชีธนาคารธนาคาร</div>
                                <div class="card flex justify-content-start">
                                    <Dropdown v-model="selectedCity" :options="cities" optionLabel="name"
                                        placeholder="เลือกบัญชีธนาคาร" class="w-full md:w-14rem" />
                                </div>
                                <div>กรอกเลขบัญชี</div>
                                <InputText inputClass="font"  placeholder="กรอกเลขบัญชี" />
                                <div>แนบรูปภาพบัญชีธนาคารของท่าน</div>
                                <FileUpload mode="basic" :auto="true" chooseLabel="แนบรูปภาพบัญชีของท่าน"
                                uploadIcon="pi pi-paperclip" @uploader="chooseImageBank" :customUpload="true"
                                v-if="bank_img === null" />
                                <div class="grid" v-if="img_previewBank !== null" >
                                    <div class="col-12">
                                        <Image :src="img_previewBank"  :preview="true" />
                                    </div>
                                    <div class="col-12 text-center">
                                        <Button label="ลบ" @click="clearImageBank()" icon="pi pi-trash" class="p-button-danger" />
                                    </div>
                                    
                                </div>
                            </span>
                        </div>
                    </div>
                </Panel>
            </div>
            <div class="col-12 lg:col-6">  <Panel class="mt-3" header="STEP 2 : กรอกข้อมูลบัตรประชาชนของท่าน">
                    <div class="col-12">
                        <div class="field">
                            <span class="p-float-label">
                                <div>กรอกเลขบัตรประชาชน</div>
                                <InputMask id="ssn" mask="9-9999-99999-99-9" placeholder="9-9999-99999-99-9" />
                                <div>แนบรูปภาพบัตรประชาชนของท่าน</div>
                                <FileUpload mode="basic" :auto="true" chooseLabel="แนบรูปภาพบัตรประชาชนของท่าน"
                                uploadIcon="pi pi-paperclip" @uploader="chooseImageMember" :customUpload="true"
                                v-if="member_img === null" />
                                <div class="grid" v-if="img_previewMember !== null">
                                    <div class="col-12">
                                        <Image :src="img_previewMember"  :preview="true" />
                                    </div>
                                    <div class="col-12 text-center">
                                        <Button label="ลบ" @click="clearImageMember()" icon="pi pi-trash" class="p-button-danger" />
                                    </div>
                                    
                                </div>
                               
                            </span>
                        </div>
                    </div>
                </Panel>
            </div>

            <Button label="ยืนยันข้อมูล"  class="p-button-danger w-full" />

            
              
        </div>


        <div class="footer">
</div>


    </div>
</template>







<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { Member } from "../../../service/member";
export default{
    data:() =>({
        checked:false,
        bank_img:null,
        member_img:null, 
        img_previewBank:null,
        img_previewMember:null, 
    }),
    setup() {
        const members = new Member();
        return { members }
    },
    methods:{

        clearImageBank(){
            this.img_previewBank = null;
            this.bank_img = null;
        },
        chooseImageBank(event){
            this.bank_img = event.files[0];
            this.img_previewBank = event.files[0].objectURL;
        },
        clearImageMember(){
            this.img_previewMember = null;
            this.member_img = null;
        },
        chooseImageMember(event){
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


        confirmBank(){
            this.$router.push("/member/dashboard");
        }


    

    }
}





</script>

<style>
.p-image-preview-container > img {
    cursor: pointer;
    width: 200px;
}
.p-image-preview-container:hover > .p-image-preview-indicator {
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
.size-confirm{
    width: 70%; 
    margin-left: auto; 
    margin-right: auto;
}

@media only screen and (max-width:776px) {
    .size-confirm{
    width: 90%; 
    margin-bottom: 200px;
}
.footer {
   margin-top: 80px;
}
}
</style>


