<template lang="pug">
div
  headline(:text="'Lineup'")
  .row
    .col
      acts-grid(:acts="acts")
</template>

<script>
  import axios from 'axios'
  import Headline from '@/components/Headline'
  import ActsGrid from '@/components/ActsGrid'

  export default {
    components: {ActsGrid, Headline},
    data() {
      return {
        acts: []
      }
    },
    async asyncData({params, error, payload}) {
      if(payload) return {workshops: payload}
      else return axios
        .get('https://app.oobfest.com/api/submissions/get-valid-acts')
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
