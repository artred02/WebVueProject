<template>
  <br><br>
  <div class="mainDiv">
    <div class="parent" v-for="post in posts">
      <div class="childDiv">Titre : {{post.title}}</div>
      <div class="childDiv">Contenu : {{post.content}}</div>
      <div>Date de création : {{formatDate(post.creationDate)}}</div>
      <router-link :to="{ name: 'postId', params:{id: post.id}}">Accéder au post</router-link>
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
      axios.get(this.$domain+"posts",
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
  },
}
</script>

<style scoped>
  .mainDiv{
    display: grid;
    grid-template-columns: 50% 50%;
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
</style>