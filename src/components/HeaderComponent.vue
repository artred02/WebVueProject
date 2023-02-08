<template>
  <div>
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
.router{
  margin: 15%;
  text-decoration: none;
  color: black;
  font-size: x-large;
}
</style>