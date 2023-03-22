<template>
<ProfileComponent />
<MyPostsComponent />
</template>

<script>

import ProfileComponent from "@/components/ProfileComponent.vue";
import MyPostsComponent from "@/components/MyPostsComponent.vue";

export default {
  name: "MyProfileVue",
  components: {MyPostsComponent, ProfileComponent},

}
</script>

<style scoped>
</style>