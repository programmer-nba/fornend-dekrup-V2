<template>
    <div class="container">
        <div class="flex justify-content-end" style="background: red;height: 60px; width: 100%;">
            <Button type="button" severity="danger" label="กลับไปยังหน้าล็อกอิน" icon="pi pi-power-off" :loading="loading"
                @click="logout()" /><br>
        </div>
        <h1 class="text-center mt-2" style="-webkit-text-stroke: 1px;">เงื่อนไขการใช้งาน</h1>
        <div style="width: 80%; margin-right: auto; margin-left: auto;">
            <p>
                1. ผู้สมัครสมาชิกคู่ค้า ต้องปฏิบัติตามหลักเกณฑ์ เงื่อนไข กฎระเบียบ และข้อปฏิบัติการเป็นสมาชิกอย่างเคร่งครัด
            </p>
        </div>
        <div class="text-center mt-5">
            <Checkbox v-model="checked" :binary="true" /> ยอมรับและอ่านเงื่อนไขการใช้งาน
        </div>
        <div class="flex justify-content-center mt-2">
            <Button label="ยืนยัน" @click="confirmCondition()" severity="danger" />
        </div>
    </div>
    <div>

    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { Member } from "../../../service/member";
export default {
    data: () => ({
        checked: false,
        id: '',
    }),
    created() {
        document.title = "เงื่อนไข / สัญญาอิเล็กทรอนิกส์ | Dekrub Shop";
    },
    setup() {
        const members = new Member();
        return { members }
    },
    async mounted() {
        await axios
            .get(`${process.env.VUE_APP_DEKRUP}/me`, {
                headers: {
                    'token': localStorage.getItem('token'),
                },
            }).then((res) => {
                const data = res.data.data;
                this.id = data._id;
            })
    },
    methods: {
        async confirmCondition() {
            if (!this.checked) {
                Swal.fire('แจ้งเตือน', 'กรุณากดยอมรับเงื่อนไขการใช้งาน', 'warning');
                return;
            }
            await this.members.confirmCondition(this.id).then(async (result) => {
                if (result) {
                    console.log(result);
                    this.loading = false;

                    Swal.fire({
                        title: 'ยืนยันเงื่อนไขสำเร็จ',
                        showConfirmButton: true,
                    }).then(() => {
                         this.$router.push("/member/confirmBank");
                    });
                }
            });
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


