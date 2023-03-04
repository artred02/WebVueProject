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
import {useCookies} from "vue3-cookies";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "ConnectionComponent",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
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
        axios.post("http://77.141.66.29:8888/api/login_check", {
              email: this.username,
              password: this.password,
            },
      {
              headers: {
                'Content-Type': 'application/json'
              }
            },
        ).then(
            (response) => {
              console.log(response);
              if (response.status !== 200) {
                this.error = "Erreur de l'api..";
              }
              let token = response.data["token"];
              this.cookies.set("myToken", token);
              let tokenDecode = VueJwtDecode.decode(this.$cookies.get("myToken"));
              this.$cookies.set("myId", tokenDecode['id'])
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