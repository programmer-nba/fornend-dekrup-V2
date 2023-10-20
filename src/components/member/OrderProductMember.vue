<template>
  <div class="card-oder border-red-500 border-2 mt-3">
    <div class="top">
      <div class="title flex align-items-center justify-content-center h-3rem w-full">
        ที่อยู่ในการจัดส่งสินค้า
      </div>
    </div>
    <div class="container">
      <div class="radio-tile-group">
        <!-- รับสินค้าเอง -->
        <div class="input-container" @change="walkIn">
          <input v-model="selectedDeliveryOption" class="radio-button" type="radio" value="walk" name="radio"
            id="pickit" />
          <div class="radio-tile">
            <div class="icon walk-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 12c2.76 0 5-2.24 5-5s-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5m5.45 5.6c-.39-.4-.88-.6-1.45-.6h-7l-2.08-.73l.33-.94L13 16h2.8c.35 0 .63-.14.86-.37s.34-.51.34-.82c0-.54-.26-.91-.78-1.12L8.95 11H7v9l7 2l8.03-3c.01-.53-.19-1-.58-1.4M5 11H.984v11H5V11Z" />
              </svg>
            </div>
            <label class="radio-tile-label">รับเอง</label>
          </div>
        </div>

        <!-- จัดส่งสินค้าตามที่อยู่ที่กรอก -->
        <div class="input-container">
          <input v-model="selectedDeliveryOption" class="radio-button" type="radio" value="delivery" name="radio"
            id="delivery" />
          <div class="radio-tile">
            <div class="icon bike-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M1 3a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v5h4a5 5 0 0 1 5 5v4a3.001 3.001 0 0 1-2.129 2.872a3 3 0 0 1-5.7.128H8.83a3 3 0 0 1-5.7-.128A3.001 3.001 0 0 1 1 17v-4h6a1 1 0 1 0 0-2H1V9h4a1 1 0 0 0 0-2H1V3Zm13 15h1.171a3 3 0 0 1 5.536-.293A.997.997 0 0 0 21 17v-4a3 3 0 0 0-3-3h-4v8Zm-7 1a1 1 0 1 0-2 0a1 1 0 0 0 2 0Zm10.293-.707A.994.994 0 0 0 17 19a1 1 0 1 0 .293-.707Z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <label class="radio-tile-label">จัดส่ง</label>
          </div>
        </div>

        <!-- จัดส่งตามที่อยู่บัตรประชาชน -->
        <div class="input-container" @change="driveIn">
          <input v-model="selectedDeliveryOption" class="radio-button" type="radio" value="drive" name="radio"
            id="drive" />
          <div class="radio-tile">
            <div class="icon car-icon">
              <svg width="27" height="24" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M528 160v256c0 8.8-7.2 16-16 16H320c0-44.2-35.8-80-80-80h-64c-44.2 0-80 35.8-80 80H64c-8.8 0-16-7.2-16-16V160h480zM64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm208 224a64 64 0 1 0-128 0a64 64 0 1 0 128 0zm104-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-80zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-80z" />
              </svg>
            </div>
            <label class="radio-tile-label">จัดส่งตามที่อยู่บัตรประชาชน</label>
          </div>
        </div>
      </div>
    </div>

    <div class="grid mt-3">
      <div class="col-12">
        <Panel header="รายละเอียดที่อยู่จัดส่ง" class="custom-header-panel" v-if="selectedDeliveryOption === 'delivery'">
          <div class="grid">
            <div class="col-12">
              <div class="field">
                <span class="p-float-label">
                  <InputText v-model="member.address" :class="'w-full font inputdetail text-purple-800'"
                    :disabled="isDisabled" placeholder="กรอกที่อยู่จัดส่ง บ้านเลขที่ หมู่ที่" />

                  <label class="text-purple-700">ที่อยู่ </label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <div class="grid">
                <div class="col-12 lg:col-6">
                  <div class="field">
                    <span class="p-float-label">
                      <Dropdown v-model="province" inputClass="font" :options="item_province" placeholder="เลือกจังหวัด"
                        optionLabel="name_th" :filter="true" filterPlaceholder="ค้นหาจังหวัด" @change="chooseProvince"
                        class="w-full" />
                      <label class="text-purple-700">จังหวัด</label>
                    </span>
                  </div>
                </div>
                <div class="col-12 lg:col-6">
                  <div class="field">
                    <span class="p-float-label">
                      <Dropdown v-model="amphure" inputClass="font" :options="item_amphure" placeholder="เลือกเขต/จังหวัด"
                        optionLabel="name_th" :filter="true" filterPlaceholder="ค้นหาเขต/อำเภอ" @change="chooseAmphure"
                        class="w-full" />
                      <label class="text-purple-700">เขต/อำเภอ</label>
                    </span>
                  </div>
                </div>
                <div class="col-12 lg:col-6">
                  <div class="field">
                    <span class="p-float-label">
                      <Dropdown v-model="tambon" inputClass="font" :options="item_tambon" placeholder="เลือกตำบล"
                        @change="chooseToDistrict" optionLabel="name_th" :filter="true" filterPlaceholder="ค้นหาแขวง/ตำบล"
                        class="w-full" />
                      <label class="text-purple-700">แขวง/ตำบล</label>
                    </span>
                  </div>
                </div>
                <div class="col-12 lg:col-6">
                  <div class="field">
                    <span class="p-float-label">
                      <InputText v-model="member.postcode" placeholder="รหัสไปรษณ์" class="w-full style-font"
                        :disabled="isDisabled" />
                      <label class="text-purple-700">รหัสไปรษณีย์</label>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid">
            <div class="col-12 text-right">
              <Button @click="deliveryIn()" label="บันทึก" class="p-button-outlined text-white"
                style="background-color: #ff0063" />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  </div>

  <div class="card-oder border-red-500 border-2 mt-3">
    <div class="top">
      <div class="title flex align-items-center justify-content-center h-3rem w-full">
        ตระกร้าของฉัน
      </div>
    </div>
    <div class="grid py-2 px-2">
      <div class="col-6 md:col-6 lg:col-12 xl:col-6">
        <div class="flex flex-column align-items-center justify-content-center h-7rem text-900 border-round m-2"
          style="background-color: #ffae35; font-size: 20px; -webkit-text-stroke: 1px">
          <label style="font-size: 20px">สินค้า/รายการ</label>
          <div style="font-size: 20px">
            {{ $store.getters.order_detail.length }}
          </div>
        </div>
      </div>
      <div class="col-6 md:col-6 lg:col-12 xl:col-6">
        <div
          class="flex flex-column align-items-center justify-content-center h-7rem font-bold text-white border-round m-2"
          style="background-color: #da2121">
          <label style="font-size: 18px; -webkit-text-stroke: 0.5px">ยอดเงินที่ต้องชำระ</label>
          <label style="
              font-size: 20px;
              background: #ffff;
              -webkit-text-stroke: 1px;
              border-radius: 15px;
              padding-left: 20px;
              padding-right: 20px;
              color: rgb(255, 0, 0);
            "><strong></strong>{{ $store.getters.order_total }} บาท</label>
        </div>
      </div>
    </div>
    <div class="grid px-2">
      <div class="col-12 justify-context-center">
        <div class="flex justify-content-end">
          <Button label="ล้างตระกร้าสินค้า" severity="danger" @click="clearCart()" raised
            v-if="$store.getters.order_detail.length > 0" />
        </div>
        <DataTable :value="$store.getters.order_detail" :row="10">
          <template #empty>
            <p class="p-0 m-0 text-center">
              <em style="color: #3a1078">-- ไม่มีรายการสั่ง --</em>
            </p>
          </template>
          <Column header="รายการ" style="width: 10%">
            <template #body="item">
              {{ item.index + 1 }}
            </template>
          </Column>
          <Column header="รหัสสินค้า" style="width: 30%">
            <template #body="item">
              {{ item.data.code }}
            </template>
          </Column>
          <Column header="สินค้า" style="width: 30%">
            <template #body="item">
              {{ item.data.name }}
            </template>
          </Column>
          <!-- <Column header="ประเภท" style="width: 30%;">
            <template #body="item">
              {{ item.data.category }}
            </template>
          </Column> -->
          <Column header="จำนวน" style="width: 30%">
            <template #body="item">
              {{ item.data.quantity }}
            </template>
          </Column>
          <Column header="ราคา" style="width: 30%">
            <template #body="item">
              {{ item.data.price }}
            </template>
          </Column>
        </DataTable>

        <Button label="กดเพื่อชำระเงิน" icon="pi pi-external-link" @click="visible = true"
          style="width: -webkit-fill-available" v-if="$store.getters.order_detail.length > 0" />
        <Dialog v-model:visible="visible" header="ยอดเงินที่ต้องชำระ">
          <div class="flex justify-content-center">
            <label style="font-size: 35px; text-align: center; text-align: center">{{ $store.getters.order_total }}
              บาท</label>
          </div>
          <template #footer>
            <Button label="ปิด" icon="pi pi-times" @click="visible = false" text />
            <Button label="ยืนยันการสั่งออเดอร์" @click="confirm()" icon="pi pi-check" autofocus />
          </template>
        </Dialog>
      </div>

      <div class="col-12">
        <Dialog v-model:visible="DialogPayment" header="ชำระเงิน">
          <TabView>
            <TabPanel header="QR CODE">
              <p>QRCODE</p>
            </TabPanel>
            <TabPanel header="แนบสลิปการโอนเงิน">
              <div class="flex justify-content-center">
                <div class="field">
                  <Image :src="require('../../assets/QRdekrub.jpg')" :preview="true" width="300"
                    v-if="img_preview === null" />
                  <!-- <label v-if="!img_preview" class="file-input-label">
                    <FileUpload mode="basic" :auto="true" chooseLabel="แนบรูปภาพหลักฐานการโอน" uploadIcon="pi pi-paperclip"
                    class="input-image" @change="SetImage"/>
                  </label> -->
                  <label v-if="!img_preview" class="file-input-label">
                    <span>แนบรูป</span>
                    <input type="file" class="input-image" @change="SetImage" />
                  </label>
                </div>
                <div class="text-center" v-if="img_preview !== null">
                  <div class="col-12 grid justify-content-center">
                    <Image :src="img_preview" :preview="true" width="200" />
                  </div>
                  <div class="col-12 text-center">
                    <Button label="ลบ" @click="clearImage()" icon="pi pi-trash" class="p-button-danger" />
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabView>
          <template #footer>
            <Button label="ปิด" icon="pi pi-times" @click="clearData()" text />
            <Button label="ยืนยันการชำระเงิน" icon="pi pi-check" @click="moneySlip()" autofocus />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Dialog from "primevue/dialog";
import { useToast } from "vue-toastification";
import { Product } from "../../service/product";
export default {
  components: {
    Dialog,
  },
  setup() {
    const toast = useToast();
    const product = new Product();
    return { product, toast };
  },
  data: () => ({
    visible: false,
    isDisabled: false,
    selectedDeliveryOption: "",

    slip_img: null,
    DialogPayment: false,

    item_province: [],
    item_amphure: [],
    item_tambon: [],

    province: null,
    amphure: null,
    tambon: null,

    member: {
      address: "",
      subdistrict: "",
      district: "",
      province: "",
      postcode: "",
    },

    res: "",

    img_preview: null,
    img_upload: [],
    img_size: null,
    dialog_img_warning: false,

    walk: "",
    delivery: "",
    drive: "",

    member_number: "",
    name: "",
    tel: "",
    address: "",
    line: "",
    postcode: "",
  }),

  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_DEKRUP}/me`, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.member_number = res.data.data.member_number;
        this.name = res.data.data.name;
        this.tel = res.data.data.tel;
        this.address = `${res.data.data.address}, แขวง/ตำบล: ${res.data.data.subdistrict}, เขต/อำเภอ: ${res.data.data.district}, จังหวัด: ${res.data.data.province}, รหัสไปรษณีย์: ${res.data.data.postcode}`;
        this.line = `ไม่มี`;
      });
    await axios
      .get(`${process.env.VUE_APP_THAILAND}thailand/province`, {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.item_province = res.data;
        this.$store.commit("setLoading", false);
      })
      .catch((err) => {
        console.log(err);
        this.$store.commit("setLoading", false);
        this.$toast.add({
          severity: "error",
          summary: "ไม่สำเร็จ",
          detail: err.response.data.message,
          life: 3000,
        });
      });
  },

  methods: {
    async chooseProvince(evt) {
      this.member.province = evt.value.name_th;
      await axios
        .get(
          `${process.env.VUE_APP_THAILAND}thailand/amphure/by-province-id/${evt.value.id}`,
          {
            headers: {
              "auth-token": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.item_amphure = res.data;
          this.item_tambon = [];
          this.member.district = null;
          this.amphure = null;
          this.tambon = null;
        });
    },
    async chooseAmphure(evt) {
      await axios
        .get(
          `${process.env.VUE_APP_THAILAND}thailand/tambon/by-amphure-id/${evt.value.id}`,
          {
            headers: {
              "auth-token": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.item_tambon = res.data;
          this.member.district = null;
          this.tambon = null;
        });
    },
    chooseToDistrict(evt) {
      this.district = evt.value;
      this.member.postcode = evt.value.zip_code;
    },

    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },

    clearImage() {
      this.img_preview = null;
      this.slip_img = null;
    },

    clearData() {
      this.DialogPayment = false;
      this.clearImage();
    },

    chooseImage(event) {
      this.slip_img = event.files[0];
      this.img_preview = event.files[0].objectURL;
    },

    // calFinal() {
    //   this.DialogPayment = true;
    // },

    SetImage(e) {
      const file = e.target.files;
      if (file) {
        this.img_size = file[0].size;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file[0]);
        fileReader.addEventListener("load", (event) => {
          this.img_preview = event.target.result;
        });
        this.img_upload = file;
      }
    },

    walkIn() {
      this.walk = "รับเอง";
      console.log(this.walk);
    },

    deliveryIn() {
      const address = `${this.member.address}, แขวง/ตำบล: ${this.tambon.name_th}, เขต/อำเภอ: ${this.amphure.name_th}, จังหวัด: ${this.province.name_th}, รหัสไปรษณีย์: ${this.member.postcode}`;
      this.delivery = address;
      console.log(this.delivery);
    },

    driveIn() {
      this.drive = "จัดส่งตามที่อยู่ตามบัตรประชาชน";
      console.log(this.drive);
    },

    async confirm() {
      this.DialogPayment = true;
      this.loading = true;
      if (this.selectedDeliveryOption === "walk") {
        const data = {
          member_number: this.member_number,
          customer_name: this.name,
          customer_tel: this.tel,
          customer_address: this.walk,
          customer_line: this.line,
          product_detail: this.$store.getters.order,
        };
        await axios
          .post(`${process.env.VUE_APP_DEKRUP}/product/order`, data, {
            headers: {
              token: `${this.$store.getters.token}`,
            },
          })
          .then((res) => {
            this.$store.commit("setLoading", false);
            this.res = res.data;
            console.log(this.res);
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "ทำรายการสำเร็จ",
              life: 3000,
            });
          })
          .catch((err) => {
            this.$store.commit("setLoading", false);
            this.$toast.add({
              severity: "error",
              summary: "ไม่สำเร็จ",
              detail: err.response.data.message,
              life: 3000,
            });
          });
      }
      if (this.selectedDeliveryOption === "delivery") {
        const data = {
          member_number: this.member_number,
          customer_name: this.name,
          customer_tel: this.tel,
          customer_address: this.delivery,
          customer_line: this.line,
          product_detail: this.$store.getters.order,
        };
        await axios.post(`${process.env.VUE_APP_DEKRUP}/product/order`, data, {
          headers: {
            'token': `${this.$store.getters.token}`
          }
        }).then((res) => {
          this.$store.commit('setLoading', false);
          this.res = res.data;
          console.log(this.res)
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ทำรายการสำเร็จ",
            life: 3000,
          });
        }).catch((err) => {
          this.$store.commit('setLoading', false);
          this.$toast.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: err.response.data.message, life: 3000 });
        })
      }
      if (this.selectedDeliveryOption === "drive") {
        const data = {
          member_number: this.member_number,
          customer_name: this.name,
          customer_tel: this.tel,
          customer_address: this.address,
          customer_line: this.line,
          product_detail: this.$store.getters.order,
        };
        await axios
          .post(`${process.env.VUE_APP_DEKRUP}/product/order`, data, {
            headers: {
              token: `${this.$store.getters.token}`,
            },
          })
          .then((res) => {
            this.$store.commit("setLoading", false);
            this.res = res.data;
            console.log(this.res);
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "ทำรายการสำเร็จ",
              life: 3000,
            });
          })
          .catch((err) => {
            this.$store.commit("setLoading", false);
            this.$toast.add({
              severity: "error",
              summary: "ไม่สำเร็จ",
              detail: err.response.data.message,
              life: 3000,
            });
          });
      }
    },

    async moneySlip() {
      this.loading = true;
      if (this.img_upload.length === 0) {
        this.toast.warning("กรุณาแนบสลิปการโอนเงิน");
      } else {
        // เมื่อมีไฟล์ที่ถูกเลือก, ให้ดำเนินการส่งข้อมูล
        const id = this.res._id;
        const formData = new FormData();
        formData.append("imgCollection", this.img_upload[0]);
        this.product
          .PutMoneySlip(formData, id)
          .then(async (result) => {
            if (result) {
              console.log(result);
              this.loading = false;
              this.toast.success("ชำระเงินสำเร็จ");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          })
          .catch((error) => {
            this.loading = false;
            this.toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล: " + error.message);
          });
      }
    },

    clearCart() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.card-oder {
  border-radius: 16px;
  max-width: 100%;
  margin: 0 auto;
}

.top {
  background: rgba(212, 21, 21, 0.63);
  border-radius: 16px;
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.top .title {
  color: #fff;
  font-weight: bolder;
}
</style>

<style>
.p-datatable .p-datatable-thead>tr>th {
  background-color: #d9d9d9 !important;
  color: #292d32;
}

.p-datatable .p-datatable-tbody>tr>td {
  margin-bottom: 1.5rem;
}

.p-datatable .p-datatable-footer {
  background-color: #ffe6f7 !important;
  border: none;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-tile-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.radio-tile-group .input-container {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0.5rem;
}

.radio-tile-group .input-container .radio-button {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  cursor: pointer;
}

.radio-tile-group .input-container .radio-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid #d21312;
  border-radius: 5px;
  padding: 1rem;
  transition: transform 300ms ease;
}

.radio-tile-group .input-container .icon svg {
  fill: #d21312;
  width: 2rem;
  height: 2rem;
}

.radio-tile-group .input-container .radio-tile-label {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #d21312;
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile {
  background-color: #d21312;
  border: 2px solid #ff597b;
  color: white;
  transform: scale(1.1, 1.1);
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile .icon svg {
  fill: white;
  background-color: #d21312;
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile .radio-tile-label {
  color: white;
  background-color: #d21312;
}
</style>
