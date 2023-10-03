<template>
    <div class="card mb-5">
      <div class="flex flex-wrap justify-content-center card-container">
        <AddCategory :categorys="categorys" />
      </div>
    </div>
    <div class="card">
      <div class="flex flex-wrap justify-content-center card-container">
        <DataTable :value="categorys" :scrollable="true" scrollHeight="flex">
          <Column header="#" style="min-width: 10px">
            <template #body="item">
              {{ item.index + 1 }}
            </template>
          </Column>
          <Column
            field="name"
            header="หมวดหมู่"
            class="column-responsive"
          ></Column>
          <Column :exportable="false" style="min-width: 10rem">
            <template #body="item">
              <CategoryProduct
                :cat_id="item.data._id"
                :category="item.data"
                :categorys="categorys"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import AddCategory from "@/components/product_dekrub/category/AddCategory.vue";
  import CategoryProduct from "@/components/product_dekrub/category/UpdateCategory.vue";
  import axios from "axios";
  import { onMounted, ref } from "vue";
  export default {
    components: {
      AddCategory,
      CategoryProduct,
    },
    setup() {
      const categorys = ref([]);
      const fetchCategory = async () => {
        await axios
          .get(`${process.env.VUE_APP_DEKRUP}/product/category/list`, {
            headers: {
              "token": localStorage.getItem("token"),
            },
          })
          .then((res) => {
            categorys.value = res.data.data;
          });
      };
  
      onMounted(() => {
        fetchCategory();
      });
  
      return { categorys };
    },
//  
  };
  </script>
  
  <style>
  .column-responsive{
    width: 1600px;
  }
  .p-datatable .p-datatable-thead>tr>th {
      background-color: #ffe3e3 !important;
      color: #ff0000;
      border-bottom: 1px solid #CFE8A9;
  }
  
  .p-datatable .p-datatable-tbody>tr>td {
      margin-bottom: 1.5rem;
  }
  
  .p-datatable .p-datatable-footer {
      background-color: #FFE6F7 !important;
      border: none;
  }
  .p-paginator {
      padding: 0;
      margin-top: 1.5rem;
      border-radius: 40px;
  }


  @media only screen and (max-width:1700px){
    .column-responsive{
    width: 1200px;
  }
  }
  </style>
  
  
  