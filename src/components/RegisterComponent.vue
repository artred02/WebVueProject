<template>
  <div class="myForm">
    <fieldset>
      <legend>Formulaire de création de compte</legend>
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
  name: "RegisterComponent",
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
        axios.post("http://77.141.66.29:8888/api/users", {
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
              if (response.status !== 201) {
                this.error = "Erreur de l'api..";
              } else {
                axios.post("http://77.141.66.29:8888/auth", {
                  username: this.username,
                  password: this.password,
                },
          {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
                ).then(
                    (response) => {
                      this.token = response.data["token"];
                      console.log(this.token)
                    }
                )
                this.username = "";
                this.password = "";
              }
            }
        ).catch(error=>{
          console.log(error)
          this.error = error.message
        })
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