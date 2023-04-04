<template>
  <div class="myForm" v-if="user !== undefined">
    <fieldset>
      <legend>Modification du profil</legend>
      <form @submit.prevent="setUser">
        <label for="username">Username<em>*</em></label>
        <input type="text" id="username" v-model="user.name">
        <br>
        <label for="email">Email<em>*</em></label>
        <input type="text" id="email" v-model="user.email">
        <br><br>
        <div class="center">
          <input id="button" type="submit" value="Valider">
          <div id="error" v-if="error">{{error}}</div>
        </div>
      </form>
    </fieldset>
  </div>
</template>

<script>

import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "ProfileComponent",
  data() {
    return {
      user: [],
      error: "",
    }
  },
  // on vérifie que l'utilisateur est connecté et on lance la fonction getUser
  mounted () {
    if (this.$cookies.isKey("myToken")){
      this.getUser();
    }
  },
  methods: {
    // fonction qui permet de récupérer les informations de l'utilisateur
    getUser() {
      const id = VueJwtDecode.decode(this.$cookies.get('myToken'))['id']
      axios.get(this.$domain+'users/'+id, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get("myToken")
        }
      }).then(
          // on récupère les informations de l'utilisateur
          (response) => {
            this.user = response.data
          }
      )
    },
    // fonction qui permet de modifier les informations de l'utilisateur
    setUser() {
      const id = VueJwtDecode.decode(this.$cookies.get('myToken'))['id']
      axios.patch(this.$domain+'users/'+id, {
            name: this.user.name,
            email: this.user.email
          },
          {
            headers: {
              'Content-Type': 'application/merge-patch+json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.$cookies.get("myToken")
            }
          }).then(
          // si la modification est un succès, on récupère les nouvelles informations de l'utilisateur
          (response) => {
            this.user = response.data
          }
      )
    }
  }
}
</script>

<style scoped>
.myForm {
  display: flex;
  position: unset;
  margin: 300px 0 0 50%;
  justify-content: center;
}

@media all and (max-width: 991px) {
  .myForm {
    margin: 150px 0 0 50%;
  }
}
</style>