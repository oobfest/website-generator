<template lang="pug">
div
  .row
    .col
      img.float-right(:src="thumbnailUrl")
    .col  
      h2 {{name}}
      p By 
        span.font-italic {{teacher}}
        span(v-if="affiliation")  from 
          span.font-italic {{affiliation}}
      h3 Workshop Details
      vue-markdown {{description}}
      h3 Teacher Bio
      vue-markdown {{bio}}
      h3 Event Details
      p {{day}}, {{getTime(time)}} at {{venue}}.

</template>

<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    components: {VueMarkdown},
    computed: {
      thumbnailUrl() {
        return this.imageUrl + 'l.jpeg'
      }
    },
    methods: {
      getTime(time) {
        if(time=="10") return "11:00am"
        if(time=="20") return "12:00pm"
        if(time=="30") return "1:00pm"
        if(time=="40") return "3:00pm"
      }
    },
    async asyncData ({ params, error, payload }) {
      if(payload) return payload
      else return {
        name: "Not Found",
        description: "Really **fancy** stuff",
        teacher: "Dr. Improv",
        affiliation: "Cleveland, OH",
        bio: "This person keeps an air of mystery about them.",
        imageUrl: 'https://i.imgur.com/Yiuleg5',
        day: "Gluesday",
        venue: "Hideout Mystery Room",
        time: "20"
      }
    }
  }
</script>

<style>
  h3 {
    color: #eb4d30;
    text-transform: uppercase;
    font-weight: bold;
  }
</style>