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
    path: "/member/order/OrderMember",
    name: "member-order",
    component: () => import("../components/member/order/OrderMember.vue"),
  },
  {
    path: "/member/profile",
    name: "member-profile",
    component: () => import("../components/member/ProfileMember.vue"),
  },
  {
    path: "/member/commission/register/day",
    name: "member-commission-registerday",
    component: () => import("../components/member/commission/CommissionRegisterDay.vue"),
  },
  {
    path: "/member/commission/register/week",
    name: "member-commissionday-registerweek",
    component: () => import("../components/member/commission/CommissionRegisterWeek.vue"),
  },
  {
    path: "/member/commission/adminiter",
    name: "member-commissionweek-administer",
    component: () => import("../components/member/commission/CommissionAdminister.vue"),
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
