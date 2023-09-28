<template>
  <div class="grid mx-2">
    <div class="col-12">
      <Carousel :value="products" :numVisible="4" :numScroll="4" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <div class="txt-font-faimily surface-border border-round  text-center">
            <div>

              <img class="img-product" :src="require(`@/assets/img/${slotProps.data.image}`)"
                :alt="slotProps.data.name" />
            </div>
            <div>
              <p class="txt-product">{{ slotProps.data.name }}</p>
              <p class="txt-description">{{ slotProps.data.description }}</p>
              <!-- <div class="mt-5">
                    <Button icon="pi pi-search" rounded class="mr-2" />
                    <Button icon="pi pi-star-fill" rounded severity="success" class="mr-2" />
                  </div> -->
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>
  
<script>

import Carousel from "primevue/carousel";

export default {
  components: {
    Carousel
  }
}
</script>
  

<style scoped>
.txt-font-faimily {
  font-family: 'Kanit', sans-serif;

}

.img-product {
  width: 85%;
  background: #ff000026;
  border-radius: 15px;
}

.txt-product {
  color: #eb0606;
  font-size: 30px;
  -webkit-text-stroke: 0.5px #eb0606;
}

.txt-description {
  font-size: 18px;
  color: #797373;
  -webkit-text-stroke: 0.5px;
}



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