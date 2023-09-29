import { createRouter, createWebHistory } from "vue-router";

let routes = [];
routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Public/LoginView.vue")
  },
  {
    path: "/ForgotPassword",
    name: "ForgotPassword",
    // component: () => import("../views/Public/ForgotPassword.vue")
  },

  //Admin
  {
    path: "/admin",
    name: "admin",
    component: () => import("../components/admin/HomePageAdmin.vue"),
    children: [
      {
        path: "product",
        name: "admin-product",
        component: () => import("../components/product_dekrub/ProductView.vue"),
      },
      {
        path: "/admin/product/add",
        name: "admin-product-add",
        component: () => import("../components/product_dekrub/addView.vue"),
      },
      {
        path: "/admin/product/category",
        name: "admin-category",
        component: () => import("../components/product_dekrub/category/CategoryProduct.vue"),
      },
      {
        path: "order",
        name: "admin-order",
        component: () => import("../components/order/TableOrder.vue"),
      },
      {
        path: "member",
        name: "admin-member",
        // ใส่ component ของจัดการผู้ใช้งานที่นี่
      },
      {
        path: "user",
        name: "admin-user",
        component: () => import("../components/admin/TableAdmin.vue"),
      },
      {
        path: "user/add",
        name: "admin-user-add",
        component: () => import("../components/admin/addView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
