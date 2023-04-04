<template>
  <div class="globalDiv">
    Nom : {{profile.name}},<br>
    Email : {{profile.email}}<br><br>
    <div v-if="this.posts !== undefined && this.posts.length !== 0">
      Liste des Posts:
      <div class="mainDiv">
        <div class="parent" v-for="post in posts">
          <div class="childDiv">Titre : {{post.title}}</div>
          <div class="childDiv">Contenu : {{post.content}}</div>
          <div>Date de création : {{formatDate(post.creationDate)}}</div>
          <router-link class="postAccess" :to="{ name: 'postId', params:{id: post.id}}">Accéder au post <font-awesome-icon icon="fa-solid fa-arrow-right" /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {useRoute} from "vue-router";
import dayjs from "dayjs";

export default {
  name: "SeeProfileComponent",
  data() {
    return {
      profile: [],
      posts: []
    }
  },
  // on utilise la fonction useRoute pour récupérer l'id de l'utilisateur souhaité
  setup() {
    const route = useRoute();
    return { route };
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    // cette fonction permet de formater la date
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format('dddd D MMMM YYYY');
    },
    // cette fonction permet de récupérer les informations de l'utilisateur
    getProfile(){
      axios.get(this.$domain + "users/" + this.route.params.id, {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : 'Bearer ' + this.$cookies.get("myToken")
        }
      }).then(
          // on ajoute les informations de l'utilisateur dans le tableau profile
          (response) => {
            this.profile = response.data;
            this.getPosts();
          }
      ).catch(
          // si le token est expiré ou invalide, on le supprime et on redirige vers la page de connexion
          (error) => {
            if(error.response.data.message === "Expired JWT Token" || error.response.data.message === "Invalid JWT Token"){
              this.$cookies.remove("myToken");
              this.$router.push('/');
            } else {
              this.error = error;
            }
          }
      );
    },
    // cette fonction permet de récupérer les posts de l'utilisateur
    getPosts(){
      axios.get(this.$domain + "posts/user/" + this.route.params.id, {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : 'Bearer ' + this.$cookies.get("myToken")
        }
      }).then(
          // on ajoute les posts dans le tableau posts
          (response) => {
            response.data.forEach(post => this.posts.push(post));
          }
      ).catch(
          // si le token est expiré ou invalide, on le supprime et on redirige vers la page de connexion
          (error) => {
            if(error.response.data.message === "Expired JWT Token" || error.response.data.message === "Invalid JWT Token"){
              this.$cookies.remove("myToken");
              this.$router.push('/');
            } else {
              this.error = error;
            }
          }
      );
    }
  }
}
</script>

<style scoped>
.globalDiv {
  margin: 5% 0 0 5%;
}

.mainDiv{
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
.parent{
  display: block;
  margin: 5% 0 25% 25%;
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