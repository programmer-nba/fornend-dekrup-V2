import { createRouter, createWebHistory } from "vue-router";

let routes = [];
routes = [
  {
    path: "/member",
    name: "member",
    component: () => import("../components/member/HomePageMember.vue"),
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
