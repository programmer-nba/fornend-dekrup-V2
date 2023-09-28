<template>
    <div class="img-login">
      <div class="background-login">
        <img class="img-logo" src="../assets/img/Deekrub.png" />
  
        <h2 class="text-center font-reset mb-3">สมัครสมาชิก</h2>
  
        <div class="grid">
          <div class="sm:col-12 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-user"></i>
              </span>
              <InputText placeholder="ชื่อ-นามสกุล" class="style-font" />
              </div>
          </div>
          <div class="sm:col-12 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-phone"></i>
              </span>
              <InputText placeholder="เบอร์โทรศัพท์" class="style-font" />
              
  
              </div>
          </div>
      
          <div class="sm:col-6 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-user-edit"></i>
              </span>
              <InputText placeholder="ยูสเซอร์เนม" class="style-font" />
              </div>
          </div>
          <div class="sm:col-6 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-key"></i>
              </span>
              <Password v-model="password" toggleMask placeholder="รหัสผ่าน" class="style-font" />
              </div>
          </div>
  
  
          <div class="sm:col-12 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-map-marker"></i>
              </span>
              <InputText placeholder="ที่อยู่" class="style-font" />
              </div>
          </div>
          <div class="sm:col-6 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-map-marker"></i>
              </span>
              <div class="card flex justify-content-center">
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="เลือกจังหวัด" class="w-full w-14rem md:w-16rem" />
      </div>
              </div>
          </div>
          <div class="sm:col-6 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-map-marker"></i>
              </span>
              <div class="card flex justify-content-center">
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="เลือกอำเภอ" class="w-full w-14rem md:w-16rem" />
      </div>
              </div>
          </div>
          <div class="sm:col-6 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-map-marker"></i>
              </span>
              <div class="card flex justify-content-center">
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="เลือกตำบล" class="w-full w-14rem md:w-16rem" />
      </div>
              </div>
          </div>
          <div class="sm:col-6 col-12">
              <div class="p-inputgroup flex-1">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-map-marker"></i>
              </span>
              <div class="card flex justify-content-center">
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="เลือกรหัสไปรษณ์" class="w-full w-14rem md:w-16rem" />
      </div>
              </div>
          </div>
          
        </div>
  
       
  
        <div class="flex justify-content-center">
          <Button
            label="สมัครสมาชิก"
            style="font-family: 'Kanit', sans-serif;   width: -webkit-fill-available;"
            class="button-login mt-5"
            severity="danger"
  
          />
        </div>
      </div>
    </div>
  </template>
    
      
    
    
  <script setup>
  import { ref } from "vue";
  import Dropdown from 'primevue/dropdown';
  
  import Password from "primevue/password";
  import Button from "primevue/button";
  
  
  // const name = ref(null);
  // const tel = ref(null);
  // const username = ref(null);
  // const password = ref(null);
  // const address = ref(null);
  // const subdistrict = ref(null);
  // const district = ref(null);
  // const province = ref(null);
  // const postcode = ref(null);
  
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
    .style-font{
      font-family: 'Kanit', sans-serif;
    
    }
  .img-login {
    width: 100%;
    background: url("../assets/img/backgrond.jpg");
    height: 100vh;
    background-size: cover; /* This will cover the entire container */
    background-repeat: no-repeat;
    background-position: center center; /* Center the image horizontally and vertically */
    display: flex;
    align-items: center;
    
  }
  .background-login {
    background: rgb(255, 255, 255);
    margin-left: auto;
    margin-right: 3%;
    padding: 3%;
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 25px;
    border: 3px solid #ffff;
    width: 40%;
  }
  
  .font-reset {
    color: #ec0606;
    -webkit-text-stroke: 0.5px;
  }
  .img-logo {
    width: 100px;
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 5%;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
  }
  
  .p-inputgroup-addon {
      background: #ff0000;
      color: #ffffff;
      border-top: 1px solid #ff0000;
      border-left: 1px solid #ff0000;
      border-bottom: 1px solid #ff0000;
      padding: 0.75rem 0.75rem;
      min-width: 3rem;
  }
  @media only screen and (max-width: 1200px) {
      .background-login {
      margin-left: auto;
      margin-right: auto;
      width: 60%;
      background: #ffffffde;
  }
  }
  @media only screen and (max-width: 576px) {
      .img-login {
    width: 100%;
  height: auto;
  }
  
  .background-login{
      width: 80%;
      margin-top: 5%;
  }
  }
  </style>