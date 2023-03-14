<template>
  <div class="postIdVue">
    <br><br>
    <div class="childDiv" style="font-size: x-large">{{post.title}}</div>
    <br>
    <div><span v-if="this.post.user !== undefined && this.post.user !== 0">{{post.user.name}}</span> <span class="date">{{formatDate(post.creationDate)}}</span></div>
    <br>
    <div class="childDiv" style="margin-left: 2%">{{post.content}}</div>
    <br>
    <button @click="showModal" id="myBtn">Commenter</button>

    <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <form @submit="commentApi($event)">
          <label for="comment">Commentaire : </label><br>
          <textarea name="" id="comment" v-model="content"></textarea><br>
          <input type="submit" value="Commenter">
        </form>
      </div>

    </div>
    <br>

    <br>
    <div v-for="comment in this.comments" v-if="this.comments !== undefined && this.comments.length !== 0" class="divComments">
      <div>
        <span><b>{{comment.user.name}}</b></span>, <span class="date">{{formatDate(comment.creationDate)}}</span><br>
        <span style="margin-left: 2%">{{comment.content}}</span>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from "axios";
import dayjs from "dayjs";
export default {
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
    }
  },
  mounted: function(){
    this.callApi();
  },
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format('DD/MM/YYYY, HH:mm');
    },
    changeDisplay() {
      if (this.isDisplayForm === 'none') {
        this.isDisplayForm = '';
      } else {
        this.isDisplayForm = 'none'
      }
    },
    callApi() {
      this.post = [];
      axios.get(this.$domain+"posts/"+this.route.params.id,
          {
            headers: {
              'Accept' : 'application/json',
            }
          }
      ).then(
          (response) => {
            this.post = response.data;
            this.getComments();
          }
      );
    },
    getComments() {
      this.comments = [];
      axios.get(this.$domain+"comments/post/"+this.post.id, {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : 'Bearer ' + this.$cookies.get("myToken")
        }
      }).then(
          (response) => {
            this.comments = response.data;
          }
      );
    },
    commentApi(event) {
      event.preventDefault();
      axios.post(this.$domain+"comments", {
            content: this.content,
            creationDate: new Date(),
            user: '/api/users/'+this.$cookies.get('myId'),
            post: '/api/posts/'+this.route.params.id
          },
          {
            headers: {
              'Accept' : 'application/json',
              'Authorization' : 'Bearer ' + this.$cookies.get("myToken")
            }
          }
      ).then(
          (response)=>{
            if (response.status !== 201){
              this.error="Erreur de l'api..";
            }
            console.log(response)
            this.content = "";
            document.getElementById("myModal").style.display = "none";
            this.getComments();
          }
      )
    },
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

</style>