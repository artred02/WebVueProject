<template>
  <div class="mainDiv">
    <div class="parent" v-for="post in posts">
      <div class="childDiv">Titre : {{post.title}}</div>
      <div class="childDiv">Contenu : {{post.content}}</div>
      <div>Date de création : {{formatDate(post.creationDate)}}</div>
      <button class="buttons" @click="deletePost(post.id)">Supprimer</button>
      <router-link class="postAccess" :to="{ name: 'postId', params:{id: post.id}}">Accéder au post <font-awesome-icon icon="fa-solid fa-arrow-right" /></router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import dayjs from "dayjs";

export default {
  name: "MyPostsComponent",
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    this.myPosts();
  },
  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format('dddd D MMMM YYYY');
    },
    myPosts() {
      this.posts = [];
      const id = VueJwtDecode.decode(this.$cookies.get('myToken'))['id']
      axios.get(this.$domain+"posts/user/"+id, {
        headers: {
          'Accept' : 'application/json',
        }
      }).then(
          (response) => {
            response.data.forEach(post => this.posts.push(post));
          }
      );
    },
    deletePost(id) {
      axios.delete(this.$domain+"posts/"+id, {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : 'Bearer ' + this.$cookies.get("myToken")
        }
      }).then(
          this.myPosts
      ).catch(
          (error) => {
            if(error.response.data.message === "Expired JWT Token" || error.response.data.message === "Invalid JWT Token"){
              this.$cookies.remove("myToken");
              this.$router.push('/');
            } else {
              this.error = error;
              window.alert(error);
            }
          }
      );
    }
  }
}
</script>

<style scoped>
.mainDiv{
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
.parent{
  display: block;
  margin: 5% 0 0 25%;
  height: 50px;
  width: 100%;
  max-width: 500px;
  padding: 2%;
}a{
   margin-top: 15px;
 }

.buttons {
  margin: 10px 50px 0 0;
  padding: 5px 10px;
  text-transform: none;
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