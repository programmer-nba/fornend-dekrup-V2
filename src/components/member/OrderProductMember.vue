<template>
  <div class="card-oder border-red-500 border-2 mt-8">
    <div class="top">
      <div class="title flex align-items-center justify-content-center h-3rem w-full">
        ตระกร้าของฉัน
      </div>
    </div>
    <div class="grid py-2 px-2">
      <div class="col-6 md:col-6 lg:col-12 xl:col-6">
        <div class="flex flex-column align-items-center justify-content-center h-7rem text-900 border-round m-2"
          style="background-color: #ffae35; font-size: 20px;-webkit-text-stroke: 1px;">
          <label style="font-size: 20px">สินค้า/รายการ</label>
          <div style="font-size: 20px">{{ $store.getters.order_detail.length }}</div>
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
      <div class="col-12  justify-context-center">
        <div class="flex justify-content-end">
          <Button label="ล้างตระกร้าสินค้า" severity="danger" @click="clearCart()" raised
            v-if="$store.getters.order_detail.length > 0" />
        </div>
        <DataTable :value="$store.getters.order_detail" :row="10">
          <template #empty>
            <p class="p-0 m-0 text-center"><em style="color: #3A1078;">-- ไม่มีรายการสั่ง --</em></p>
          </template>
          <Column header="รายการ" style="width: 10%;">
            <template #body="item">
              {{ item.index + 1 }}
            </template>
          </Column>
          <Column header="รหัสสินค้า" style="width: 30%;">
            <template #body="item">
              {{ item.data.code }}
            </template>
          </Column>
          <Column header="สินค้า" style="width: 30%;">
            <template #body="item">
              {{ item.data.name }}
            </template>
          </Column>
          <!-- <Column header="ประเภท" style="width: 30%;">
            <template #body="item">
              {{ item.data.category }}
            </template>
          </Column> -->
          <Column header="จำนวน" style="width: 30%;">
            <template #body="item">
              {{ item.data.quantity }}
            </template>
          </Column>
          <Column header="ราคา" style="width: 30%;">
            <template #body="item">
              {{ item.data.price }}

            </template>
          </Column>
        </DataTable>

        <Button label="กดเพื่อชำระเงิน" icon="pi pi-external-link" @click="visible = true"
          style="width: -webkit-fill-available;" v-if="$store.getters.order_detail.length > 0" />
        <Dialog v-model:visible="visible" header="ยอดเงินที่ต้องชำระ">
          <div class="flex justify-content-center">
            <label style="font-size: 35px;text-align: center; text-align: center;">{{ $store.getters.order_total }}
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
              <p>
                QRCODE
              </p>
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
import Dialog from 'primevue/dialog';
import { Product } from '../../service/product';
import axios from 'axios';
import { useToast } from "vue-toastification";
export default {
  components: {
    Dialog
  },
  setup() {
    const toast = useToast();
    const product = new Product();
    return { product, toast };
  },
  data: () => ({
    visible: false,

    slip_img: null,
    DialogPayment: false,

    res: '',

    img_preview: null,
    img_upload: [],
    img_size: null,
    dialog_img_warning: false,

    member_number: '',
    name: '',
    tel: '',
    address: '',
    line: '',
  }),

  async mounted() {
    await axios.get(`${process.env.VUE_APP_DEKRUP}/me`, {
      headers: {
        'token': `${localStorage.getItem('token')}`
      }
    }).then((res) => {
      this.member_number = res.data.data.member_number;
      this.name = res.data.data.name;
      this.tel = res.data.data.tel;
      this.address = `${res.data.data.address}, แขวง/ตำบล: ${res.data.data.subdistrict}, เขต/อำเภอ: ${res.data.data.district}, จังหวัด: ${res.data.data.province}, รหัสไปรษณีย์: ${res.data.data.postcode}`
      this.line = `ไม่มี`;
    })
  },
  methods: {
    onUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
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
        })
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
        formData.append('imgCollection', this.img_upload[0]);
        this.product.PutMoneySlip(formData, id)
          .then(async (result) => {
            if (result) {
              console.log(result);
              this.loading = false;
              this.toast.success('ชำระเงินสำเร็จ');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          })
          .catch((error) => {
            this.loading = false;
            this.toast.error('เกิดข้อผิดพลาดในการส่งข้อมูล: ' + error.message);
          });
      }

    },

    clearCart() {
      window.location.reload();
    }

  }
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
</style>
