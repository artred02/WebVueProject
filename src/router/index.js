import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from "@/components/MainComponent.vue";
import PostComponent from "@/components/PostComponent.vue";
import NewPostComponent from "@/components/NewPostComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import UniquePostComponent from "@/components/UniquePostComponent.vue";
import ConnectionComponent from "@/components/ConnectionComponent.vue";
import PostIdComponent from "@/components/PostIdComponent.vue";
import MyPostsComponent from "@/components/MyPostsComponent.vue";

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
      path: '/post/:id',
      name: 'post',
      component: UniquePostComponent
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
      props: true,
      component: PostIdComponent
    },
    {
      path: '/profile/posts',
      name: 'myPosts',
      component: MyPostsComponent
    }
  ]
})

export default router
