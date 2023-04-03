<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import {useCookies} from "vue3-cookies";
import CGU from "@/components/CGU.vue";
export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    CGU,
    HeaderComponent
  }
}
</script>

<template>
  <header>
    <HeaderComponent :key="$route.fullPath"/>
  </header>
  <body>
    <RouterView />
  </body>
  <footer>
    <RouterLink to="CGU" id="CGU">Conditions Générales D'utilisation</RouterLink>
  </footer>
</template>

<style scoped>
body {
  padding: 0 0 20px 0;
}
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  background-color: var(--color-primary);
}
</style>
