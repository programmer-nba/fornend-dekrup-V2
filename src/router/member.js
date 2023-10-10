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
  {
    path: "/member/commissionday",
    name: "member-commissionday",
    component: () => import("../components/member/CommissionDay.vue"),
  },
  {
    path: "/member/commissionweek",
    name: "member-commissionweek",
    component: () => import("../components/member/CommissionWeek.vue"),
  },
  {
    path: "/member/dashboard",
    name: "dashboard",
    component: () => import("../components/member/dashboard/ContractDocument.vue"),
  },
  {
    path: "/member/condition",
    name: "condition",
    component: () => import("../components/member/dashboard/Condition.vue"),
  },
  {
    path: "/member/confirmBank",
    name: "confirmBank",
    component: () => import("../components/member/dashboard/ConfirmIdBank.vue"),
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
