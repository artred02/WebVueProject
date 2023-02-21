<template>
  <div class="routerDiv">
    <RouterLink class="router" to="/">Home</RouterLink>
    <RouterLink class="router" to="/posts">Posts</RouterLink>
    <RouterLink class="router" to="/new/post">Poster</RouterLink>
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
  grid-template-columns: 33.3% 33.3% 33.3%;
  text-align: center;
}
.router{
  text-decoration: none;
  color: black;
  font-size: x-large;
}
</style>