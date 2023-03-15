import { createApp } from 'vue'
import App from "@/App.vue";
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from "vue3-cookies";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import './assets/main.css'

import {
    faHouse,
    faPenNib,
    faAddressCard,
    faRightFromBracket,
    faUser,
    faUserPlus,
    faList,
    faEye,
    faEyeSlash,
    faMoon,
} from "@fortawesome/free-solid-svg-icons";

const app = createApp(App)

library.add(
    faHouse,
    faPenNib,
    faAddressCard,
    faRightFromBracket,
    faUser,
    faUserPlus,
    faList,
    faEye,
    faEyeSlash,
    faMoon,
);

app.use(router)
app.use(VueAxios, axios)
app.use(VueCookies)
app.component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.$domain = "http://www.artred02.fr:8888/api/"

app.mount('#app')
