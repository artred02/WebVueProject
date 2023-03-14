<template>
  <div class="myForm">
    <fieldset>
      <legend>Formulaire de création de compte</legend>
      <br>
      <form @submit.prevent="register">
        <label for="email">Email<em>*</em></label>
        <input v-bind:style="{ borderColor: borderColorEmail}" type="text" id="email" v-model="email">
        <br>
        <label for="username">Nom d'utilisateur<em>*</em></label>
        <input v-bind:style="{ borderColor: borderColorEmail}" type="text" id="username" v-model="name">
        <br>
        <label for="password">Mot de passe<em>*</em></label>
        <input v-bind:style="{ borderColor: borderColorPasswd}" type="password" id="password" v-model="password">
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
  name: "RegisterComponent",
  data() {
    return {
      email: "",
      name: "",
      password: "",
      error: "",
      borderColorEmail: "",
      borderColorPasswd: "",
    }
  },
  methods: {
    register() {
      if (this.email !== "" && this.password !== "" && this.name !== "") {
        axios.post(this.$domain+"users", {
              email: this.email,
              password: this.password,
              name: this.name
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
                axios.post(this.$domain+"login_check", {
                  email: this.email,
                  password: this.password,
                },
          {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
                ).then(
                    (response) => {
                      let token = response.data["token"];
                      this.$cookies.set("myToken", token);
                      let tokenDecode = VueJwtDecode.decode(token);
                      this.$cookies.set('myId', tokenDecode['id'])
                    }
                )
                this.email = "";
                this.password = "";
                this.$router.push('/')
              }
            }
        ).catch(error=>{
          console.log(error)
          this.error = error.message
        })
      } else {
        this.error = "Les champs ne sont pas valides";
        if (this.email === "") {
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