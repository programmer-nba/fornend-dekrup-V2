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
  {
    path: "/admin/new_member",
    name: "admin-new_member",
    component: () => import("../components/admin/new_member/TableNewMember.vue"),
  },
  {
    path: "/admin/order",
    name: "admin-order",
    component: () => import("../components/admin/order/TableOrder.vue"),
  },
  {
    path: "/admin/admin",
    name: "admin-admin",
    component: () => import("../components/admin/admin/TableAdmin.vue"),
  },
  {
    path: "/admin/admin/add",
    name: "admin-admin-add",
    component: () => import("../components/admin/admin/addView.vue"),
  },
  {
    path: "/admin/member",
    name: "admin-member",
    component: () => import("../components/admin/member/TableMember.vue"),
  },
  {
    path: "/admin/member/add",
    name: "admin-member-add",
    component: () => import("../components/admin/member/addView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
