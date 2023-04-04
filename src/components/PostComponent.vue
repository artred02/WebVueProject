<template>
  <br><br>
  <div class="mainDiv">
    <div class="parent" v-for="post in posts">
      <div class="childDiv">Titre : {{post.title}}</div>
      <div class="childDiv">Contenu : {{post.content}}</div>
      <div>Date de création : {{formatDate(post.creationDate)}}</div>
      <router-link class="postAccess" :to="{ name: 'postId', params:{id: post.id}}">Accéder au post <font-awesome-icon icon="fa-solid fa-arrow-right" /></router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      posts: [],
      date: '',
    }
  },
  mounted (){
    this.callApi();
  },
  name: "PostComponent",
  methods: {
    // cette fonction permet de récupérer les posts
    callApi() {
      this.posts = [];
      axios.get(this.$domain+"posts",
{
        headers: {
          'Accept' : 'application/json',
        }
      }
      ).then(
          // on ajoute les posts dans le tableau posts
          (response) => {
            response.data.forEach(post => this.posts.push(post));
          }
      );
    },
    // cette fonction permet de formater la date
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format('dddd D MMMM YYYY');
    },
  },
}
</script>

<style scoped>
  .mainDiv{
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }
  .parent{
    display: block;
    margin: 5% 0;
    height: 50px;
    width: 100%;
    max-width: 500px;
    padding: 2%;
  }a{
    margin-top: 15px;
  }

  @media all and (max-width: 991px) {
    .mainDiv{
      display: grid;
      grid-template-columns: repeat(1, 100%);
    }
    .parent{
      display: block;
      margin: 8% 0;
      height: 50px;
      width: 100%;
      max-width: 500px;
      padding: 2%;
    }a{
       margin-top: 15px;
     }
  }
</style>