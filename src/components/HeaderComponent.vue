<template>
  <div class="routerDiv">
    <RouterLink class="router" to="/">Home</RouterLink>
    <RouterLink class="router" to="/posts">Posts</RouterLink>
    <RouterLink class="router" to="/new/post">Poster</RouterLink>
    <RouterLink class="router" to="/profile/posts" v-if="this.$cookies.isKey('myToken')">Mes posts</RouterLink>
    <RouterLink class="router" to="/register" v-if="!this.$cookies.isKey('myToken')">Register</RouterLink>
    <RouterLink class="router" to="/connection" v-if="!this.$cookies.isKey('myToken')">Connect</RouterLink>
    <RouterLink class="router" to="/" v-if="this.$cookies.isKey('myToken')" @click="disconnect">Disconnect</RouterLink>
  </div>

</template>

<script>

export default {
  name: "HeaderComponent",
  methods: {
    disconnect() {
      this.$cookies.remove('myToken');
      this.$cookies.remove('myId');
    }
  }
}
</script>

<style scoped>
.routerDiv{
  margin-left: 2%;
  margin-right: 2%;
  display: flex;
  text-align: center;
  justify-content: space-between;
}
.router{
  text-decoration: none;
  color: black;
  font-size: x-large;
}
</style>