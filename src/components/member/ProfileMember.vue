<template>
    <div>
        <div class="grid mt-3">
            <div class="col-12">
                <h1 class="text-center">โปรไฟล์ของฉัน</h1>
            </div>
        </div>
        <div class="grid ml-2">
            <div class="col-12 lg:col-6">
                <Panel header="ข้อมูลทั่วไป" class="custom-header-panel">
                    <p><strong>ยูสเซอร์เนม :</strong></p>
                    <Divider type="dashed"></Divider>
                    <p><strong>ชื่อ-นามสกุล :</strong> {{ name }}</p>
                    <Divider type="dashed"></Divider>
                    <p><strong>เบอร์โทร : </strong></p>
                    <Divider type="dashed"></Divider>

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
                    position: res.data.data.position,
                    name: res.data.data.name,
                    id: decode._id,
                };
                this.$store.commit("setLogin", data_login);
                this.$store.commit('setLoading', false);
                console.log(data_login);
                this.name = data_login.name;
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

/* .custom-header-panel .p-panel-content {
    color: #FE0000;
} */
</style>