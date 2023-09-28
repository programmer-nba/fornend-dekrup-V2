
<template>
    <div class="img-login">
      <div class="background-login">
          <img class="img-logo" src="../../assets/img/Deekrub.png">
        <div class="flex justify-content-center mb-5">
          <span class="p-float-label w-full">
            <InputText class="" id="username" v-model="username" />
            <label for="username">กรุณากรอกยูสเซอร์เนม</label>
          </span>
        </div>
  
  
  
        <div class="flex justify-content-center mb-1">
          <span class="p-float-label">
            <Password v-model="password" inputId="password" :feedback="false" class="w-full" toogleMask  />
            <label for="password">กรุณากรอกรหัสผ่าน</label>
          </span>
        </div>
  
        <div class="flex justify-content-between mb-5">
          <div><a href="/register" class="font-color" >สมัครสมาชิก</a></div>
          <div><a href="/forgotpassword" class="font-color" >ลืมรหัสผ่าน</a></div>
        </div>
  
        <div class="flex justify-content-center">
          <Button label="เข้าสู่ระบบ" style="font-family: 'Kanit', sans-serif;" class="button-login" severity="success" />
        </div>
      </div>
    </div>
  </template>
  
    
  
  
  
    <script setup lang="ts">
  import Password from "primevue/password";
  import { ref } from "vue";
  
  const username = ref(null);
  const password = ref(null);
  </script>
    
  <style scoped>
  
  
  .img-login {
      width: 100%;
    background: url("../../assets/img/backgrond.jpg");
    height: 100vh;
    background-size: cover; /* This will cover the entire container */
    background-repeat: no-repeat;
    background-position: center center; /* Center the image horizontally and vertically */
    display: flex;
    align-items: center;
  }
  .background-login {
   
    background: rgba(255, 255, 255, 0.295);
    margin-left: auto;
    margin-right: 18%;
    padding: 3%;
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 25px;
    border: 3px solid #ffff;
  }
  .p-component {
    width: -webkit-fill-available;
    z-index: 1;
  }
  .font-color{
      color: #ffff;
      -webkit-text-stroke: 0.5px;
  }
  .img-logo{
      width: 100px;
      margin-left: 25%;
      margin-bottom: 5%;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
  }
  @media only screen and (max-width:1200px) {
      .background-login {
      background: rgb(235 191 191 / 43%);
      margin-left: auto;
      margin-right: 12%;
      padding: 3%;
      padding-top: 50px;
      padding-bottom: 50px;
      border-radius: 25px;
      border: 3px solid #bf1212;
  }
  }
  @media only screen and (max-width:576px) {
      .background-login {
      background: rgba(255, 255, 255, 0.795);
      margin-left: auto;
      margin-right: auto;
      padding: 12%;
      border-radius: 25px;
      border: 3px solid #bf1212;
  }
  .font-color{
  color: #db0000;
  }}
  </style>