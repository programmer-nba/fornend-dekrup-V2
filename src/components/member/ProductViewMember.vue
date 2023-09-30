<template>
    <h1 class="px-3" style="color:#FE0000;"> สั่งซื้อสินค้า </h1>
    <div class="grid">
        <div class="col-6  mt-2 ">
            <div class="field">
                <div class="p-inputgroup">
                    <span class="p-float-label">
                        <InputText v-model="search"
                            class="w-4rem font border-red-700 input-search-sercice border-round-3xl text-red-800"
                            style="background-color: #FFE5E5;" />
                        <label class="text-red-800 px-3">ค้นหา</label>
                    </span>
                </div>
            </div>
        </div>
        <div class="col  mt-2 ">
            <div class="field">
              <div class="card flex justify-content-start">
                <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-14rem" />
    </div>

            </div>
        </div>
    </div>
    <div class="grid ">
      
    <div class="col-6 md:col-4 lg:col-3  ">
      <div class="card-background">
        <img src="@/assets/img/green.png" class="img-modal-product-preview"  />
              <strong class="txt-head">Sprite สีเขียว</strong>
        <p class="txt-category">หมวดหมู่ <span>เครื่องดื่ม</span></p>
        <p class="txt-price">ราคา <span>350</span> บาท</p>
        <div class="flex">
          <Button severity="warning" icon="pi pi-shopping-cart" style="margin-right: 5px;"  @click="addNumberProduct = true"/>
          <Button @click="visible = true" class="btn-description"  label="รายละเอียด" severity="danger"/>
        </div>
      </div>
    </div>

    </div>


    
    <Dialog v-model:visible="addNumberProduct" modal header="Header" :style="{ width: '50vw' }">
 <InputNumber v-model="value2" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" />
   

 <template #footer>
        <Button label="ปิด" icon="pi pi-times" @click="addNumberProduct = false" text />
    </template>


</Dialog>
          


    <Dialog :visible="visible" @update:visible="val => visible = val" modal header="สินค้าของเรา" style="width: 100vh;">
    <div class=" px-2 border-round text-white font-bold flex justify-content-center">
                <div class="card border-none txt-font-faimily">
                    <div class="grid">
                    
                      <div class="md:col-4 col-12">
                            <Image alt="Image" preview>
                                <template #indicatoricon>
                                    <i class="pi pi-eye"></i>
                                </template>
                                <template #image>
                                    <img src="@/assets/img/green.png" class="img-modal-product" alt="image" />
                                </template>
                                <template #preview="slotProps">
                                    <img src="@/assets/img/green.png" class="img-modal-product-preview"  alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                </template>
                            </Image>
                      </div>
                      <div class="md:col-4 col-12">
                            <Image alt="Image" preview>
                                <template #indicatoricon>
                                    <i class="pi pi-eye"></i>
                                </template>
                                <template #image>
                                    <img src="@/assets/img/green.png" class="img-modal-product" alt="image" />
                                </template>
                                <template #preview="slotProps">
                                    <img src="@/assets/img/green.png" class="img-modal-product-preview" :style="slotProps.style" @click="slotProps.onClick" />
                                </template>
                            </Image>
                      </div>
                      <div class="md:col-4 col-12">
                            <Image alt="Image" preview>
                                <template #indicatoricon>
                                    <i class="pi pi-eye"></i>
                                </template>
                                <template #image>
                                    <img src="@/assets/img/green.png" class="img-modal-product" alt="image" />
                                </template>
                                <template #preview="slotProps">
                                    <img src="@/assets/img/green.png" class="img-modal-product-preview" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                </template>
                            </Image>
                      </div>            
                    </div>
                    <div class="card-head ">
                        <p class=" text-red-500 text-xl " style="-webkit-text-stroke: 1px;">ขวดน้ำ Sprite สีเขียว</p>
                        <small class="text-600" style="font-size: 14px; -webkit-text-stroke: 1px;">รหัสสินค้า</small> <br>
                        <small class="text-600" style="font-size: 14px; -webkit-text-stroke: 1px;">หมวดหมู่</small>
                    </div>
                    <div class="my-2">
                        <label class="text-700 " for="" style="font-size: 20px; -webkit-text-stroke: 1px;">รายละเอียดสินค้า</label>
                        
                    </div>
                    <small class="text-700  " for="" style="font-size: 18px;">ซึ่งเป็นผลิตภัณฑ์จากนวัตกรรมใหม่ล่าสุดที่จะมาเติมความสดชื่น พร้อมเสริมคุณประโยชน์ด้วยวิตามิน B3 สูง และที่สำคัญคือ ไม่มีน้ำตาล และไม่มีแคลอรี. โดยเปิดตัวในประเทศไทย และออสเตรเลีย</small>
                    <div class="my-2">
                        <label class="text-red-500" for="" style="font-size: 24px; -webkit-text-stroke: 1px;">ราคา 350 บาท</label>
                        
                    </div>
                </div>
            </div>
    <template #footer>
        <Button label="ปิด" icon="pi pi-times" @click="visible = false" text />
    </template>
</Dialog>
</template>
  
<script setup>
import { ref } from "vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Image from 'primevue/image';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';



const addNumberProduct = ref(false);
const visible = ref(false);




const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);








</script>

<style scoped>
.txt-font-faimily{
  font-family: 'Kanit', sans-serif;
  
}

.p-dropdown{
    border: 2px solid red;
}
.p-inputtext {
    font-family: 'Kanit', sans-serif;
    border: 2px solid #ff0000;
    box-shadow: rgba(173, 8, 8, 0.24) 0px 3px 8px;
    border-radius: 50px;
    width: 450px;
    color: red;
}

.txt-head{
  color: red;
  font-size: 25px;
  -webkit-text-stroke: 0.5px;
}
.txt-category{
  font-size: 15px;
  color: rgb(116, 113, 113);
  -webkit-text-stroke: 0.5px;
}
.txt-price{
  font-size: 18px;
  padding-top: 20px;
  color: #706a6a;
  -webkit-text-stroke: 0.5px;
}

.btn-cart{
  border-radius:10px;
  /* background: rgb(255, 174, 0); */
  border: none;
  width: 40%;
}
.btn-description{
  border-radius: 10px;
  width: 80%;
  background: red;
  font-family: 'Kanit', sans-serif;
}

.p-dropdown {
    border-radius: 50px !important;
}
.card-background{
  background: #FFF1F1;
  width: 100%;
  height: auto;
  padding: 15px;
}

.img-modal-product{
  width: 100%;
}

.img-modal-product{
  width: 50%;
}

.img-modal-product-preview{
  width: 100%;
}


@media only screen and (max-width:576px){
  
  .txt-head{
  font-size: 16px;
}
.txt-category{
  font-size: 12px;
}
.txt-price{
  font-size: 15px;
}
.btn-cart{
  width: 50%;
}
.btn-description{
  font-size: 12px;
}

.img-modal-product{
  display: block; margin-left: auto; margin-right: auto;
}
}

@media only screen and (max-width:380px){
  .btn-description{
    padding: 5px;
}
}
</style>