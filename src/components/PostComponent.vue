<template>
  <br><br>
<!--  <input type="submit" @click="callApi()">-->
  <div v-for="post in posts">{{post.id}} / {{post.title}} / {{post.content}} / {{post.creationDate}}</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: []
    }
  },
  mounted: function(){
    this.callApi() //method1 will execute at pageload
  },
  name: "PostComponent",
  methods: {
    callApi() {
      this.posts = [];
      axios.get("https://localhost:8000/api/posts").then(
          (response) => {
            let test;
            test = JSON.parse(response.request.response);
            test = test["hydra:member"];
            for (let i = 0; i<test["length"]; i++) {
              let date = test[i]["creationDate"];
              date = new Date(date).toDateString();
              test[i]["creationDate"] = date;
              this.posts.push(test[i]);
            }
          }
      );
    }
  }
}
</script>

<style scoped>

</style>