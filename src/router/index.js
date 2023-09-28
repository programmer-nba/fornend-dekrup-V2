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
  },
  {
    path: "/admin/product",
    name: "admin-product",
  },
  {
    path: "/admin/order",
    name: "admin-order",
  },
  {
    path: "/admin/member",
    name: "admin-member",
  },
  {
    path: "/admin/user",
    name: "admin-user",
    component: () => import("../components/admin/TableAdmin.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
