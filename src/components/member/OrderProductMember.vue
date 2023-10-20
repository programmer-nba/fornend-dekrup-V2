<template>
  <div class="container">
    <div class="radio-tile-group">

      <!-- รับสินค้าเอง -->
      <div class="input-container">
        <input
          v-model="selectedDeliveryOption"
          class="radio-button"
          type="radio"
          value="walk"
          name="radio"
          id="pickit"
        />
        <div class="radio-tile">
          <div class="icon walk-icon">
            <svg
              fill="#000000"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"
              ></path>
            </svg>
          </div>
          <label class="radio-tile-label">รับเอง</label>
        </div>
      </div>

      <!-- จัดส่งสินค้าตามที่อยู่ที่กรอก -->
      <div class="input-container">
        <input
          v-model="selectedDeliveryOption"
          class="radio-button"
          type="radio"
          value="delivery"
          name="radio"
          id="delivery"
        />

        <div class="radio-tile">
          <div class="icon bike-icon">
            <svg
              fill="#000000"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"
              ></path>
            </svg>
          </div>
          <label class="radio-tile-label">จัดส่ง</label>
        </div>
      </div>

      <!-- จัดส่งตามที่อยู่บัตรประชาชน -->
      <div class="input-container">
        <input
          v-model="selectedDeliveryOption"
          class="radio-button"
          type="radio"
          value="drive"
          name="radio"
          id="drive"
        />
        <div class="radio-tile">
          <div class="icon car-icon">
            <svg
              fill="#000000"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
              ></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </div>
          <label class="radio-tile-label">จัดส่งตามที่อยู่บัตรประชาชน</label>
        </div>
      </div>
    </div>
  </div>

  <div class="grid mt-3">
    <div class="col-12">
      <Panel
        header="รายละเอียดที่อยู่จัดส่ง"
        class="custom-header-panel"
        v-if="selectedDeliveryOption === 'delivery'"
      >
        <div class="grid">
          <div class="col-12">
            <div class="field">
              <span class="p-float-label">
                <InputText
                  :class="'w-full font inputdetail text-purple-800'"
                  :disabled="isDisabled"
                  placeholder="กรอกที่อยู่จัดส่ง บ้านเลขที่ หมู่ที่"
                />

                <label class="text-purple-700">ที่อยู่ </label>
              </span>
            </div>
          </div>
          <div class="col-12">
            <div class="grid">
              <div class="col-12 lg:col-6">
                <div class="field">
                  <span class="p-float-label">
                    <Dropdown
                      v-model="province"
                      inputClass="font"
                      :options="item_province"
                      placeholder="เลือกจังหวัด"
                      optionLabel="name_th"
                      :filter="true"
                      filterPlaceholder="ค้นหาจังหวัด"
                      @change="chooseProvince"
                      class="w-full"
                    />
                    <label class="text-purple-700">จังหวัด</label>
                  </span>
                </div>
              </div>
              <div class="col-12 lg:col-6">
                <div class="field">
                  <span class="p-float-label">
                    <Dropdown
                      v-model="amphure"
                      inputClass="font"
                      :options="item_amphure"
                      placeholder="เลือกเขต/จังหวัด"
                      optionLabel="name_th"
                      :filter="true"
                      filterPlaceholder="ค้นหาเขต/อำเภอ"
                      @change="chooseAmphure"
                      class="w-full"
                    />
                    <label class="text-purple-700">เขต/อำเภอ</label>
                  </span>
                </div>
              </div>
              <div class="col-12 lg:col-6">
                <div class="field">
                  <span class="p-float-label">
                    <Dropdown
                      v-model="tambon"
                      inputClass="font"
                      :options="item_tambon"
                      placeholder="เลือกตำบล"
                      @change="chooseToDistrict"
                      optionLabel="name_th"
                      :filter="true"
                      filterPlaceholder="ค้นหาแขวง/ตำบล"
                      class="w-full"
                    />
                    <label class="text-purple-700">แขวง/ตำบล</label>
                  </span>
                </div>
              </div>
              <div class="col-12 lg:col-6">
                <div class="field">
                  <span class="p-float-label">
                    <InputText
                      v-model="member.postcode"
                      placeholder="รหัสไปรษณ์"
                      class="w-full style-font"
                      :disabled="isDisabled"
                    />
                    <label class="text-purple-700">รหัสไปรษณีย์</label>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid">
          <div class="col-12 text-right">
            <Button
              @click="clearAddress()"
              
              label="บันทึก"
              class="p-button-outlined text-white"
              style="background-color: #FF0063;"
            />
          </div>
        </div>
      </Panel>
    </div>
  </div>

  <div class="card-oder border-red-500 border-2 mt-3">
    <div class="top">
      <div
        class="title flex align-items-center justify-content-center h-3rem w-full"
      >
        ตระกร้าของฉัน
      </div>
    </div>
    <div class="grid py-2 px-2">
      <div class="col-6 md:col-6 lg:col-12 xl:col-6">
        <div
          class="flex flex-column align-items-center justify-content-center h-7rem text-900 border-round m-2"
          style="
            background-color: #ffae35;
            font-size: 20px;
            -webkit-text-stroke: 1px;
          "
        >
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
          <label style="font-size: 18px; -webkit-text-stroke: 0.5px;">ยอดเงินที่ต้องชำระ</label>
          <label style="font-size: 20px;
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
          <Button
            label="ล้างตระกร้าสินค้า"
            severity="danger"
            @click="clearCart()"
            raised
            v-if="$store.getters.order_detail.length > 0"
          />
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
          style="width: -webkit-fill-available;" v-if="$store.getters.order_detail.length > 0" />
        <Dialog v-model:visible="visible" header="ยอดเงินที่ต้องชำระ">
          <div class="flex justify-content-center">
            <label
              style="font-size: 35px; text-align: center; text-align: center"
              >{{ $store.getters.order_total }} บาท</label
            >
          </div>
          <template #footer>
            <Button
              label="ปิด"
              icon="pi pi-times"
              @click="visible = false"
              text
            />
            <Button
              label="ยืนยันการสั่งออเดอร์"
              @click="confirm()"
              icon="pi pi-check"
              autofocus
            />
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
                  <Image
                    :src="require('../../assets/QRdekrub.jpg')"
                    :preview="true"
                    width="300"
                    v-if="img_preview === null"
                  />
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
                    <Button
                      label="ลบ"
                      @click="clearImage()"
                      icon="pi pi-trash"
                      class="p-button-danger"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabView>
          <template #footer>
            <Button label="ปิด" icon="pi pi-times" @click="clearData()" text />
            <Button
              label="ยืนยันการชำระเงิน"
              icon="pi pi-check"
              @click="moneySlip()"
              autofocus
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>

  <div></div>
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
    selectedDeliveryOption: "walk",

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

    async confirm() {
      this.DialogPayment = true;
      this.loading = true;
      const data = {
        member_number: this.member_number,
        customer_name: this.name,
        customer_tel: this.tel,
        customer_address: this.address,
        customer_line: this.line,
        product_detail: this.$store.getters.order,
      }
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
.p-datatable .p-datatable-thead > tr > th {
  background-color: #d9d9d9 !important;
  color: #292d32;
}

.p-datatable .p-datatable-tbody > tr > td {
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

.radio-tile-group .input-container .radio-button:checked + .radio-tile {
  background-color: #d21312;
  border: 2px solid #FF597B;
  color: white;
  transform: scale(1.1, 1.1);
}

.radio-tile-group
  .input-container
  .radio-button:checked
  + .radio-tile
  .icon
  svg {
  fill: white;
  background-color: #d21312;
}

.radio-tile-group
  .input-container
  .radio-button:checked
  + .radio-tile
  .radio-tile-label {
  color: white;
  background-color: #d21312;
}
</style>
