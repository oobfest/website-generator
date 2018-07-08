<template lang="pug">
div
  .row
    .col  
      h2 {{name}}
      vue-markdown {{description}}
    .col
      img(:src="thumbnailUrl")
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    components: {VueMarkdown},
    computed: {
      thumbnailUrl() {
        return this.imageUrl.substr(0, this.imageUrl.length-4) + 'l.jpeg)'
      }
    },
    async asyncData ({ params, error, payload }) {
      if(payload) return payload
      else return {
        name: "Not Found",
        description: "Really **fancy** stuff",
        imageUrl: 'https://i.imgur.com/Yiuleg5.jpg'
      }
    }
  }
</script>

<style>
</style>