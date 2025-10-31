import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BasePets from '@/components/forms/BasePets.vue'
import BaseTutor from '@/components/forms/BaseTutor.vue'
import BaseConsulta from '@/components/forms/BaseConsulta.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
     {
      path: '/cadPet',
      name: 'pet',
      component: BasePets,
    },
    {
      path: '/cadTutor',
      name: 'tutor',
      component: BaseTutor,
    },
      {
      path: '/cadConsulta',
      name: 'consulta',
      component: BaseConsulta,
    },
  ],
})

export default router
