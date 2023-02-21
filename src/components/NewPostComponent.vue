<template>
  <div class="myForm">
    <fieldset>
      <legend>Formulaire de création de post</legend>
      <br>
      <form @submit.prevent="callApi">
        <label for="title">Titre<em>*</em></label>
        <input v-bind:style="{ borderColor: borderColorTitle}" type="text" id="title" v-model="title">
        <br>
        <label for="content">Contenu<em>*</em></label>
        <textarea v-bind:style="{ borderColor: borderColorContent}" id="content" v-model="content"/>
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
  name: "NewPostComponent",
  data() {
    return {
      title: "",
      content: "",
      error: "",
      borderColorTitle: "",
      borderColorContent: "",
    }
  },
  methods: {
    callApi() {
      if (this.title !== "" && this.content !== ""){
        this.posts = [];
        let now = new Date();
        axios.post("http://77.141.66.29:8888/api/posts", {
          title: this.title,
          content: this.content,
          creationDate: now
        }).then(
            (response)=>{
              if (response.status !== 201){
                this.error="Erreur de l'api..";
              }
            }
        )
        this.title = "";
        this.content = "";
      } else {
        this.error="Les champs ne sont pas valides";
        if (this.title === ""){
          this.borderColorTitle="red";
        } else {
          this.borderColorTitle="";
        }
        if (this.content === ""){
          this.borderColorContent="red";
        } else {
          this.borderColorContent="";
        }
      }
    }

  }
}

</script>

<style scoped>

div.myForm {
  width: 600px;
  padding: 0 30px;
  margin: 10% auto;
}

div.myForm legend {
  padding: 0 3px;
  font-weight: bold;
}

div.myForm label {
  width: 110px;
  display: inline-block;
  vertical-align: top;
  margin: 6px;
}

div.myForm em {
  font-weight: bold;
  font-style: normal;
  color: #f00;
}

div.myForm input, textarea {
  width: 260px;
}

div.center {
  margin: 0 auto;
  display: table;
}
</style>