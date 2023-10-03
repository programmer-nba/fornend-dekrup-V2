<template>
    <div>
        <div style="background-color: #FFDEDE; ">
        <input type="text" name="name" v-model="name"/>
        <input type="text" name="price" v-model="price"/>
        <button v-on:click="addProduct()">add</button>
    </div>
    </div>
</template>

<script>
import axios from "axios";
// import { ColorStyle } from "quill";
import { ref, onMounted } from 'vue';
// import Password from 'primevue/password';
// import { Product } from "../../../service/product";

// import FileUpload from 'primevue/fileupload';

export default {
    name: "App",
    data(){
        return {
            name:'' ,
            price:''
        };
    },
    methods: {
        // addProduct(){
        //     console.warn("fantion called",this.name,this.price)
        // }
        async addProduct(){
    try {
        const result = await axios.post(`${process.env.VUE_APP_DEKRUP}/product/create`, {
            name: this.name,
            price: this.price
        }, {
            headers: {
                "token": localStorage.getItem("token"),
            }
        });
    } catch (error) {
        console.error(error);
    }
},
    },
}



</script>



<style>
.custom-header-panel .p-panel-header {
    background-color: #FFFDE3;
    color: #C21010;
    border-bottom: 1px solid #C21010;
}

.custom-header-panel .p-panel-content {
    background-color: #FFFDE3;
    color: #C21010;
    border: none;
}
</style>