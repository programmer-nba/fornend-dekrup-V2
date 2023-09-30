<template>
    <div>
        <div class="grid mt-3">
            <div class="col-12">
                <h1 class="text-center">โปรไฟล์ของฉัน</h1>
            </div>
        </div>
        <div class="grid ml-2">
            <div class="col-12 lg:col-6">
                <Panel header="ข้อมูลทั่วไป" class="custom-header-panel">
                    <p><strong>ยูสเซอร์เนม :</strong> </p>
                    <Divider type="dashed"></Divider>
                    <p><strong>ชื่อ-นามสกุล :</strong> </p>
                    <Divider type="dashed"></Divider>
                    <p><strong>เบอร์โทร : </strong></p>
                    <Divider type="dashed"></Divider>
                  
                </Panel>
            </div>
            <div class="col-12 lg:col-6">
                <Panel header="เปลี่ยนรหัสผ่าน" class="custom-header-panel">
                    <!-- <div class="grid ">
                        <div class="col-12">
                            <div class="field">
                                <label>เปลี่ยนรหัสผ่านใหม่ :</label>
                                <Password v-model="password" inputClass="font" inputStyle="width: 100%;" class="w-full" placeholder="กรอกรหัสผ่านที่ต้องการเปลี่ยน"/>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-12">
                            <div class="field">
                                <label>ยืนยันรหัสผ่านใหม่อีกครั้ง :</label>
                                <InputText type="password" v-model="confirm_password" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง" class="font w-full"/>
                            </div>
                        </div>
                    </div> -->
                    <Button label="เปลี่ยนรหัสผ่าน"   class="bg-red-500 border-none"/>
                </Panel>
            </div>
        </div>
    </div>
</template>



<style >
.custom-header-panel .p-panel-header {
    background-color: #FE0000;
    color: aliceblue;
    border: none;
}
/* .custom-header-panel .p-panel-content {
    color: #FE0000;
} */
</style>