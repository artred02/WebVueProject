<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import HeaderComponent2 from "@/components/HeaderComponent2.vue";
import {useCookies} from "vue3-cookies";
export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    HeaderComponent,
    HeaderComponent2
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
