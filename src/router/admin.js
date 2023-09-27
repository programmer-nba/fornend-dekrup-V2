import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/homeadmin',
      name: 'homeadmin',
      component : ()=>import("../views/Homeadmin/HomeAdmin.vue")
    },

  ]
})

export default router
