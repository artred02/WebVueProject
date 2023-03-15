<template>
  <div class="routerDiv">
    <RouterLink class="router" to="/"><font-awesome-icon icon="fa-solid fa-house" /></RouterLink>
    <RouterLink class="router" to="/posts">Posts <font-awesome-icon icon="fa-solid fa-list" /></RouterLink>
    <RouterLink class="router" to="/new/post" v-if="this.$cookies.isKey('myToken')">Poster <font-awesome-icon icon="fa-solid fa-pen-nib" /></RouterLink>
    <RouterLink class="router" to="/profile" v-if="this.$cookies.isKey('myToken')">Mon Profil <font-awesome-icon icon="fa-solid fa-address-card" /></RouterLink>
    <RouterLink class="router" to="/register" v-if="!this.$cookies.isKey('myToken')">Register <font-awesome-icon icon="fa-solid fa-user-plus" /></RouterLink>
    <RouterLink class="router" to="/connection" v-if="!this.$cookies.isKey('myToken')">Login <font-awesome-icon icon="fa-solid fa-user" /></RouterLink>
    <div class="btnA">
      <button class="router routerButton" @click="toggleTheme"><font-awesome-icon icon="fa-solid fa-moon" /></button>
      <button class="router routerButton" v-if="this.$cookies.isKey('myToken')" @click="disconnect"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></button>
    </div>
  </div>

</template>

<script>

import router from "@/router";

export default {
  name: "HeaderComponent",
  methods: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", this.theme);
    },
    disconnect() {
      this.$cookies.remove('myToken');
      this.$cookies.remove('myId');
      router.push({ path: '/' })
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
  color: var(--color-text);
  font-size: x-large;
}

.routerButton {
  border: none;
  background-color: transparent;
  padding-right: 2vw;
}
</style>