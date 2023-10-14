<template>
  <div class="size-datatable">
    <DataTable :value="item_commission" :paginator="true" :rows="20">
      <template #empty>
        <p class="text-center"><em>-- ไม่พบข้อมูล --</em></p>
      </template>
      <Column header="#">
        <template #body="item">
          {{ item.index + 1 }}
        </template>
      </Column>
      <Column header="ผู้รับคอมมิชชั่น">
        <template #body="item">
          รหัสสมาชิก - {{ getLastNumber(item.data.data) }}
        </template>
      </Column>
      <Column header="ค่าคอมมิชชั่น (ก่อนหักภาษี)">
        <template #body="item">
          {{ numberDigitFormat(getLastCom(item.data.data)) }}
        </template>
      </Column>
      <Column header="ภาษี ณ ที่จ่าย 3%">
        <template #body="item">
          {{ numberDigitFormat(getLastVat(item.data.data)) }}
        </template>
      </Column>
      <Column header="ค่าคอมมิชชั่น (หลังหักภาษี)">
        <template #body="item">
          {{ numberDigitFormat(getLastComnet(item.data.data)) }}
        </template>
      </Column>
      <Column header="ได้รับจาก">
        <template #body="item">
          รหัสสมาชิก - {{ item.data.from_member }}
        </template>
      </Column>
      <Column header="วันที่">
        <template #body="item">
          {{ datetimeFormat(item.data.timestamp) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>

import dayjs from 'dayjs';
import { CommissionMember } from '@/service/commission.member';

export default {
  data: () => ({
    item_commission: '',
    member: '',
  }),
  setup() {
    const commissions = new CommissionMember();
    return { commissions }
  },
  async mounted() {
    await this.getCommissionWeek();
  },
  methods: {
    async getCommissionWeek() {
      this.$store.commit('setLoading', true);
      await this.commissions.getMe().then(async result => {
        this.member_number = result.data.member_number;
        await this.commissions.getComRegisterWeek().then(result => {
          const order = result.data;
          const id = this.member_number;
          const order_list = order.filter(
            (item) => item.data[0].member_number === id
          )
          this.item_commission = order_list.reverse();
        })
      }).catch((err) => {
        this.$store.commit('setLoading', false);
        this.$toast.add({ severity: 'error', summary: 'ผิดพลาด', detail: err.response.data.message, life: 3000 })
      })
    },

    getLastNumber(item) {
      const data = item[item.length - 1].member_number;
      return data
    },

    getLastCom(item) {
      const data = item[item.length - 1].commission;
      return data
    },

    getLastVat(item) {
      const data = item[item.length - 1].vat3percent;
      return data
    },

    getLastComnet(item) {
      const data = item[item.length - 1].remainding_commission;
      return data
    },

    datetimeFormat(date) {
      return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
    },

    numberDigitFormat(num) {
      return num.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    },
  },

};
</script>


<style>
.size-datatable {
  width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.p-datatable .p-datatable-thead>tr>th {
  background-color: #d9d9d9 !important;
  color: #ce0606 !important;
}
</style>