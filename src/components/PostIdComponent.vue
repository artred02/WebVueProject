<template>
  <div>Date de création : {{formatDate(post.creationDate)}}</div>
  <div class="childDiv">Titre : {{post.title}}</div>
  <div class="childDiv">Contenu : {{post.content}}</div>
  <div>
    <label for="comment">Commentaire : </label><br>
    <textarea name="" id="comment"></textarea>
  </div>
  <div v-for="comment in post.comments">{{comment}}</div>
  
</template>

<script>
import { useRoute } from 'vue-router';
import axios from "axios";
import dayjs from "dayjs";
export default {
  setup() {
    const route = useRoute();
    return { route }
  },
  name: "PostIdComponent",
  data () {
    return {
      post: [],
    }
  },
  mounted: function(){
    this.callApi();
  },
  methods: {
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

</style>