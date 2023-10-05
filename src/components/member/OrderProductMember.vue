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
          style="background-color: #ffae35; font-size: 20px">
          <label style="font-size: 20px">สินค้า/รายการ</label>
          <div style="font-size: 20px">{{ orders.length }}</div>
        </div>
      </div>
      <div class="col-6 md:col-6 lg:col-12 xl:col-6">
        <div
          class="flex flex-column align-items-center justify-content-center h-7rem font-bold text-white border-round m-2"
          style="background-color: #da2121">
          <label style="font-size: 18px">ยอดเงินที่ต้องชำระ</label>
          <label style="font-size: 20px;background: #ffff;
                  border-radius: 15px;
                  color: red;
                  padding: 2px;"><strong>{{ calculateTotal() }}</strong> บาท</label>

          <label style="font-size: 14px;color: #ffff;"><Button label="กดเพื่อชำระเงิน" link @click="visible = true"
              style="color: #ffff;" /></label>
        </div>
      </div>
    </div>
    <div class="grid px-2">
      <div class="col-12">
        <DataTable :value="orders">
          <Column header="รายการ">
            <template #body="slotProps">
              {{ slotProps.data.product.name }}
            </template>
          </Column>
          <Column header="ราคา">
            <template #body="slotProps">
              {{ slotProps.data.product.price }}
            </template>
          </Column>
          <Column header="จำนวนสั่งซื้อ">
            <template #body="slotProps">
              {{ slotProps.data.quantity }}
            </template>
          </Column>
          <Column header="ราคารวม">
            <template #body="slotProps">
              {{ slotProps.data.product.price * slotProps.data.quantity }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <div class="flex justify-content-start">
                <DelProductMember class="px-2" />
                <Button icon="pi pi-trash" severity="danger" rounded aria-label="Favorite"
                  @click="deleteProduct(slotProps.data)" />

              </div>
            </template>
          </Column>
        </DataTable>

        <Dialog v-model="visible" modal header="ชำระเงิน">
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
                    v-if="slip_img === null" />
                  <FileUpload mode="basic" :auto="true" chooseLabel="แนบรูปภาพหลักฐานการโอน" uploadIcon="pi pi-paperclip"
                    @uploader="chooseImage" :customUpload="true" v-if="slip_img === null" />
                  <!-- <FileUpload mode="basic" :auto="true" chooseLabel="แนบรูปภาพหลักฐานการโอน"
                                uploadIcon="pi pi-paperclip"  :customUpload="true"
                                /> -->
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
            <Button label="ยืนยันการชำระเงิน" icon="pi pi-check" @click="confirm()" autofocus />
          </template>
        </Dialog>

      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "vue";
import { useStore } from "vuex";
import DelProductMember from "@/components/member/DelOrderProductMember.vue";

import Dialog from 'primevue/dialog';

const visible = ref(false);


export default {
  components: {
    DelProductMember,
    Dialog
  },
  setup() {
    // const item_product = ref([]);
    const store = useStore();
    const orders = ref(store.state.orders);

    const calculateTotal = () => {
      let total = 0;
      for (const order of orders.value) {
        total += order.product.price * order.quantity;
      }
      return total.toFixed(2);
    };

    const deleteProduct = (product) => {
      // ตรวจสอบว่ารายการสินค้าถูกเลือกแล้วหรือไม่
      if (product) {
        // ลบรายการสินค้าออกจากตะกร้า orders
        const index = orders.value.indexOf(product);
        if (index !== -1) {
          orders.value.splice(index, 1);
        }
      }
    };

    return {
      orders,
      calculateTotal,
      visible,
      deleteProduct

    };
  },
  data: () => ({
    slip_img: null,
    img_preview: null,
    visible: false,
  }),
  methods: {
    onUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },
    clearImage() {
      this.img_preview = null;
      this.slip_img = null;
    },
    chooseImage(event) {
      this.slip_img = event.files[0];
      this.img_preview = event.files[0].objectURL;
    },

    clearData(){
      this.$store.state.orders = '';
      this.visible = false;
    },

    // async confirm() {
    //   this.$confirm.require({
    //     message: 'ต้องการบันทึกข้อมูล',
    //     header: 'ยืนยันการสั่งสินค้า',
    //     icon: 'pi pi-exclamation-triangle',
    //     acceptLabel: 'ตกลง',
    //     rejectLabel: 'ยกเลิก',
    //     accept: async () => {
    //       this.$store.commit('setLoading', true);
    //       const data = {
    //         member_number: ,
    //         customer_name: ,
    //         customer_tel: ,
    //         customer_address: ,
    //         customer_line: ,
    //         product_detail: ,
    //       }
    //       await axios.post(`${process.env.VUE_APP_DEKRUP}/product/order`, data, {
    //         headers: {
    //           'token': `${this.$store.getters.token}`
    //         }
    //       }).then((res) => {
    //         this.$store.commit('setLoading', false);
    //         this.visible = true;
    //         this.$toast.add({
    //           severity: "success",
    //           summary: "สำเร็จ",
    //           detail: "ทำรายการสำเร็จ",
    //           life: 3000,
    //         });
    //       }).catch((err) => {
    //         if (err.response.status === 408) {
    //           window.location.reload();
    //         }
    //         this.$store.commit('setLoading', false);
    //         this.$toast.add({ severity: 'error', summary: 'ไม่สำเร็จ', detail: err.response.data.message, life: 3000 });
    //         this.$router.push('/');
    //       })
    //     }
    //   })
    // }
  }
};
</script>

<style scoped>
.card-oder {
  border-radius: 16px;
  max-width: 100%;
  /* ขยาย card ให้เต็มขนาดของ container */
  margin: 0 auto;
  /* จัดตำแหน่งกลาง */
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
