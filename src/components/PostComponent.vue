<template>
  <br><br>
  <div class="mainDiv">
    <div class="parent" v-for="post in posts">
      <div class="childDiv">Titre : {{post.title}}</div>
      <div class="childDiv">Contenu : {{post.content}}</div>
      <div>Date de création : {{formatDate(post.creationDate)}}</div>
      <router-link :to="{ name: 'postId', params: { id: post.id }}">Accéder au post</router-link>
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
  mounted: function(){
    this.callApi();
  },
  name: "PostComponent",
  methods: {
    callApi() {
      this.posts = [];
      axios.get("http://77.141.66.29:8888/api/posts",
{
        headers: {
          'Accept' : 'application/json',
        }
      }
      ).then(
          (response) => {
            response.data.forEach(post => this.posts.push(post));
          }
      );
    },
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format('dddd D MMMM YYYY');
    },
    redirect(){

    }
  },
}
</script>

<style scoped>
  .mainDiv{
    display: grid;
    margin: 2%;
    grid-template-columns: 50% 50%;
  }
  .parent{
    display: block;
    margin: 5%;
    height: 50px;
    width: 100%;
  }
</style>