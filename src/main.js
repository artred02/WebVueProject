import { createApp } from 'vue'
import App from "@/App.vue";
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from "vue3-cookies";

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(VueCookies)

app.config.globalProperties.$domain = "http://www.artred02.fr:8888/api/"

app.mount('#app')
