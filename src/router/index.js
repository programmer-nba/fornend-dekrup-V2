import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/homeview",
    name: "homeview",
    component: () => import("../views/HomeView.vue"),
  },

  {
    path: "/login",
    name: "login",
    // component: () => import("../views/Public/Login.vue")
  },

  {
    path: "/ForgotPassword",
    name: "ForgotPassword",
    // component: () => import("../views/Public/ForgotPassword.vue")
  },

  // ส่วน User
  {
    path: "/homepage",
    name: "homepage",
    // component: () => import("../views/Home/Homepage.vue"),

    children: [
      // ใส่เส้นทางย่อยที่คุณต้องการให้แสดงใน layout นี้
      {
        path: "/profile",
        name: "profile",
        // component: () => import("../views/Home/ProfileView.vue")
      },
    ],
  },

  //Admin
  {
    path: "/homeadmin",
    name: "homeadmin",
    component: () => import("../views/Homeadmin/HomeAdmin.vue"),

    children: [
      // ใส่เส้นทางย่อยที่คุณต้องการให้แสดงใน layout นี้

      {
        path: "/product/add",
        name: "add-product",
        component: () => import("../views/Homeadmin/product/addView.vue"),
      },
      {
        path: "/product",
        name: "product",
        component: () => import("../views/Homeadmin/product/ShowView.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/Homeadmin/order/OrderView.vue"),
      },
      {
        path: "/admin/add",
        name: "add-admin",
        component: () => import("../views/Homeadmin/admin/addView.vue"),
      },
      {
        path: "/admin",
        name: "admin",
        component: () => import("../views/Homeadmin/admin/ShowView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
