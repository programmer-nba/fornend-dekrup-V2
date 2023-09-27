<template>
    <div>
        <TableAdmin />
    </div>
</template>

<script>
import TableAdmin from '@/components/admin/TableAdmin.vue';
export default {
    components: {
        TableAdmin
    },
    created() {
        document.title = "ข้อมูลผู้ดูแลระบบ";
    },
  
}
</script>

<style>

</style>