<template>
  <div class="myForm">
    <fieldset>
      <legend>Formulaire de connexion</legend>
      <br>
      <form @submit.prevent="register">
        <label for="email">Email<em>*</em></label>
        <input v-bind:style="{ borderColor: borderColorEmail}" type="text" id="email" v-model="username">
        <br>
        <label for="password">Mot de passe<em>*</em></label>
        <input v-bind:style="{ borderColor: borderColorPasswd}" type="text" id="password" v-model="password">
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

export default {
  name: "ConnectionComponent",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      borderColorEmail: "",
      borderColorPasswd: "",
    }
  },
  methods: {
    register() {
      if (this.username !== "" && this.password !== "") {
        axios.post("https://127.0.0.1:8000/auth", {
              username: this.username,
              password: this.password,
            },
      {
              headers: {
                'Content-Type': 'application/json'
              }
            },
        ).then(
            (response) => {
              if (response.status !== 200) {
                this.error = "Erreur de l'api..";
              }
              console.log(response)
            }
        )
        this.username = "";
        this.password = "";
      } else {
        this.error = "Les champs ne sont pas valides";
        if (this.username === "") {
          this.borderColorEmail = "red";
        } else {
          this.borderColorEmail = "";
        }
        if (this.password === "") {
          this.borderColorPasswd = "red";
        } else {
          this.borderColorPasswd = "";
        }
      }
    }
  }
}
</script>

<style scoped>

</style>