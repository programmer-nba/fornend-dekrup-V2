<template>
    <div class="mt-4">
        <h1 class="mdLm-0 text-center">Commision Register (Day)</h1>
        <p class="mt-0 text-center"><strong>หมายเหตุ : </strong>ค่าคอมมิชชั่นจากการแนะนำผู้สมัคร</p>
        <CommissionDay/>
    </div>
</template>
    
<script>
import CommissionDay from "@/components/member/money/HistoryRegisterDay.vue";

export default {

    components: {
        CommissionDay,
    },
    async mounted() {
        
    },
    async created() {
        document.title = "รายได้คอมมิชชั่นสะสม";
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