import { createRouter, createWebHistory } from "vue-router";

let routes = [];
routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/register/:member_number",
    name: "register-introduce",
    component: () => import("../views/RegisterIntroduce.vue"),
  },
  {
    path: "/forgetpassword",
    name: "forget_password",
    component: () => import("../views/ForgotPassword.vue"),
  },
  {
    name:"NotFound",
    path:"/:pathMatch(.*)*",
    component :()=>import("../views/Error404View.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
