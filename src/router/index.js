import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from "@/components/MainComponent.vue";
import PostComponent from "@/components/PostComponent.vue";
import NewPostComponent from "@/components/NewPostComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import ConnectionComponent from "@/components/ConnectionComponent.vue";
import PostIdComponent from "@/components/PostIdComponent.vue";
import MyProfileVue from "@/views/MyProfileVue.vue";
import SeeProfileComponent from "@/components/SeeProfileComponent.vue";

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
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
    },
    {
      path: '/connection',
      name: 'connection',
      component: ConnectionComponent
    },
    {
      path: '/post/:id',
      name: 'postId',
      component: PostIdComponent
    },
    {
      path: '/profile',
      name: 'myProfile',
      component: MyProfileVue
    },
    {
      path: '/see/profile/:id',
      name: 'otherProfile',
      component: SeeProfileComponent
    }
  ]
})

export default router
