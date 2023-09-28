<template>
  <div>
    <NavbarView />
    <div>
      <img class="img-banner" src="../assets/img/banner2.jpg">
    </div>
    <div class="content-center">
      <div class="content">
        <p class="txt-head">เลื่อนดูผลิตภัณฑ์เพิ่มเติม</p>
        <p class="txt-head">เลื่อนดูผลิตภัณฑ์เพิ่มเติม</p>
      </div>
    </div>
    <ImageSlide></ImageSlide>
    <div class="text-center">
      <a href="/aboutview" class="text-center txt-more">ดูสินค้าของเราทั้งหมดที่นี่ <i class="pi pi-arrow-right"></i></a>
    </div>
    <div class="txt-margin-dkrub">
      <p class="txt-sme">โครงการ SME ดีครับ</p>
      <p class="txt-description">วิสาหกิจขนาดกลางและขนาดย่อม เป็นธุรกิจที่มีรายได้ สินทรัพย์และพนักงานจำนวนน้อย
        ดำเนินธุรกิจโดยผู้ประกอบการรายย่อย ผู้ประกอบการ sme</p>
    </div>
    <FooterView></FooterView>
  </div>
</template>
  
<script >
//   import Menubar from "primevue/menubar";
// import Imageslide from "@/views/imageslide.vue";
// import FooterView from "@/views/FooterView.vue";
import NavbarView from "./NavbarView.vue";
import ImageSlide from "./ImageSlideView.vue";

export default {
  components: {
    NavbarView,
    ImageSlide,
  }
}
</script>
  
  
<style scoped>
/* .body{
    overflow-x: hidden !important;
  } */
.content-center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: 4%;
}

.content {
  position: relative;
  white-space: nowrap;
  text-align: center;
  /* เพิ่มบรรทัดนี้ */
}

.content .txt-head {
  color: #fff;
  font-size: 50px;
  position: absolute;
  transform: translate(-50%, -20%);
}

.content .txt-head:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 1px #f08e8e;
}

.content .txt-head:nth-child(2) {
  color: #ff0000;
  animation: animate 4s infinite;
}

@keyframes animate {

  0%,
  100% {
    clip-path: polygon(0% 45%,
        16% 44%,
        33% 50%,
        54% 60%,
        70% 61%,
        84% 59%,
        100% 52%,
        100% 100%,
        0% 100%);
  }

  50% {
    clip-path: polygon(0% 60%,
        15% 65%,
        34% 66%,
        51% 62%,
        67% 50%,
        84% 45%,
        100% 46%,
        100% 100%,
        0% 100%);
  }
}


@keyframes animate {

  0%,
  100% {
    clip-path: polygon(0% 45%,
        16% 44%,
        33% 50%,
        54% 60%,
        70% 61%,
        84% 59%,
        100% 52%,
        100% 100%,
        0% 100%);
  }

  50% {
    clip-path: polygon(0% 60%,
        15% 65%,
        34% 66%,
        51% 62%,
        67% 50%,
        84% 45%,
        100% 46%,
        100% 100%,
        0% 100%);
  }
}

.txt-head {
  color: #eb0606;
  font-size: 45px;
  -webkit-text-stroke: 1.5px;
  margin-top: 5%;
  margin-bottom: 2%;
}

.img-banner {
  width: 100%;
}

.txt-margin-dkrub {
  width: 50%;
  height: auto;
  margin-top: 10%;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.txt-description {
  font-size: 25px;
  -webkit-text-stroke: 1px;

}

.txt-sme {
  text-transform: uppercase;
  background-image: linear-gradient(-225deg,
      #f5a692 0%,
      #ee780a 29%,
      #ff1361 67%,
      #fff800 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #eb0606;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;
  font-size: 70px;
  font-weight: bold;

}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}


.txt-more {
  font-size: 30px;
  -webkit-text-stroke: 1.5px;
  color: #eb0606;
}


a {
  text-decoration: none;
}

a {
  background:
    linear-gradient(to right,
      rgb(255, 255, 255),
      rgb(255, 255, 255)),
    linear-gradient(to right,
      rgba(255, 0, 0, 1),
      rgba(255, 0, 180, 1),
      rgba(0, 100, 200, 1));
  background-size: 100% 3px, 0 3px;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 400ms;
}

a:hover {
  color: #d80090;
  background-size: 0 3px, 100% 3px;
}



@media only screen and (max-width:1200px) {
  .txt-margin-dkrub {
    width: 70%;
  }

  .txt-sme {
    font-size: 40px;
  }

  .txt-description {
    font-size: 20px;

  }

  .content-center {
    margin-bottom: 10%;
  }

  .txt-more {
    font-size: 18px;
    -webkit-text-stroke: 1px;
    color: #eb0606;
  }
}

@media only screen and (max-width:922px) {
  .txt-margin-dkrub {
    width: 90%;
  }

}

@media only screen and (max-width:576px) {
  .txt-head {
    font-size: 25px;
  }

  .txt-more {
    font-size: 16px;
  }

  .txt-sme {
    font-size: 25px;
    margin-top: 30%;
  }

  .txt-description {
    font-size: 12px;
  }

  .content .txt-head {
    font-size: 25px;
  }
}
</style>