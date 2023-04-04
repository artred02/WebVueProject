<template>
  <nav class="routerDiv">
    <RouterLink id="menuButton" class="router" to="/"><font-awesome-icon icon="fa-solid fa-house" /></RouterLink>
    <RouterLink class="router" to="/posts"><span id="spanHeader">Posts </span><font-awesome-icon icon="fa-solid fa-list" /></RouterLink>
    <RouterLink class="router" to="/new/post" v-if="this.$cookies.isKey('myToken')"><span id="spanHeader">Poster </span><font-awesome-icon icon="fa-solid fa-pen-nib" /></RouterLink>
    <RouterLink class="router" to="/profile" v-if="this.$cookies.isKey('myToken')"><span id="spanHeader">Mon Profil </span><font-awesome-icon icon="fa-solid fa-address-card" /></RouterLink>
    <RouterLink class="router" to="/register" v-if="!this.$cookies.isKey('myToken')"><span id="spanHeader">Register </span><font-awesome-icon icon="fa-solid fa-user-plus" /></RouterLink>
    <RouterLink class="router" to="/connection" v-if="!this.$cookies.isKey('myToken')"><span id="spanHeader">Login </span><font-awesome-icon icon="fa-solid fa-user" /></RouterLink>
    <div class="btnA">
      <button class="router" @click="toggleTheme"><font-awesome-icon icon="fa-solid fa-moon" /></button>
      <button class="router" v-if="this.$cookies.isKey('myToken')" @click="disconnect"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></button>
    </div>
  </nav>

</template>

<script>

import router from "@/router";

export default {
  name: "HeaderComponent",
  methods: {
    // Toggle between light and dark theme
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", this.theme);
    },
    // Disconnect the user
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
  display: flex;
  justify-content: space-between;
}

.router{
  font-size: x-large;
}

#menuButton {
  margin-left: 1%
}

.routerDiv .btnA .router {
  border: none;
  background-color: transparent;
  padding-right: 2vw;
  cursor: pointer;
}

.btnA {

}
</style>