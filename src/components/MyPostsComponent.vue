<template>
  <div v-if="user !== null">
    <div>
      {{user}}<br>
      {{user.email}}<br>
      {{user.name}}<br>
      <div v-for="post in user.posts"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyPostsComponent",
  data () {
    return {
      user: null
    }
  },
  mounted: function () {
    if (this.$cookies.isKey("myToken")){
      this.getUser();
    }
  },
  methods: {
    getUser() {
      axios.get(this.$domain + 'users/' + this.$cookies.get('myId'),
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.$cookies.get("myToken")
            }
          }
      ).then(
          (response) => {
            this.user = response.data;
          }
      ).catch(
          (error) => {
            console.log(error.response.data.message);
            if(error.response.data.message === "Expired JWT Token" || error.response.data.message === "Invalid JWT Token"){
              this.$cookies.remove("myToken");
              this.$cookies.remove("myId");
            }
          }
      );
    }
  }
}
</script>

<style scoped>

</style>