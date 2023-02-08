import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from "@/components/MainComponent.vue";
import PostComponent from "@/components/PostComponent.vue";
import NewPostComponent from "@/components/NewPostComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: MainComponent
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostComponent
    },
    {
      path: '/new/post',
      name: 'newPost',
      component: NewPostComponent
    },
  ]
})

export default router
