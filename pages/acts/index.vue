<template lang="pug">
  .row
    .col
      h2.text-center Lineup
      acts-grid(:acts="acts")
</template>

<script>
  import axios from 'axios'
  import ActsGrid from '@/components/ActsGrid'

  export default {
    components: {ActsGrid},
    data() {
      return {
        acts: []
      }
    },
    asyncData() {
      return axios
        .get('http://app.oobfest.com/api/submissions/get-valid-acts')
        .then((response)=> {
          let featuredActs = response.data
            .filter(a=> a.headliner)
            .sort((a, b)=> {return (a.actName < b.actName) ? -1 : (a.actName > b.actName) ? 1 : 0})
          let nonFeaturedActs = response.data
            .filter(a=>!a.headliner)
            .sort((a, b)=> {return (a.actName < b.actName) ? -1 : (a.actName > b.actName) ? 1 : 0})
          return { acts : featuredActs.concat(nonFeaturedActs) }
        })
    }
  }
</script>
