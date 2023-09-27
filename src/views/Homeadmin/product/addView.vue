<template>
    <div style="background-color: #FFDEDE; ">
        <div class="grid px-3">
            <div class="col-12 lg:col-12 mt-2">
                <Panel class="custom-header-panel">
                    <template #header>เกี่ยวกับสินค้า</template>
                    <div class="grid">
                        <div class="col-12 text-center">
                            <Image :src="imagePreview" width="200" v-if="imagePreview !== null" :preview="true" />
                            <FileUpload mode="basic" chooseLabel="เลือกรูปสินค้า" :auto="true" @uploader="chooseImg"
                                :customUpload="true" accept="image/png, image/jpeg,image/jpg" :fileLimit="1"
                                :maxFileSize="2097152" invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                                :disabled="isDisabled" class="border-red-400" style="background-color: #C21010;"/>
                            <p><em>(ขนาดจะต้องเป็น 1:1)</em></p>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-12 lg:col-6">
                            <div class="field">
                                <label>ชื่อสินค้า :</label>
                                <InputText v-model="productNBA_name" class="font w-full" placeholder="กรอกชื่อสินค้า"
                                    :disabled="isDisabled" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>บาร์โค้ดสินค้า :</label>
                                <InputText v-model="productNBA_barcode" class="w-full font" placeholder="กรอกบาร์โค้ดสินค้า"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                    :disabled="isDisabled" />
                                <Button label="ตรวจสอบบาร์โค้ดสินค้า" class="mt-2 border-red-400" icon="pi pi-search" style="background-color: #C21010;"
                                    @click="checkbarcode(productNBA_barcode)" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-2">
                            <div class="field">
                                <label>สถานะสินค้า : </label>
                                <Dropdown v-model="productNBA_status_type" :options="item_status_type" optionLabel="name"
                                    optionValue="code" placeholder="เลือกสถานะสินค้า" class="w-full" inputClass="font"
                                    :disabled="isDisabled" />
                            </div>
                        </div>



                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>ต้นทุน :</label>
                                <InputNumber v-model="productNBA_cost_NBA" class="w-full" inputClass="font"
                                    placeholder="กรอกต้นทุนสินค้า" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>ราคาขาย (Shop) :</label>
                                <InputNumber v-model="productNBA_cost" class="w-full" inputClass="font"
                                    placeholder="กรอกราคาต้นทุนสินค้า" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
                            </div>
                        </div>
                        <div class="col-12 lg:col-4">
                            <div class="field">
                                <label>ราคาขายหน้าร้าน :</label>
                                <InputNumber v-model="productNBA_price" class="w-full" inputClass="font"
                                    placeholder="กรอกราคาขายหน้าร้าน" mode="decimal" :minFractionDigits="2"
                                    :maxFractionDigits="2" :disabled="isDisabled" />
                            </div>
                        </div>

                        <div class="col-12 lg:col-6">
                            <div class="field">
                                <label>จำนวนสินค้าในสต๊อก<small>(ชิ้น)</small> :</label>
                                <InputNumber v-model="productNBA_stock" class="w-full" inputClass="font"
                                    placeholder="กรอกจำนวนสินค้าในสต๊อก" :disabled="isDisabled" />
                            </div>
                        </div>


                        <div class="col-12">
                            <div class="field">
                                <label>รายละเอียดสินค้า</label>
                                <Editor v-model="productNBA_detail" editorStyle="height: 200px"
                                    placeholder="กรอกรายละเอียดเกี่ยวกับสินค้า" :disabled="isDisabled">
                                    <template #toolbar>
                                        <span class="ql-formats">
                                            <button class="ql-bold"></button>
                                            <button class="ql-italic"></button>
                                            <button class="ql-underline"></button>
                                        </span>
                                    </template>
                                </Editor>
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
            <div class="col-12">
                <div class="field">
                    <Button class="ml-2 border-gray-400" label="ยกเลิก" icon="pi pi-times " style="background-color: #8D8DAA;"
                        @click="$router.push('/homeadmin')" />
                        <Button label="บันทึก" icon="pi pi-save" class="ml-2 border-red-400" @click="addProduct()" :loading="isLoading"  
                        style="background-color: #D61355;"/>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
    components: {
    },
    created() {
        document.title = "เพิ่มข้อมูลสินค้าในคลัง";
    },

    data: () => ({
        isLoading: false,
        isDisabled: false,
        item_status_type: [
            { name: "เครดิต", code: "เครดิต" },
            { name: "ฝากขาย", code: "ฝากขาย" },
        ],
        item_dealer: [],
        item_brand: [],
        item_type: [],
        item_category: [],
        item_company: [
            { name: "คู่ค้า (Dealer)", code: "dealer" },
            { name: "NBA DIGITAL SERVICE", code: "nba" },
        ],
        imagePreview: null,
        data: {
            type_name: "",
        },
        number: 30,
        summary: 0,
        //product
        productNBA_dealer_id: "ไม่มี",
        productNBA_brand_id: "ไม่มี",
        productNBA_category: "",
        productNBA_type: [],
        productNBA_name: "",
        productNBA_barcode: "",
        productNBA_status_type: "",
        productNBA_cost: null,
        productNBA_cost_NBA: null,
        productNBA_alcohol_status: false,
        productNBA_image: "",
        productNBA_price: null,
        productNBA_store: "",
        productNBA_profit: {
            nba: 0,
            platform: {
                level_one: 0,
                level_two: 0,
                level_tree: 0,
                level_owner: 0,
            },
            terrestrial: {
                bonus: 0,
            },
            central: {
                central: 0,
                allsale: 0,
            },
        },
        productNBA_more: {
            difference: 0,
        },

        productNBA_detail: "",
        productNBA_stock: null,
        chack_status: false,
    }),
    methods: {
        calNBAProfit() {
            // หาภาษี ขาย
            if (
                this.productNBA_cost !== null &&
                this.productNBA_price !== null &&
                this.productNBA_cost_NBA !== null &&
                this.productNBA_profit.nba !== null &&
                this.productNBA_profit.nba1 !== null
            ) {

                const profitNBA = this.productNBA_cost - this.productNBA_cost_NBA;

                const sum =
                    this.productNBA_price -
                    this.productNBA_cost;

                const share = (sum * 10) / 100; //หักส่วนแบ่ง 10%

                const final = ((sum - share) * 80) / 100;
                const final1 = ((((sum - share) * 20) / 100) + profitNBA);
                this.productNBA_profit.nba1 = final.toFixed(2); //Shop 80%
                this.productNBA_profit.nba = final1.toFixed(2); //NBA 20%
                this.productNBA_more.difference = sum.toFixed(2); //กำไรสุทธิ
                this.productNBA_more.share = share.toFixed(2); //ส่วนแบ่ง 10%
                console.log("sum:", sum);
                console.log("final:", final);
                console.log("final1", final1);
                console.log("share", share);
                return sum;
            } else {
                this.productNBA_profit.nba = 0;
                return 0;
            }
        },

        async calculateProfit() {
            try {
                const response = await axios.get(
                    `${process.env.VUE_APP_SHOP
                    }percent-profit/${"637ef06a7e98ac71b872197d"}`,
                    {
                        headers: {
                            "auth-token": `Bearer ${this.$store.getters.token}`,
                        },
                    }
                );
                const percent = response.data.data;
                const profit = this.productNBA_more.share;
                const platform = (profit * percent.percent.platform) / 100;
                const terrestrial = (profit * percent.percent.terrestrial) / 100;
                const central = (profit * percent.percent.central) / 100;

                const pf = {
                    level_owner: (platform * percent.percent_platform.level_owner) / 100,
                    level_one: (platform * percent.percent_platform.level_one) / 100,
                    level_two: (platform * percent.percent_platform.level_two) / 100,
                    level_tree: (platform * percent.percent_platform.level_tree) / 100,
                };
                const ter = {
                    bonus: (terrestrial * percent.percent_terrestrial.bonus) / 100,
                };
                const cent = {
                    central: (central * percent.percent_central.central) / 100,
                    allsale: (central * percent.percent_central.allsale) / 100,
                };
                this.productNBA_profit.platform = pf;
                this.productNBA_profit.terrestrial = ter;
                this.productNBA_profit.central = cent;
                this.chack_status = true;
            } catch (error) {
                console.log(error);
            }
        },

        numberFormat(num) {
            return num.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
            });
        },
        async getDealer() {
            await axios
                .get(`${process.env.VUE_APP_SHOP}dealer`, {
                    headers: {
                        "auth-token": `Bearer ${this.$store.getters.token}`,
                    },
                })
                .then((res) => {
                    const dealer = res.data.data;
                    const filterDealer = dealer.filter(
                        (item) => item.dealer_status === true
                    );

                    this.item_dealer = filterDealer;
                })
                .catch((e) => {
                    if (e.response.status === 408) {
                        window.location.reload();
                    }
                });
        },
        async getBrand() {
            await axios
                .get(`${process.env.VUE_APP_SHOP}brand`, {
                    headers: {
                        "auth-token": `Bearer ${this.$store.getters.token}`,
                    },
                })
                .then((res) => {
                    const brand = res.data.data;

                    const filterBrand = brand.filter(
                        (item) => item.brand_dealer_id === this.productNBA_dealer_id
                    );
                    const newBrand = filterBrand.filter(
                        (item) => item.brand_status_required === "ตรวจสอบสำเร็จ"
                    );
                    this.item_brand = newBrand;
                })
                .catch((e) => {
                    if (e.response.status === 408) {
                        window.location.reload();
                    }
                });
        },
        async getType() {
            await axios
                .get(`${process.env.VUE_APP_SHOP}type`, {
                    headers: {
                        "auth-token": `Bearer ${this.$store.getters.token}`,
                    },
                })
                .then((res) => {
                    this.item_type = res.data.data;
                })
                .catch((e) => {
                    if (e.response.status === 408) {
                        window.location.reload();
                    }
                });
        },
        async getCategory() {
            await axios
                .get(`${process.env.VUE_APP_SHOP}category`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    this.item_category = res.data.data;
                });
        },
        async getCompany() {
            await axios
                .get(`${process.env.VUE_APP_SHOP}company`, {
                    headers: {
                        "auth-token": this.$store.getters.token,
                    },
                })
                .then((res) => {
                    this.company = res.data.data;
                });
        },
        chooseImg(event) {
            this.imagePreview = event.files[0].objectURL;
            this.productNBA_image = event.files[0];
        },
        async addProduct() {
            console.log(this.productNBA_profit.platform.level_one);
            //ตรวจสอบค่าว่าง
            if (this.productNBA_image === "") {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "กรุณาเลือกรูปภาพสินค้า",
                    life: 3000,
                });
                return false;
            }

            if (
                this.productNBA_name === "" ||
                this.productNBA_status_type === "" ||
                this.productNBA_type === "" ||
                this.productNBA_category === "" ||
                this.productNBA_barcode === "" ||
                this.productNBA_cost_NBA === "" ||
                this.productNBA_cost === null ||
                this.pruductNBA_price === null ||
                this.productNBA_detail === "" ||
                this.productNBA_stock === null ||
                this.productNBA_profit.nba === null
            ) {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
                    life: 3000,
                });

                return false;
            }
            if (
                this.productNBA_profit.nba >=
                this.productNBA_price - this.productNBA_cost_NBA
            ) {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "การแบ่งกำไรไม่ถูกต้อง",
                    life: 3000,
                });
                return false;
            }
            if (this.chack_status === false) {
                this.$toast.add({
                    severity: "warn",
                    summary: "แจ้งเตือน",
                    detail: "ตรวจสอบการแบ่งกำไร",
                    life: 3000,
                });
                return false;
            }

            //check barcode ซ้ำ
            const check_barcode = await axios
                .post(
                    `${process.env.VUE_APP_SHOP}check/barcode/nba`,
                    {
                        barcode: this.productNBA_barcode.replace(/\s/g, ""),
                    },
                    {
                        headers: {
                            "auth-token": `Bearer ${this.$store.getters.token}`,
                        },
                    }
                )
                .catch((err) => {
                    if (err.response.status === 408) {
                        window.location.reload();
                    }
                    this.$toast.add({
                        severity: "warn",
                        summary: "แจ้งเตือน",
                        detail: err.response.data.message,
                        life: 3000,
                    });
                    return false;
                });
            if (check_barcode.status !== 200) {
                return false;
            }
            //ยืนยันการเพิ่ม
            this.$confirm.require({
                message: "ต้องการเพิ่มข้อมูลสินค้านี้?",
                header: "เพิ่มสินค้า",
                icon: "pi pi-exclamation-triangle",
                acceptLabel: "ตกลง",
                rejectLabel: "ยกเลิก",
                accept: async () => {
                    this.isLoading = true;
                    this.isDisabled = true;
                    const formData = new FormData();
                    for (let i = 0; i < this.productNBA_type.length; i++) {
                        formData.append(`productNBA_type[${i}]`, this.productNBA_type[i]);
                        console.log(i);
                    }
                    formData.append("productNBA_name", this.productNBA_name);
                    formData.append("productNBA_brand_id", this.productNBA_brand_id);
                    formData.append("productNBA_dealer_id", this.productNBA_dealer_id);
                    formData.append("productNBA_barcode", this.productNBA_barcode);
                    formData.append(
                        "productNBA_status_type",
                        this.productNBA_status_type
                    );
                    formData.append("productNBA_cost", this.productNBA_cost);
                    formData.append("productNBA_cost_nba", this.productNBA_cost_NBA);

                    formData.append("productNBA_image", this.productNBA_image);
                    formData.append("productNBA_category", this.productNBA_category);
                    formData.append("productNBA_price", this.productNBA_price);
                    formData.append("productNBA_detail", this.productNBA_detail);
                    formData.append("productNBA_stock", this.productNBA_stock);
                    formData.append("productNBA_profit[nba]", this.productNBA_profit.nba);
                    formData.append(
                        "productNBA_profit[platform][level_owner]",
                        this.productNBA_profit.platform.level_owner
                    );
                    formData.append(
                        "productNBA_profit[platform][level_tree]",
                        this.productNBA_profit.platform.level_tree
                    );
                    formData.append(
                        "productNBA_profit[platform][level_two]",
                        this.productNBA_profit.platform.level_two
                    );
                    formData.append(
                        "productNBA_profit[platform][level_one]",
                        this.productNBA_profit.platform.level_one
                    );
                    formData.append(
                        "productNBA_profit[terrestrial][bonus]",
                        this.productNBA_profit.terrestrial.bonus
                    );
                    formData.append(
                        "productNBA_profit[central][central]",
                        this.productNBA_profit.central.central
                    );
                    formData.append(
                        "productNBA_profit[central][allsale]",
                        this.productNBA_profit.central.allsale
                    );
                    formData.append(
                        "productNBA_more[difference]",
                        this.productNBA_more.difference
                    );
                    formData.append("productNBA_store", this.productNBA_store);
                    formData.append("productNBA_date_start", dayjs(Date.now()).format());
                    formData.append(
                        "productNBA_alcohol_status",
                        this.productNBA_alcohol_status
                    );
                    await axios
                        .post(`${process.env.VUE_APP_SHOP}product/nba`, formData, {
                            headers: {
                                "auth-token": `Bearer ${this.$store.getters.token}`,
                            },
                        })
                        .then(() => {
                            this.$router.push("/product");
                            this.isDisabled = false;
                            this.isLoading = false;
                            this.$toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "เพิ่มสินค้าเรียบร้อยแล้ว",
                                life: 3000,
                            });
                        })
                        .catch((err) => {
                            if (err.response.status === 408) {
                                window.location.reload();
                            }
                            this.isDisabled = false;
                            this.isLoading = false;
                            this.$toast.add({
                                severity: "warn",
                                summary: "แจ้งเตือน",
                                detail: err.response.data.message,
                                life: 3000,
                            });
                            console.log(this.err);
                        });
                },
            });
        },
        async checkbarcode(productNBA_barcode) {
            if (productNBA_barcode === "") {
                return false;
            }
            const check_barcode = await axios
                .post(
                    `${process.env.VUE_APP_SHOP}check/barcode/nba`,
                    { barcode: productNBA_barcode.replace(/\s/g, "") },
                    {
                        headers: {
                            "auth-token": `Bearer ${this.$store.getters.token}`,
                        },
                    }
                )
                .then(() => {
                    this.$toast.add({
                        severity: "success",
                        summary: "การตรวจสอบสำเร็จ",
                        detail: "สามารถใช้บาร์โค้ดนี้ได้",
                        life: 3000,
                    });
                    return true;
                })
                .catch((err) => {
                    if (err.response.status === 408) {
                        window.location.reload();
                    }
                    this.$toast.add({
                        severity: "warn",
                        summary: "แจ้งเตือน",
                        detail: err.response.data.message,
                        life: 3000,
                    });
                    return false;
                });
            if (check_barcode.status !== 200) {
                return false;
            }
        },
    },
};
</script>

<style>
  .custom-header-panel .p-panel-header {
      background-color: #FFFDE3;
      color: #C21010;
      border-bottom: 1px solid #C21010;
  }
  .custom-header-panel .p-panel-content {
    background-color: #FFFDE3;
    color: #C21010;
    border: none;
}
</style>