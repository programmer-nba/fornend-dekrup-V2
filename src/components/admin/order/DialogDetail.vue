<template>
  <Button
    label="รายละเอียด"
    class="p-button-outlined p-button-sm p-button-info text-sm mr-2"
    icon="pi pi-search"
    @click="(displayDetail = true), open_display()"
  />
  <Dialog
    header="ลายละเอียด"
    v-model:visible="displayDetail"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '45vw' }"
    :modal="true"
    :closeOnEscape="true"
  >
    <div class="loading" v-if="isLoading === true">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <table>
        <tr style="height: 2.5rem">
          <td class="font-medium text-base text-600">บาร์โค้ด</td>
          <td class="font-medium text-base text-900">{{ order.barcode }}</td>
        </tr>
        <tr style="height: 2.5rem">
          <td class="font-medium text-base text-600">ร้านค้า</td>
          <td>
            <div class="flex align-items-center">
              <img
                :src="logo + get_img(order.shop_id)"
                alt="Image"
                class="inline mr-2"
                style="height: 1.5rem; width: 1.5rem"
              />
              <span class="font-medium text-base text-900">
                {{ get_Shopname(order.shop_id) }}
              </span>
            </div>
          </td>
        </tr>
        <tr style="height: 2.5rem">
          <td class="font-medium text-base text-600">ผู้ส่ง</td>
          <td class="font-medium text-base text-900">
            {{ get_dealername(order.dealer_id) }}
          </td>
        </tr>

        <tr style="height: 2.5rem">
          <td class="font-medium text-base text-600">สถานะ</td>
          <td>
            <Tag
              :class="status(order.status_now)"
              :value="order.status_now"
            ></Tag>
          </td>
        </tr>
        <tr style="height: 2.5rem" v-if="order.tracking_code !== 'ไม่มี'">
          <td class="font-medium text-base text-600">ขนส่ง</td>
          <td>
            {{ order.tracking_code }}
          </td>
        </tr>
        <tr style="height: 2.5rem" v-if="order.tracking_number !== 'ไม่มี'">
          <td class="font-medium text-base text-600">Traking Number</td>
          <td>
            <Tag :value="order.tracking_number"></Tag>
          </td>
        </tr>
      </table>
      <Divider />
      <table class="table-p">
        <thead>
          <tr>
            <th>#</th>
            <th>รหัสสินค้า</th>
            <th>ชื่อสินค้าสินค้า</th>
            <th>แบรนด์</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>รวม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.product_detail" :key="item">
            <td>{{ index + 1 }}</td>
            <td>{{ item.productNBA_barcode }}</td>
            <td>{{ item.productNBA_name }}</td>
            <td>{{ get_brandname(item.productNBA_brand_id) }}</td>
            <td>{{ numberFormat(item.productNBA_cost) }}</td>
            <td class="text-center">{{ item.amount }}</td>
            <td>{{ numberFormat(item.total) }}</td>
          </tr>
        </tbody>
      </table>
      <Divider />
    </div>
    <template
      #footer
      v-if="
        order.status_now !== 'ระหว่างจัดส่ง' &&
        order.status_now !== 'นำเข้าสต๊อก'
      "
    >
      <Button
        label="No"
        icon="pi pi-times"
        @click="displayDetail = false"
        class="p-button-text"
      />
      <Button
        label="ยืนยันการส่งของ"
        icon="pi pi-check"
        @click="open_displayTraking"
        autofocus
      />
    </template>
  </Dialog>

  <!-- เพิ่ม Traking -->

  <Dialog
    header="ยืนยันการส่งของ"
    v-model:visible="displayTracking"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '25vw' }"
  >
    <div class="field">
      <label for="tracking_code">Tracking Code</label>
      <Dropdown
        id="tracking_code"
        v-model="tracking_code"
        :options="courier"
        optionLabel="name"
        optionValue="code"
        :editable="true"
        class="w-full"
        :filter="true"
      />
    </div>
    <div class="field">
      <label for="tracking_number">Tracking Number</label>
      <InputText
        id="tracking_number"
        type="text"
        v-model="tracking_number"
        class="w-full"
      />
    </div>
    <template #footer>
      <Button label="ตกลง" @click="confirmOrder" />
    </template>
  </Dialog>
</template>

<script setup>
import axios from "axios";
import { ref, defineProps } from "vue";
import dayjs from "dayjs";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const url = `${process.env.VUE_APP_SHOP}`;
const config = {
  headers: {
    "auth-token": localStorage.getItem("token"),
  },
};
const props = defineProps({
  order: {
    type: Object,
  },
  shops: {
    type: Array,
  },
  dealers: {
    type: Array,
  },
});
const isLoading = ref(true);
const displayDetail = ref(false);
const displayTracking = ref(false);
const courier = ref([
  { name: "ไปรษณีย์ไทย", code: "ไปรษณีย์ไทย" },
  { name: "Kerry Express", code: "Kerry" },
  { name: "Flash Express", code: "Flash" },
  { name: "Ninja Van", code: "Ninja" },
  { name: "DHL ", code: "DHL " },
]);

const order = ref([]);
const shops = ref([]);
const dealers = ref([]);
const brands = ref([]);
const logo = ref("https://drive.google.com/uc?export=view&id=");
const tracking_code = ref("");
const tracking_number = ref("");

const open_display = () => {
  order.value = props.order;
  shops.value = props.shops;
  dealers.value = props.dealers;
  fetch_brand();
  console.log(props.order);
};
const get_img = (id) => {
  const img_name = shops.value.find((el) => el._id === id);
  if (img_name) {
    return img_name.shop_logo;
  }
};
const get_Shopname = (id) => {
  const name = shops.value.find((el) => el._id === id);
  if (name) {
    return name.shop_name;
  }
};
const get_dealername = (id) => {
  const dealer = dealers.value.find((el) => el._id === id);
  console.log(dealers.value);
  if (dealer) {
    return dealer.dealer_name;
  } else return "NBA สำนักงานใหญ่";
};
const get_brandname = (id) => {
  const brand = brands.value.find((el) => el._id === id);
  if (brand) {
    return brand.brand_name;
  }
  return "NBA";
};
const status = (status) => {
  switch (status) {
    case "รอรับคำสั่งซื้อ":
      return "bg-orange-500 text-orange-50  ";
    case "ระหว่างจัดส่ง":
      return "bg-yellow-500 text-yellow-50";
    case "จัดส่งสำเร็จ":
      return "bg-green-500 text-green-50";
    case "นำเข้าสต๊อก":
      return "bg-purple-500 text-purple-50";
  }
};
const fetch_brand = async () => {
  const res = await axios.get(url + "brand", config);
  console.log(res);
  brands.value = res.data.data;
  if (res.data.status === true) {
    setTimeout(function () {
      isLoading.value = false;
    }, 500);
  }
};
const open_displayTraking = () => {
  displayTracking.value = true;
};
const confirmOrder = () => {
  if (tracking_code.value === "" || tracking_number.value === "") {
    toast.add({
      severity: "warn",
      summary: "เตือน",
      detail: "กรอกข้อมูลให้ครบถ้วน",
      life: 3000,
    });
    return false;
  }
  confirm.require({
    message: "คุณต้องการยืนยันการทำรายการนี้ ?",
    header: "ยืนยันการทำรายการ",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      const status = {
        name: "ระหว่างจัดส่ง",
        timestamp: dayjs(Date.now()).format(),
      };
      order.value.status.push(status);
      console.log(order.value);

      await axios
        .put(
          url + `order/${order.value._id}`,
          {
            tracking_code: tracking_code.value,
            tracking_number: tracking_number.value,
            status: order.value.status,
          },
          config
        )
        .then((res) => {
          if (res.data.status === true) {
            order.value.tracking_code = tracking_code.value;
            order.value.tracking_number = tracking_number.value;
            order.value.status_now = "ระหว่างจัดส่ง";
            displayTracking.value = false;
            toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "ยืนยันการทำรายการสำเร็จ",
              life: 3000,
            });
          }
        });
    },
  });
};
const numberFormat = (number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.table-p {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  padding: 10px;
  border-radius: 5px;
}
th,
td {
  padding: 5px;
  text-align: left;
}
th {
  background-color: #960e8f;
  font-weight: bold;
  color: #ffffff;
  padding: 10px;
}
</style>
