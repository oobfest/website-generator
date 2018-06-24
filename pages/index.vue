<template lang="pug">
  div
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
        let acts = response.data.sort((a, b)=> {return (a.actName < b.actName) ? -1 : (a.actName > b.actName) ? 1 : 0})
        return { acts }
      })
  }
}
</script>

<style>

</style>
