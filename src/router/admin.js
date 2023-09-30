import { createRouter, createWebHistory } from "vue-router";

let routes = [];
routes = [
  {
    path: "/admin",
    name: "admin",
    component: () => import("../components/admin/HomePageAdmin.vue"),
  },
  {
    path: "/admin/product",
    name: "admin-product",
    component: () => import("../components/admin/product_dekrub/ProductView.vue"),
  },
  {
    path: "/admin/product/add",
    name: "admin-product-add",
    component: () => import("../components/admin/product_dekrub/addView.vue"),
  },
  {
    path: "/admin/product/category",
    name: "admin-product-category",
    component: () => import("../components/admin/product_dekrub/category/CategoryProduct.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
