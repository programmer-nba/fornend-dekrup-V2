<template>
  <Button
    icon="pi pi-search"
    class="p-button-rounded p-button-success mr-2"
    @click="(visibleFull = true), openvisibleFull()"
  />

  <Sidebar v-model:visible="visibleFull" :baseZIndex="10000" position="full">
    <div class="font-medium text-3xl text-900 text-center mb-3">
      รายละเอียดสินค้า
    </div>

    <div class="grid">
      <div class="col-12 lg:col-8 p-fluid p-4">
        <Panel header="ข้อมูลสินค้า">
          <div class="grid">
            <div class="col-12 text-center">
              <Image
                :src="img + productNBA.productNBA_image"
                width="220"
                preview
              />
              <FileUpload
                mode="basic"
                chooseLabel="เปลื่ยนรูปสินค้า"
                :auto="true"
                @uploader="chooseImg"
                :customUpload="true"
                accept="image/png, image/jpeg,image/jpg"
                :fileLimit="1"
                :maxFileSize="2097152"
                invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                v-if="uploadLoading !== true"
              />
              <div v-else>
                <ProgressSpinner
                  style="width: 20px; height: 20px"
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              </div>
            </div>
          </div>
          <div class="grid">
            <div class="col-12 lg:col-6">
              <div class="field">
                <label>ชื่อสินค้า :</label>
                <InputText
                  class="font w-full"
                  v-model="productNBA.productNBA_name"
                />
              </div>
            </div>
            <div class="col-12 lg:col-3">
              <div class="field">
                <label>บาร์โค้ด :</label>
                <InputText
                  v-model="productNBA.productNBA_barcode"
                  class="w-full font"
                  oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');"
                />
              </div>
            </div>
            <div class="col-12 lg:col-3">
              <div class="field">
                <label>สถานะสินค้า : </label>
                <Dropdown
                  v-model="productNBA.productNBA_status_type"
                  :options="item_status_type"
                  optionLabel="name"
                  optionValue="code"
                  class="w-full"
                  inputClass="font"
                />
              </div>
            </div>
            <div class="col-12 lg:col-6">
              <div class="field">
                <label>หมวดหมู่สินค้า : </label>
                <Dropdown
                  v-model="productNBA.productNBA_category"
                  :options="item_category"
                  optionLabel="name"
                  optionValue="_id"
                  class="w-full"
                  inputClass="font"
                />
              </div>
            </div>
            <div class="col-12 lg:col-6">
              <div class="field">
                <label>หมวดหมู่ย่อยสินค้า : </label>
                <MultiSelect
                  v-model="productNBA.productNBA_type"
                  :options="item_type"
                  optionLabel="type_name"
                  optionValue="_id"
                  class="w-full"
                  inputClass="font"
                />
              </div>
            </div>
            <div class="col-12 lg:col-4">
              <div class="field">
                <label>ต้นทุน NBA :</label>
                <InputNumber
                  class="w-full"
                  inputClass="font"
                  v-model="productNBA.productNBA_cost_nba"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>
            <div class="col-12 lg:col-4">
              <div class="field">
                <label>ราคาขาย (Shop) :</label>
                <InputNumber
                  class="w-full"
                  inputClass="font"
                  v-model="productNBA.productNBA_cost"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>
            <div class="col-12 lg:col-4">
              <div class="field">
                <label>ราคาขายหน้าร้าน :</label>
                <InputNumber
                  class="w-full"
                  inputClass="font"
                  v-model="productNBA.productNBA_price"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>
            <div class="col-12 lg:col-6">
              <div class="field">
                <label>Store : </label>
                <Dropdown
                  v-model="productNBA.productNBA_store"
                  :options="item_company"
                  optionLabel="name"
                  optionValue="code"
                  :placeholder="product.productNBA_store"
                  class="w-full"
                  inputClass="font"
                  selectionMessage
                  @change="chooseStore()"
                />
              </div>
            </div>
            <div class="col-12 lg:col-6">
              <div class="field">
                <label>จำนวนสินค้าในสต๊อก<small>(ชิ้น)</small> :</label>
                <InputNumber
                  class="w-full"
                  inputClass="font"
                  v-model="productNBA.productNBA_stock"
                />
              </div>
            </div>
            <div class="col-12 lg:col-6">
              <div class="field">
                <label>คู่ค้า (Dealer) : </label>
                <Dropdown
                  v-model="productNBA.productNBA_dealer_id"
                  :options="item_dealer"
                  optionLabel="dealer_name"
                  optionValue="_id"
                  placeholder="เลือกคู่ค้า"
                  class="w-full"
                  inputClass="font"
                  @change="chooseDealer()"
                />
              </div>
            </div>
            <div class="col-12 lg:col-6">
              <div class="field">
                <label>แบรนด์ : </label>
                <Dropdown
                  :options="item_brand"
                  v-model="productNBA.productNBA_brand_id"
                  optionLabel="brand_name"
                  optionValue="_id"
                  placeholder="เลือกแบรนด์สินค้า"
                  class="w-full"
                  inputClass="font"
                  selectionMessage
                />
              </div>
            </div>
            <div class="col-12">
              <div class="field">
                <label>รายละเอียดสินค้า</label>
                <Editor
                  v-model="productNBA.productNBA_detail"
                  editorStyle="height: 200px"
                  placeholder="กรอกรายละเอียดเกี่ยวกับสินค้า"
                >
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
      <div class="col-12 lg:col-4 p-fluid p-4">
        <Panel header=" เกี่ยวกับส่วนแบ่ง">
          <div class="grid">
            <div class="col-12">
              <div class="field">
                <p class="pb-0 mb-0">
                  ส่วนต่างกำไรสินค้า :
                  <strong> {{ productNBA_more.difference }}</strong>
                </p>
                <p class="pt-0 mt-0 text-gray-600">
                  <small
                    ><em
                      ><strong>หมายเหตุ : </strong>(ราคาขายหน้าร้าน - ต้นทุน
                      NBA)</em
                    ></small
                  >
                </p>
                <label>กำไร NBA :</label>
                <InputNumber
                  v-model="productNBA_profit.nba"
                  class="w-full"
                  inputClass="font"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="field text-right">
                <Button
                  label="แบ่งเปอร์เซนต์"
                  icon="pi pi-calculator"
                  @click="calculateProfit"
                />
              </div>
            </div>
            <Divider align="left" type="dashed">
              <b>Platform</b>
            </Divider>
            <div class="col-6">
              <div class="field">
                <label> ซื้อเอง : </label>
                <InputNumber
                  v-model="platform.level_owner"
                  class="w-full"
                  inputClass="font"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="field">
                <label> Lv1 : </label>
                <InputNumber
                  v-model="platform.level_one"
                  class="w-full"
                  inputClass="font"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="field">
                <label> Lv2 : </label>
                <InputNumber
                  v-model="platform.level_two"
                  class="w-full"
                  inputClass="font"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>

            <div class="col-6">
              <div class="field">
                <label> Lv3 : </label>
                <InputNumber
                  v-model="platform.level_tree"
                  class="w-full"
                  inputClass="font"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>

            <Divider align="left" type="dashed">
              <b>กองทุน </b>
            </Divider>
            <div class="col-6">
              <div class="field">
                <label>กองทุน :</label>
                <InputNumber
                  v-model="central.central"
                  class="w-full"
                  inputClass="font"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="field">
                <label>All Sale :</label>
                <InputNumber
                  v-model="central.allsale"
                  class="w-full"
                  inputClass="font"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>

            <Divider align="left" type="dashed">
              <b>โบนัสพนักงาน </b>
            </Divider>
            <div class="col-6">
              <div class="field">
                <label>โบนัสพนักงาน :</label>
                <InputNumber
                  v-model="terrestrial.bonus"
                  class="w-full"
                  inputClass="font"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <div class="col-12 lg:col-4 p-fluid p-4">
        <Panel header="เครื่องดื่มแอลกอฮอล์">
          <p>
            ไม่มีแอลกอฮอล์
            <InputSwitch
              v-model="productNBA.productNBA_alcohol_status"
              @click="switchstatus"
            />
            มีแอลกอฮอล์
          </p>
          <Message severity="info" :closable="false"
            ><p class="m-0 p-0">
              เวลาการจำหน่ายแอลกอฮอล์
              <strong> 11:00 – 14:00 น. และ 17:00 – 24:00 น. </strong>
            </p></Message
          >
        </Panel>
        <Panel header="เลือกรูปแบบการขาย" class="mt-2">
          <p>
            ไม่มีการขายรวม
            <InputSwitch
              @change="changePackStatus()"
              v-model="productNBA.productNBA_pack_status"
            />
            มีขายรวม/ขายแยก
          </p>
          <Message severity="warn" :closable="false">
            <p class="m-0 p-0">
              <strong>ไม่มีการขายรวม :</strong> คือการขายชนิดเดียว ขายต่อชิ้น
            </p>
            <p class="m-0 p-0">
              <strong>ขายรวม/ขายแยก :</strong> มีครั้งการขายรวม และการขายย่อย
              เช่น เบียร์ขายแบบเป็นลัง และขายแบบเป็นขวด
              <small
                ><em
                  >(โดยจะต้องมีหน่วยสินค้ารายชิ้นอ้างอิง ในหัวข้อ
                  "หน่วยสินค้า")</em
                ></small
              >
            </p>
          </Message></Panel
        >
      </div>
      <div class="col-12 lg:col-8 p-fluid p-4">
        <Panel header="หน่วยสินค้า">
          <div class="grid" v-if="productNBA_unit_ref.barcode !== ''">
            <div class="col-12 text-center">
              <Image
                :preview="true"
                :src="getImageUnitRef(productNBA_unit_ref.barcode)"
                width="200"
              />
            </div>
            <div class="col-12">
              <p class="p-0 m-0">
                <strong>รหัสสินค้า : </strong>
                <Chip :label="productNBA_unit_ref.barcode" />
              </p>
              <p class="p-0 m-0">
                <strong>ชื้อสินค้า : </strong>
                {{ getnameRef(productNBA_unit_ref.barcode) }}
              </p>
              <p class="p-0 m-0">
                <strong>จำนวน : </strong>
                <Chip :label="productNBA_unit_ref.amount" />
              </p>
            </div>
          </div>
          <div class="card">
            <div class="flex justify-content-end flex-wrap card-container r">
              <div
                class="flex align-items-center justify-content-center"
                v-if="productNBA_unit_ref.barcode === ''"
              >
                <Button
                  @click="openDialogUnitRef()"
                  icon="pi pi-plus"
                  label="เพิ่มสินค้าย่อย"
                />
              </div>
              <div v-else>
                <div class="flex align-items-center justify-content-center">
                  <Button
                    @click="openDialogUnitRef()"
                    icon="pi pi-pencil"
                    label="แก้ไขสินค้าย่อย"
                    class="p-button-success"
                  />
                </div>
                <div
                  class="flex align-items-center justify-content-center mt-2"
                >
                  <Button
                    @click="delproductRef()"
                    icon="pi pi-trash"
                    label="ลบสินค้าย่อย"
                    class="p-button-danger ml-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div class="col-12">
        <div class="field text-right">
          <Button 
            label="บันทึกข้อมูล"
            icon="pi pi-save"
            @click="updateProduct"
          ></Button>
        </div>
      </div>
    </div>
  </Sidebar>

  <Dialog
    v-model:visible="dialogUnitRef"
    header="สินค้ารายชิ้น"
    :modal="true"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '30vw' }"
  >
    <div class="grid">
      <div class="col-12" v-if="product_ref !== null">
        <div class="grid">
          <div class="col-12 text-center">
            <Image :src="getImage(product_ref.productNBA_image)" width="100" />
          </div>
          <div class="col-12">
            <p class="p-0 m-0">
              <strong>รหัสสินค้า : </strong>
              <Chip :label="product_ref.productNBA_barcode" />
            </p>
            <p class="p-0 m-0">
              <strong>ชื่อสินค้า : </strong> {{ product_ref.productNBA_name }}
            </p>
            <p class="p-0 m-0">
              <strong>ต้นทุน NBA : </strong
              >{{ product_ref.productNBA_cost_nba }}
              <small>บาท</small>
            </p>
            <p class="p-0 m-0">
              <strong>ราคาขาย (Shop) :</strong
              >{{ product_ref.productNBA_cost }}
              <small>บาท</small>
            </p>
            <p class="p-0 m-0">
              <strong>ราคาขาย : </strong>{{ product_ref.productNBA_price }}
              <small>บาท</small>
            </p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <InputText
          v-model="unit_barcode"
          @chage="findProductRef"
          @keyup.enter="findProductRef"
          class="font w-full"
          placeholder="สแกนบาร์โค้ดชิ้นในช่องนี้แล้วกด Enter"
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');"
        />
      </div>
      <div class="col-12">
        <InputNumber
          v-model="unit_amount"
          inputClass="font"
          class="w-full"
          placeholder="จำนวนชิ้น"
          showButtons
        />
      </div>
    </div>
    <template #footer>
      <Button
        class="p-button-text"
        label="ยกเลิก"
        @click="dialogUnitRef = false"
      />
      <Button
        label="เพิ่ม"
        @click="addProductRef"
        v-if="actionProductRef === 'add'"
      />
      <Button
        label="อัพเดต"
        class="p-button-success"
        @click="updateProductRef()"
      />
    </template>
  </Dialog>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

export default {
  props: {
    product_id: String,
    item_product: Array,
    product: Object,
  },
  setup(props) {
    const confirm = useConfirm();
    const toast = useToast();

    const visibleFull = ref(false);
    const dialogUnitRef = ref(false);
    const uploadLoading = ref(false);
    const actionProductRef = ref("add");
    const productNBA_id = ref();
    const productNBA = ref([]);
    const productNBA_more = ref([]);
    const productNBA_profit = ref([]);
    const productNBA_unit_ref = ref([]);
    const platform = ref([]);
    const terrestrial = ref([]);
    const central = ref([]);
    const product = ref([]);
    const item_product = ref([]);
    const img = ref("https://drive.google.com/uc?export=view&id=");
    const item_status_type = ref([
      { name: "เครดิต", code: "เครดิต" },
      { name: "ฝากขาย", code: "ฝากขาย" },
    ]);
    const item_company = ref([
      { name: "คู่ค่า (Dealer)", code: "dealer" },
      { name: "NBA DIGITAL SERVICE", code: "nba" },
    ]);
    const item_category = ref([]);
    const item_type = ref([]);
    const item_dealer = ref([]);
    const item_brand = ref([]);
    const product_ref = ref(null);
    const unit_barcode = ref("");
    const unit_amount = ref(null);

    const chack_status = ref(false);

    const openvisibleFull = () => {
      productNBA_id.value = props.product_id;
      product.value = props.product;
      item_product.value = props.item_product;
      chack_status.value = false;
      if (product.value.productNBA_store !== "nba") {
        fetchDealer();
      }

      fetchProduct();
      fetchCategory();
      fetchType();
    };

    const chooseImg = (event) => {
      console.log(productNBA_id.value);
      console.log(productNBA.value);

      confirm.require({
        message: "ต้องการเปลี่ยนรูปสินค้านี้?",
        header: "อัพโหลด",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          uploadLoading.value = true;
          const img_product = event.files[0];
          const formData = new FormData();
          console.log(img_product);
          formData.append("productNBA_image", img_product);
          await axios
            .delete(
              `${process.env.VUE_APP_SHOP}delete/image/${productNBA.value.productNBA_image}`,
              {
                headers: {
                  "auth-token": localStorage.getItem("token"),
                },
              }
            )
            .catch((err) => {
              if (err.response.status === 408) {
                window.location.reload();
              }
              toast.add({
                severity: "error",
                summary: "ไม่สำเร็จ",
                detail: err.response.data.message,
                life: 3000,
              });
            });
          await axios
            .put(
              `${process.env.VUE_APP_SHOP}product/nba/${productNBA_id.value}`,
              formData,
              {
                headers: {
                  "auth-token": localStorage.getItem("token"),
                },
              }
            )
            .then(() => {
              chack_status.value = true;
              fetchProduct();
              toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "เปลี่ยนรูปสินค้าเรียบร้อยแล้ว",
                life: 3000,
              });
              uploadLoading.value = false;
            })
            .catch((err) => {
              if (err.response.status === 408) {
                window.location.reload();
              }
              toast.add({
                severity: "error",
                summary: "ไม่สำเร็จ",
                detail: err.response.data.message,
                life: 3000,
              });
              uploadLoading.value = false;
            });
        },
      });
    };
    const fetchProduct = async () => {
      await axios
        .get(
          `${process.env.VUE_APP_SHOP}product/nba/${productNBA_id.value}`,

          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          productNBA.value = res.data.data;
          productNBA_more.value = res.data.data.productNBA_more;
          productNBA_profit.value = res.data.data.productNBA_profit;
          productNBA_unit_ref.value = res.data.data.productNBA_unit_ref;
          platform.value = productNBA_profit.value.platform;
          terrestrial.value = productNBA_profit.value.terrestrial;
          central.value = productNBA_profit.value.central;

          if (chack_status.value === true) {
            const position = item_product.value.findIndex(
              (el) => el._id === productNBA_id.value
            );
            item_product.value.splice(position, 1, productNBA.value);
          }
        });
    };
    const fetchCategory = async () => {
      await axios
        .get(
          `${process.env.VUE_APP_SHOP}category`,

          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          item_category.value = res.data.data;
          console.log(item_category.value);
        });
    };
    const fetchType = async () => {
      await axios
        .get(
          `${process.env.VUE_APP_SHOP}type`,

          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          item_type.value = res.data.data;
          console.log(item_type.value);
        });
    };
    const fetchDealer = async () => {
      await axios
        .get(
          `${process.env.VUE_APP_SHOP}dealer`,

          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          item_dealer.value = res.data.data;
          console.log(item_dealer.value);
          fetchBrand();
        });
    };
    const fetchBrand = async () => {
      const dealer_id = productNBA.value.productNBA_dealer_id;
      await axios
        .get(`${process.env.VUE_APP_SHOP}brand/dealer/${dealer_id}`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          item_brand.value = res.data.data;
        })
        .catch((e) => {
          if (e.response.status === 408) {
            window.location.reload();
          }
        });
    };
    const chooseStore = () => {
      console.log(productNBA.value.productNBA_store);
      if (productNBA.value.productNBA_store === "dealer") {
        fetchDealer();
      } else {
        item_dealer.value = [];
        item_brand.value = [];
      }
    };
    const chooseDealer = () => {
      console.log(product.value.productNBA_dealer_id);
      fetchDealer();
    };
    const calculateProfit = async () => {
      
      const sum =
        productNBA.value.productNBA_price -
        productNBA.value.productNBA_cost;

      const profit_NBA = productNBA.value.productNBA_cost - productNBA.value.productNBA_cost_nba;

      const sum1 = (sum * 10) / 100; //หักส่วนแบ่ง 10%
      const final = ((((sum - sum1) * 20) / 100) + profit_NBA);  //NBA

      const profitNBA = Number(final.toFixed(2));
      const difference = Number(sum.toFixed(2));
      const share = Number(sum1.toFixed(2));
      productNBA_more.value.difference = difference;
      productNBA_more.value.share = share;
      productNBA_profit.value.nba = profitNBA;
      const response = await axios.get(
        `${
          process.env.VUE_APP_SHOP
        }percent-profit/${"637ef06a7e98ac71b872197d"}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const percent = response.data.data;
      const profit = productNBA_more.value.share;

      const platform_p = (profit * percent.percent.platform) / 100;
      const terrestrial_p = (profit * percent.percent.terrestrial) / 100;
      const central_p = (profit * percent.percent.central) / 100;

      const pf = {
        level_owner: (platform_p * percent.percent_platform.level_owner) / 100,
        level_one: (platform_p * percent.percent_platform.level_one) / 100,
        level_two: (platform_p * percent.percent_platform.level_two) / 100,
        level_tree: (platform_p * percent.percent_platform.level_tree) / 100,
      };
      const ter = {
        bonus: (terrestrial_p * percent.percent_terrestrial.bonus) / 100,
      };
      const cent = {
        central: (central_p * percent.percent_central.central) / 100,
        allsale: (central_p * percent.percent_central.allsale) / 100,
      };

      platform.value = pf;
      terrestrial.value = ter;
      central.value = cent;
    };
    const updateProduct = () => {
      productNBA_profit.value.platform = platform.value;
      productNBA_profit.value.terrestrial = terrestrial.value;
      productNBA_profit.value.central = central.value;
      productNBA.value.productNBA_profit = productNBA_profit.value;
      productNBA.value.productNBA_more = productNBA_more.value;
      productNBA.value.productNBA_unit_ref = productNBA_unit_ref.value;

      confirm.require({
        message: "ต้องการอัพเดทข้อมูลสินค้านี้?",
        header: "ยืนยันอัพเดท",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          await axios
            .put(
              `${process.env.VUE_APP_SHOP}product/nba/${productNBA_id.value}`,
              productNBA.value,
              {
                headers: {
                  "auth-token": localStorage.getItem("token"),
                },
              }
            )
            .then(() => {
              const position = item_product.value.findIndex(
                (el) => el._id === productNBA_id.value
              );
              item_product.value.splice(position, 1, productNBA.value);
              toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "อัพเดทข้อมูลสินค้าเรียบร้อยแล้ว",
                life: 3000,
              });
              visibleFull.value = false;
            });
        },
      });
    };
    const switchstatus = async () => {
      let status = false;
      if (!productNBA.value.productNBA_alcohol_status) {
        status = true;
      }
      productNBA.value.productNBA_alcohol_status = status;

      await axios
        .put(
          `${process.env.VUE_APP_SHOP}product/nba/${productNBA_id.value}`,
          { productNBA_alcohol_status: status },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เปลี่ยนสถานะข้อมูลสินค้าเรียบร้อยแล้ว",
            life: 3000,
          });
        })
        .catch((e) => {
          if (e.response.status === 408) {
            window.location.reload();
          }
          toast.add({
            severity: "error",
            summary: "แจ้งเตือน",
            detail: e.response.data.message,
            life: 3000,
          });
        });
    };
    const changePackStatus = async () => {
      if (productNBA.value.productNBA_pack_status) {
        if (
          productNBA.value.productNBA_unit_ref.barcode === "" ||
          productNBA.value.productNBA_unit_ref.barcode === null
        ) {
          toast.add({
            severity: "error",
            summary: "ผิดพลาด",
            detail: "จะต้องทำการเพิ่ม หน่วยสินค้าก่อน",
            life: 3000,
          });
          productNBA.value.productNBA_pack_status = false;
          return false;
        }
      }
      const data_status = {
        productNBA_pack_status: productNBA.value.productNBA_pack_status,
      };
      await axios
        .put(
          `${process.env.VUE_APP_SHOP}product/nba/${productNBA_id.value}`,
          data_status,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          toast.add({
            severity: "success",
            summary: "อัพเดตสำเร็จ",
            detail: "อัพเดตสถานะรูปแบบการขายเรียบร้อยแล้ว",
            life: 3000,
          });
        })
        .catch((err) => {
          if (err.response.status === 408) {
            window.location.reload();
          }
          toast.add({
            severity: "error",
            summary: "ผิดพลาด",
            detail: err.response.data.message,
            life: 3000,
          });
        });
    };
    const getImage = (data) => {
      if (data) {
        return "https://drive.google.com/uc?export=view&id=" + data;
      }
    };
    const getImageUnitRef = (barcode) => {
      const product = item_product.value.find(
        (el) => el.productNBA_barcode === barcode
      );
      if (product) {
        return getImage(product.productNBA_image);
      }
    };
    const getnameRef = (barcode) => {
      const product = item_product.value.find(
        (el) => el.productNBA_barcode === barcode
      );
      if (product) {
        return product.productNBA_name;
      }
    };
    const openDialogUnitRef = () => {
      if (productNBA_unit_ref.value.barcode === "") {
        unit_amount.value = null;
        unit_barcode.value = "";
        product_ref.value = null;
        actionProductRef.value = "add";
        dialogUnitRef.value = true;
      } else {
        const product = item_product.value.find(
          (el) => el.productNBA_barcode === productNBA_unit_ref.value.barcode
        );
        if (product) {
          unit_amount.value = productNBA_unit_ref.value.amount;
          unit_barcode.value = productNBA_unit_ref.value.barcode;
          product_ref.value = product;
          unit_amount.value = null;
          unit_barcode.value = "";
          actionProductRef.value = "update";
        } else {
          unit_amount.value = null;
          unit_barcode.value = "";
          product_ref.value = null;
        }

        dialogUnitRef.value = true;
      }
    };
    const findProductRef = () => {
      console.log(unit_barcode.value);
      if (unit_barcode.value === "") {
        toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณากรอกรหัสสินค้าหรือบาร์โค้ด",
          life: 3000,
        });
        return false;
      }
      const product = item_product.value.find(
        (el) => el.productNBA_barcode === unit_barcode.value
      );
      if (product) {
        product_ref.value = product;
        console.log(product_ref.value);
      } else {
        toast.add({
          severity: "error",
          summary: "ผิดพพลาด",
          detail: "ไม่พบรหัสสินหรือบาร์โค้ดสินค้านี้",
          life: 3000,
        });
      }
    };
    const addProductRef = () => {
      if (unit_barcode.value === "" || product_ref.value === null) {
        toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณาสแกนบาร์โค้ดหรือกรอกรหัสสินค้า และ กด ENTER",
          life: 3000,
        });
        return false;
      }
      if (unit_amount.value === null) {
        toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณากรอกจำนวนสินค้าชิ้นหรือหน่วยย่อย",
          life: 3000,
        });
        return false;
      }
      if (unit_amount.value <= 1) {
        toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "จำนวนสินค้าจะต้องมากกว่า 1 ขึ้นไป",
          life: 3000,
        });
        return false;
      }
      confirm.require({
        message:
          "ได้ทำการตรวจสอบข้อมูลเรียบร้อยและยืนยันการเพิ่มสินค้าย่อยของสินค้านี้?",
        header: "ยืนยันการเพิ่ม",
        acceptLabel: "ตกลง",
        rejectLabel: "ยกเลิก",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          const config = {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          };

          const data_update = {
            barcode: product_ref.value.productNBA_barcode,
            amount: unit_amount.value,
          };
          await axios
            .put(
              `${process.env.VUE_APP_SHOP}product/nba/${productNBA_id.value}`,
              {
                productNBA_unit_ref: data_update,
              },
              config
            )
            .then(() => {
              productNBA_unit_ref.value.barcode =
                product_ref.value.productNBA_barcode;
              productNBA_unit_ref.value.amount = unit_amount.value;
              dialogUnitRef.value = false;
              unit_amount.value = null;
              unit_barcode.value = "";
              product_ref.value = null;
              toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ทำการเพิ่มข้อมูลสินค้าย่อยเรียบร้อยแล้ว",
                life: 3000,
              });
            })
            .catch((err) => {
              if (err.response.status === 408) {
                window.location.reload();
              }
              this.$toast.add({
                severity: "error",
                summary: "ผิดพลาด",
                detail: err.response.data.message,
                life: 3000,
              });
            });
        },
      });
    };
    const updateProductRef = () => {
      if (unit_barcode.value === "" || product_ref.value === null) {
        toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณาสแกนบาร์โค้ดหรือกรอกรหัสสินค้า และ กด ENTER",
          life: 3000,
        });
        return false;
      }
      if (unit_amount.value === null) {
        toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณากรอกจำนวนสินค้าชิ้นหรือหน่วยย่อย",
          life: 3000,
        });
        return false;
      }
      if (unit_amount.value <= 1) {
        toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "จำนวนสินค้าจะต้องมากกว่า 1 ขึ้นไป",
          life: 3000,
        });
        return false;
      }
      confirm.require({
        message:
          "ได้ทำการตรวจสอบข้อมูลเรียบร้อยและอัพเดตแก้ไขสินค้าย่อยของสินค้านี้?",
        header: "ยืนยันอัพเดตสินค้าย่อย",
        acceptLabel: "ตกลง",
        rejectLabel: "ยกเลิก",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          const config = {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          };
          const data_update = {
            barcode: product_ref.value.productNBA_barcode,
            amount: unit_amount.value,
          };
          await axios
            .put(
              `${process.env.VUE_APP_SHOP}product/nba/${productNBA_id.value}`,
              {
                productNBA_unit_ref: data_update,
              },
              config
            )
            .then(() => {
              productNBA_unit_ref.value.barcode =
                product_ref.value.productNBA_barcode;
              productNBA_unit_ref.value.amount = unit_amount.value;
              dialogUnitRef.value = false;
              unit_amount.value = null;
              unit_barcode.value = "";
              product_ref.value = null;
              toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ทำการเพิ่มข้อมูลสินค้าย่อยเรียบร้อยแล้ว",
                life: 3000,
              });
            })
            .catch((err) => {
              if (err.response.status === 408) {
                window.location.reload();
              }
              this.$toast.add({
                severity: "error",
                summary: "ผิดพลาด",
                detail: err.response.data.message,
                life: 3000,
              });
            });
        },
      });
    };
    const delproductRef = () => {
      const ref = {
        amount: 0,
        barcode: "",
      };

      confirm.require({
        message: "คุณต้องการลบรายการสินค้าย่อยนี้",
        header: "ยืนยันการทำรายการ",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: () => {
          productNBA_unit_ref.value = ref;
          console.log(product.value);
          toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "การทำรายการสำเร็จ",
            life: 3000,
          });
        },
      });
    };

    return {
      delproductRef,
      visibleFull,
      dialogUnitRef,
      actionProductRef,
      uploadLoading,
      calculateProfit,
      updateProduct,
      openvisibleFull,
      openDialogUnitRef,
      switchstatus,
      changePackStatus,
      findProductRef,
      getImageUnitRef,
      getnameRef,
      getImage,
      addProductRef,
      updateProductRef,
      img,
      item_status_type,
      item_company,
      item_category,
      item_type,
      item_dealer,
      item_brand,
      productNBA,
      productNBA_more,
      productNBA_profit,
      productNBA_unit_ref,
      platform,
      terrestrial,
      central,
      chooseImg,
      chooseStore,
      chooseDealer,
      product_ref,
      unit_amount,
      unit_barcode,
    };
  },
  data() {
    return {
      data: "value",
    };
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
};
</script>

<style lang="scss" scoped></style>
