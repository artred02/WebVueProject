<template>
  <br><br>

  <div class="mainDiv">
    <div class="postIdVue">
      <div class="postTitle">{{post.title}}</div>
      <br>
      <div class="postUser"><span v-if="this.post.user !== undefined && this.post.user !== 0"><b><router-link v-if="this.$cookies.isKey('myToken')" :to="{ name: 'otherProfile', params:{id: post.id}}">{{post.user.name}}</router-link> <span v-else>{{post.user.name}}</span> </b></span> <span class="date">{{formatDate(post.creationDate)}}</span></div>
      <br>
      <div class="postContent">{{post.content}}</div>
      <br>
      <input type="button" @click="showModal" class="buttons" id="myBtn" value="Commenter" v-if="this.$cookies.isKey('myToken')">

      <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
          <span class="close">&times;</span>
          <form @submit="commentApi($event)">
            <label for="comment">Commentaire : </label><br>
            <textarea id="comment" v-model="content" rows="1"></textarea><br>
            <input type="submit" value="Commenter" class="buttons">
          </form>
        </div>
      </div>
      <br><br>
<!--      Affichage des commentaires-->
      <div v-for="comment in this.comments" v-if="this.comments !== undefined && this.comments.length !== 0" class="divComments">
        <div>
          <b><router-link v-if="this.$cookies.isKey('myToken')" :to="{ name: 'otherProfile', params:{id: comment.user.id}}">{{comment.user.name}}</router-link> <span v-else>{{comment.user.name}}</span></b>, <span class="date">{{formatDate(comment.creationDate)}}</span><br>
          <span class="postContent">{{comment.content}}</span>
        </div>
        <br>
      </div>
      <div v-if="error !== undefined">{{error}}</div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from "axios";
import dayjs from "dayjs";
import VueJwtDecode from "vue-jwt-decode";
export default {
  // on récupère l'id du post dans l'url
  setup() {
    const route = useRoute();
    return { route };
  },
  name: "PostIdComponent",
  data () {
    return {
      post: [],
      comments: [],
      isDisplayForm: 'none',
      content: "",
      error: "",
    }
  },
  mounted: function(){
    this.callApi();
  },
  methods: {
    // fonction qui permet de formater la date
    formatDate(dateString) {
      return dayjs(dateString).format('DD/MM/YYYY, HH:mm');
    },
    // fonction qui permet de récupérer le post
    callApi() {
      this.post = [];
      axios.get(this.$domain+"posts/"+this.route.params.id,
          {
            headers: {
              'Accept' : 'application/json',
            }
          }
      ).then(
          // si la requête est un succès, on récupère le post
          (response) => {
            this.post = response.data;
            if (this.$cookies.isKey('myToken')) {
              this.getComments();
            }
          }
      );
    },
    // fonction qui permet de récupérer les commentaires
    getComments() {
      this.comments = [];
      axios.get(this.$domain+"comments/post/"+this.post.id, {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : 'Bearer ' + this.$cookies.get("myToken")
        }
      }).then(
          // si la requête est un succès, on récupère les commentaires
          (response) => {
            this.comments = response.data;
          }
      );
    },
    // fonction qui permet d'ajouter un commentaire
    commentApi(event) {
      event.preventDefault();
      const id = VueJwtDecode.decode(this.$cookies.get('myToken'))['id']
      axios.post(this.$domain+"comments", {
            content: this.content,
            creationDate: new Date(),
            user: '/api/users/'+id,
            post: '/api/posts/'+this.route.params.id
          },
          {
            headers: {
              'Accept' : 'application/json',
              'Authorization' : 'Bearer ' + this.$cookies.get("myToken")
            }
          }
      ).then(
          // si la requête est un succès, on ajoute le commentaire
          (response)=>{
            if (response.status !== 201){
              this.error="Erreur de l'api..";
            }
            this.content = "";
            document.getElementById("myModal").style.display = "none";
            this.getComments();
          }
      ).catch(
          // si la requête est un échec, on affiche l'erreur
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
    // fonction qui permet d'afficher le formulaire de commentaire
    showModal() {
      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      span.onclick = function() {
        modal.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      }
    }
  },

}
</script>

<style scoped>

.mainDiv{
  margin-left: 25%;
}

.postIdVue{
  display: block;
  width: auto;
}

.postTitle {
  font-size: x-large
}

.divComments{
   padding-left: 5vw;
 }

.postContent {
  margin-left: 30px;
}

.modal-content {
  background-color: var(--color-primary);
  width: 50%;
}

.modal-content #comment {
  width: 100%
}

.modal-content label {
  color: var(--color-text);
}

.modal-content textarea {
  color: var(--color-text);
}

@media all and (max-width: 991px) {
  .mainDiv{
    display: flex;
    margin-left: 15%;
  }
}
</style>