<template>
  <div class="routerDiv">
    <RouterLink class="router" to="/">Home</RouterLink>
    <RouterLink class="router" to="/posts">Posts</RouterLink>
    <RouterLink class="router" to="/new/post">Poster</RouterLink>
    <RouterLink class="router" to="/register">Register</RouterLink>
    <RouterLink class="router" to="/connection">Connect</RouterLink>
  </div>

</template>

<script>

export default {
  name: "HeaderComponent"
}
</script>

<style scoped>
.routerDiv{
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  text-align: center;
}
.router{
  text-decoration: none;
  color: black;
  font-size: x-large;
}
</style>