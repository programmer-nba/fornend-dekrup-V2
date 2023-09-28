<template>
  <div class="grid mx-2">
    <div class="col-12">
      <Carousel :value="products" :numVisible="4" :numScroll="4" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <div class="txt-font-faimily surface-border border-round text-center">
            <div>
              <img class="img-product" :src="slotProps.data.image" :alt="slotProps.data.name" />
            </div>
            <div>
              <p class="txt-product">{{ slotProps.data.name }}</p>
              <p class="txt-description">{{ slotProps.data.description }}</p>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Carousel from 'primevue/carousel';

import imageProduct from '@/assets/img/green.png';
// import image2 from '@/assets/img/green.png';

const products = ref([]);

 
const responsiveOptions = ref([
    {
      breakpoint: '1500px',
      numVisible: 4,
      numScroll: 4
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '380px',
      numVisible: 2,
      numScroll: 2
    }
  ]);

onMounted(() => {
  products.value = [

  {
        name: "ขวดน้ำ Spite สีเขียว 1",
        description: "50 บาท",
        image: imageProduct,
       
      },
      
  {
        name: "ขวดน้ำ Spite สีเขียว 2",
        description: "50 บาท",
        image: imageProduct,
       
      },
      
  {
        name: "ขวดน้ำ Spite สีเขียว 3",
        description: "50 บาท",
        image: imageProduct,
       
      },

      
  {
        name: "ขวดน้ำ Spite สีเขียว 4",
        description: "50 บาท",
        image: imageProduct,
       
      },
      
  {
        name: "ขวดน้ำ Spite สีเขียว 5",
        description: "50 บาท",
        image: imageProduct,
       
      },
      
  {
        name: "ขวดน้ำ Spite สีเขียว 6",
        description: "50 บาท",
        image: imageProduct,
       
      },
      
  {
        name: "ขวดน้ำ Spite สีเขียว 7",
        description: "50 บาท",
        image: imageProduct,
       
      },
      {
        name: "ขวดน้ำ Spite สีเขียว 8",
        description: "50 บาท",
        image: imageProduct,
       
      },
      {
        name: "ขวดน้ำ Spite สีเขียว 9",
        description: "50 บาท",
        image: imageProduct,
       
      },
      {
        name: "ขวดน้ำ Spite สีเขียว 10",
        description: "50 บาท",
        image: imageProduct,
       
      },
    
  ];
});
</script>



<style >

.p-icon {
    color: red;
}
.txt-font-faimily{
font-family: 'Kanit', sans-serif;

}
.img-product{
  width: 85%;
  background: #ff000026;
  border-radius: 10px;
}
.txt-product{
color: #eb0606;
font-size: 30px;
-webkit-text-stroke: 0.5px #eb0606;
}
.txt-description{
font-size: 18px;
color:#797373;
-webkit-text-stroke: 0.5px;
}



<<<<<<< Updated upstream
.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
  background-color: #5cf6dc;
}


@media only screen and (max-width:576px) {
  .txt-product {
    font-size: 13px;
  }

  .txt-description {
    font-size: 8px;
  }
}</style>
=======



@media only screen and (max-width:576px) {
.txt-product{
font-size: 13px;
}
.txt-description{
font-size: 8px;
}
}


</style>
>>>>>>> Stashed changes
