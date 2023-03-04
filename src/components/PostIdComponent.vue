<template>
  Title : {{post.title}}<br>
  Content : {{post.content}}<br>
  Id: {{ post.id }}
</template>

<script>
import { useRoute } from 'vue-router';
import axios from "axios";
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
      axios.get("http://77.141.66.29:8888/api/posts/"+this.route.params.id,
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
  },

}
</script>

<style scoped>

</style>