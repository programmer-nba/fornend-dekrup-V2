import { createRouter, createWebHistory } from "vue-router";

let routes = [];
routes = [
  {
    path: "/member",
    name: "member",
    component: () => import("../components/member/HomePageMember.vue"),
  },
  {
    path: "/member/product",
    name: "member-product",
    component: () => import("../components/member/MenuProductMember.vue"),
  },
  {
    path: "/member/profile",
    name: "member-profile",
    component: () => import("../components/member/ProfileMember.vue"),
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
