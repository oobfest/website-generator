<template lang="pug">
  .row
    .col
      .table-responsive
        table.table.table-dark.table-striped
          tbody
            tr(v-for="workshop in workshops")
              td
                h2 {{workshop.name}} 
                h3 by {{workshop.teacher}}
                p {{workshop.description}} 
                a.btn.btn-primary.btn-lg(:href="'/workshops/' + workshop.domain") See More
              td.middle
                img(:src="workshop.imageUrl + 'm.jpg'")
          
</template>

<script>
  import axios from 'axios'
  import limax from 'limax'
  export default {
    async asyncData({params, error, payload}) {
      if(payload) return {workshops: payload}
      else return axios
        .get('https://app.oobfest.com/api/workshops/public')
        .then((response)=> {
          return {workshops: response.data}
        })
    },
    computed: {
      domain() {
        return '/' + limax(name)
      },

    }
  }

</script>

<style scoped>
  img {
    /*border: 2px solid white;*/
    border-radius: 4px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, .25)
  }
  .middle {
    vertical-align: middle;
    text-align: center;
  }
</style>