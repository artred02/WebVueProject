<template>
  Nom : {{profile.name}},<br>
  Email : {{profile.email}}
</template>

<script>
import axios from "axios";
import {useRoute} from "vue-router";

export default {
  name: "SeeProfileComponent",
  data() {
    return {
      profile: []
    }
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    getProfile(){
      axios.get(this.$domain + "users/" + this.route.params.id, {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : 'Bearer ' + this.$cookies.get("myToken")
        }
      }).then(
          (response) => {
            this.profile = response.data;
          }
      ).catch(
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

</style>