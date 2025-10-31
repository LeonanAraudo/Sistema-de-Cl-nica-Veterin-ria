import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BasePets from '@/components/forms/BasePets.vue'
import BaseTutor from '@/components/forms/BaseTutor.vue'
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
  ],
})

export default router
