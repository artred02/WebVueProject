<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import {useCookies} from "vue3-cookies";
export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
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
</template>

<style scoped>

</style>
