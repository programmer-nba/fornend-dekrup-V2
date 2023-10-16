<template>
    <div class="px-4 py-8 md:px-6 lg:px-8">
        <div class="text-900 font-bold text-6xl mb-4 text-center">
            การแบ่งค่าคอมมิชชั่น
        </div>
        <div class="grid">
            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">Register</div>
                        <small><strong>หมายเหตุ : </strong>ค่าคอมมิชชั่น สมัครสมาชิกใหม่</small>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <div class="flex align-items-center">
                            <span class="font-bold text-2xl text-900">{{ percent.register }} บาท </span>
                            <span class="ml-2 font-medium text-600">ของส่วนแบ่งทางการตลาด</span>
                        </div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <ul class="list-none p-0 m-0 flex-grow-1">
                            <li class="align-items-center mb-3">
                                <i class="pi pi-chevron-circle-right text-green-500 mr-2"></i>
                                <span>Level 1 (ผู้แนะนำผู้แนะนำ) : {{ percent_register.level_one }} บาท </span>
                            </li>
                            <li class="align-items-center mb-3">
                                <i class="pi pi-chevron-circle-right text-green-500 mr-2"></i>
                                <span>Level 2 (ผู้แนะนำ) : {{ percent_register.level_two }} บาท</span>
                            </li>
                            <li class="align-items-center mb-3">
                                <i class="pi pi-chevron-circle-right text-green-500 mr-2"></i>
                                <span>Level 3 (ผู้สมัคร) : {{ percent_register.level_three }} บาท</span>
                            </li>
                        </ul>
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                        <Button label="อัพเดท" class="p-3 w-full mt-auto button-up" @click="openDialogRegister()"></Button>
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">Administer</div>
                        <small><strong>หมายเหตุ : </strong>ค่าบริหาร</small>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <div class="flex align-items-center">
                            <span class="font-bold text-2xl text-900">{{ percent.administer }} บาท </span>
                            <span class="ml-2 font-medium text-600">ของส่วนแบ่งทางการตลาด</span>
                        </div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <ul class="list-none p-0 m-0 flex-grow-1">
                            <li class="align-items-center mb-3">
                                <i class="pi pi-chevron-circle-right text-green-500 mr-2"></i>
                                <span>Level 1 (ผู้แนะนำผู้แนะนำ) : {{ percent_administer.level_one }} บาท </span>
                            </li>
                            <li class="align-items-center mb-3">
                                <i class="pi pi-chevron-circle-right text-green-500 mr-2"></i>
                                <span>Level 2 (ผู้แนะนำ) : {{ percent_administer.level_two }} บาท</span>
                            </li>
                            <li class="align-items-center mb-3">
                                <i class="pi pi-chevron-circle-right text-green-500 mr-2"></i>
                                <span>Level 3 (ผู้สมัคร) : {{ percent_administer.level_three }} บาท</span>
                            </li>
                        </ul>
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                        <Button label="อัพเดท" class="p-3 w-full mt-auto button-up" @click="openDialogAdminister()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- แก้ไข้ Commission Register -->
    <Dialog v-model:visible="DialogRegister" :style="{ width: '450px' }" header="อัพเดท Commission Register" :modal="true"
        class="p-fluid mb-5">
        <Divider align="left" type="dashed">
            <b>ค่าคอมมิชชั่น สมัครสมาชิกใหม่</b>
        </Divider>
        <div class="field">
            <InputNumber v-model="percent.register" disabled/>
        </div>
        <div class="field">
            <label>Level 1 :</label>
            <InputNumber v-model="percent_register.level_one" />
        </div>
        <div class="field">
            <label>Level 2 :</label>
            <InputNumber v-model="percent_register.level_two" />
        </div>
        <div class="field">
            <label>Level 3 :</label>
            <InputNumber v-model="percent_register.level_three" />
        </div>
        <template #footer>
            <Button label="บันทึก" icon="pi pi-check" autofocus @click="updateRegister()" />
        </template>
    </Dialog>

    <!-- แก้ไข้ Commission Administer -->
    <Dialog v-model:visible="DialogAdminister" :style="{ width: '450px' }" header="อัพเดท Commission Administer Week" :modal="true"
        class="p-fluid mb-5">
        <Divider align="left" type="dashed">
            <b>ค่าบริหาร รายสัปดาห์</b>
        </Divider>
        <div class="field">
            <InputNumber v-model="percent.administer" disabled />
        </div>

        <div class="field">
            <label>Level 1 :</label>
            <InputNumber v-model="percent_administer.level_one" />
        </div>
        <div class="field">
            <label>Level 2 :</label>
            <InputNumber v-model="percent_administer.level_two" />
        </div>
        <div class="field">
            <label>Level 3 :</label>
            <InputNumber v-model="percent_administer.level_three" />
        </div>
        <template #footer>
            <Button label="บันทึก" icon="pi pi-check" autofocus @click="updateAdminister()" />
        </template>
    </Dialog>

</template>
<script>
import { Percent } from "../../../service/percent";
export default {
    created() {
        document.title = "แบ่ง Commission | Dekrub Shop";
    },
    setup() {
        const percents = new Percent();
        return { percents };
    },
    data() {
        return {
            DialogRegister: false,
            DialogAdminister: false,

            loading: false,
            isloading: false,
            isDisabled: false,

            percent: {
                register: '',
                administer: '',
            },

            percent_register: {
                _id: '',
                level_one: '',
                level_two: '',
                level_three: '',
            },

            percent_administer: {
                _id: '',
                level_one: '',
                level_two: '',
                level_three: '',
            },

        };
    },
    mounted() {
        this.getPercent();
    },
    methods: {
        async getPercent() {
            this.$store.commit('setLoading', true);
            await this.percents.GetPercent().then(result => {
                const order = result.data;

                // register
                const order_register = order.filter(
                    (el) => el.code === 'register'
                )
                this.percent_register._id = order_register[0]._id;
                this.percent_register.level_one = order_register[0].level_one;
                this.percent_register.level_two = order_register[0].level_two;
                this.percent_register.level_three = order_register[0].level_three;
                this.percent.register = this.percent_register.level_one + this.percent_register.level_two + this.percent_register.level_three;

                // administer
                const order_administer = order.filter(
                    (el) => el.code === 'administer'
                )
                this.percent_administer._id = order_administer[0]._id;
                this.percent_administer.level_one = order_administer[0].level_one;
                this.percent_administer.level_two = order_administer[0].level_two;
                this.percent_administer.level_three = order_administer[0].level_three;
                this.percent.administer = this.percent_administer.level_one + this.percent_administer.level_two + this.percent_administer.level_three;
       
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
            })

        },

        openDialogRegister() {
            this.DialogRegister = true;
        },
        openDialogAdminister() {
            this.DialogAdminister = true;
        },

        async updateRegister() {
            this.loading = true;
            const data = {
                level_one: this.percent_register.level_one,
                level_two: this.percent_register.level_two,
                level_three: this.percent_register.level_three,
            }
            await this.percents.UpdateCommission(data, this.percent_register._id).then(async (result) => {
                if (result) {
                    this.loading = false;
                    this.DialogRegister = false;
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "อัพเดตรายการสำเร็จ",
                        life: 3000,
                    })
                    this.getPercent();
                }
            })
        },

        async updateAdminister() {
            this.loading = true;
            const data = {
                level_one: this.percent_administer.level_one,
                level_two: this.percent_administer.level_two,
                level_three: this.percent_administer.level_three,
            }
            await this.percents.UpdateCommission(data, this.percent_administer._id).then(async (result) => {
                if (result) {
                    this.loading = false;
                    this.DialogAdminister = false;
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "อัพเดตรายการสำเร็จ",
                        life: 3000,
                    })
                    this.getPercent();
                }
            })
        },
    },
};
</script>

<style>
.button-up {
    background-color: #EA1179;
    border: 2px solid #F79BD3;
}
</style>
  