<template>
Main : {{id}}
</template>

<script>
export default {
  name: "MainComponent",
  data () {
    return {
      id: this.$cookies.get('myId')
    }
  }
}
</script>

<style scoped>

</style>