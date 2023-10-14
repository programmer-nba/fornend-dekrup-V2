<template>
    <div class="mt-4">
        <h1 class="mdLm-0 text-center">Commision Register (Week)</h1>
        <p class="mt-0 text-center"><strong>หมายเหตุ : </strong>ค่าคอมมิชชั่นจากการแนะนำผู้สมัคร</p>
        <CommissionDay/>
    </div>
</template>
    
<script>
import CommissionDay from "@/components/member/money/HistoryRegisterWeek.vue";

export default {

    components: {
        CommissionDay,
    },
    async mounted() {
        
    },
    created() {
        document.title = "Commission Register Week | Dekrub Shop";
    },
    data: () => ({
     
        visible: false
       
    }),

    methods: {
        
    },
};
</script>
    
    
<style scoped>

</style>