<template lang="pug">
  .row
    .col
      h2.text-center Workshops
      ul(v-for="workshop in workshops")
        li 
          a(:href="'/workshops/' + workshop.domain") {{workshop.name}}
</template>

<script>
  import limax from 'limax'
  export default {
    async asyncData({params, error, payload}) {
      if(payload) return {workshops: payload}
      else return {workshops: [
        {domain: 'not-found', name: "Not Found"}
      ]}
    },
    computed: {
      domain() {
        return '/' + limax(name)
      }
    }
  }

</script>