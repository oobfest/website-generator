<template lang="pug">
  div
    h1 {{actName}}
    p {{publicDescription}}
    ul(v-if="performers.length > 1")
      li(v-for="performer in performers") {{performer}}
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      act: {}
    }
  },
  async asyncData ({ params, error, payload }) {
    if (payload) return payload
    else return axios
      .get('http://app.oobfest.com/api/submissions/get-act/' + params.domain)
      .then((response)=> {
        return response.data
      })
  },
  computed: {
    performers() {
      let performers = [this.primaryContactName]
      this.additionalMembers.forEach(m=> {if(m.attending) performers.push(m.name)})
      return performers
    }
  }
}

</script>