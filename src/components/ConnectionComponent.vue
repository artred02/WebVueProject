<template>
  <div class="myForm">
    <fieldset>
      <legend>Formulaire de connexion</legend>
      <br>
      <form @submit.prevent="login">
        <label for="email">Email<em>*</em></label>
        <input v-bind:style="{ borderColor: borderColorEmail}" type="text" id="email" v-model="username">
        <br>
        <label for="password">Mot de passe<em>*</em></label>
        <input v-bind:style="{ borderColor: borderColorPasswd}" v-bind:type="eye" type="password" id="password" v-model="password">
        <font-awesome-icon class="eyeIcon" id="eye" v-if="eye === 'password'" @click="eye = 'text'" icon="fa-solid fa-eye" />
        <font-awesome-icon class="eyeIcon" id="eyeSlash" v-else @click="eye = 'password'" icon="fa-solid fa-eye-slash" />
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
      eye: 'password',
    }
  },
  methods: {
    login() {
      if (this.username !== "" && this.password !== "") {
        axios.post(this.$domain+"login_check", {
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
              if (response.status !== 200) {
                this.error = "Erreur de l'api..";
              }
              let token = response.data["token"];
              this.cookies.set("myToken", token);
              let tokenDecode = VueJwtDecode.decode(this.$cookies.get("myToken"));
              this.$cookies.set("myId", tokenDecode['id'])

            }
        ).catch(
            (error) => {
              this.error = error.data
            }
        );
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