<template>
  <div class="myForm">
    <fieldset>
      <legend>Formulaire de création de post</legend>
      <br>
      <form @submit.prevent="callApi">
        <label for="title">Titre<em>*</em></label>
        <input type="text" id="title" v-model="title">
        <br>
        <label for="content">Contenu<em>*</em></label>
        <input type="text" id="content" v-model="content">
        <br><br>
        <div class="center">
          <input id="button" type="submit" value="Valider">
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
      content: ""
    }
  },
  methods: {
    callApi() {
      this.posts = [];
      let now = new Date();
      axios.post("https://localhost:8000/api/posts", {
        title: "Clément",
        content: "Je suis le contenu",
        creationDate: now
      }).then(
          (response) => {
            let test;
            test = JSON.parse(response.request.response);
            console.log(test);
            // test = test["hydra:member"];
            // for (let i = 0; i<test["length"]; i++) {
            //   let date = test[i]["creationDate"];
            //   date = new Date(date).toDateString();
            //   test[i]["creationDate"] = date;
            //   this.posts.push(test[i]);
            // }
          }
      );
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
  padding: 0px 3px;
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