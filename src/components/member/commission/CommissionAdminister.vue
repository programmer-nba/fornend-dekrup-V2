<template>
    <div class="mt-4">
        <h1 class="mdLm-0 text-center">Commision Administer</h1>
        <p class="mt-0 text-center"><strong>หมายเหตุ : </strong>ค่าคอมมิชชั่นจากการซื้อสินค้าของผู้แนะนำ</p>
        <CommissionWeek/>
    </div>
</template>
    
<script>
import CommissionWeek from "@/components/member/money/HistoryAdminister.vue";

export default {

    components: {
        CommissionWeek,
    },
    async mounted() {
        
    },
    created() {
        document.title = "Commission Administer | Dekrub Shop";
    },
    data: () => ({
        
    }),

    methods: {
        
    },
};
</script>
    
    
<style scoped>

</style>