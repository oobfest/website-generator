<template lang="pug">
div(style="padding-bottom:3em")
  .row.align-items-center
    .col-md
      img.img-fluid.rounded.float-right(:src="scaledImageUrl")
    .col-md.act-details
      h1 {{actName}}
      p {{publicDescription}}
      section(v-if="performers.length > 1")
        h3 Cast &amp; Crew
        ul
          li(v-for="performer in performers") {{performer}}
      //section(v-if="socialMedia.length > 0")
        h3 Links
        ul
          li(v-for="socialMediaLink in socialMedia")
            a(:href="socialMediaLink.url" target="_blank") {{socialMediaLink.type}}
      p.text-right
        a(href="/lineup") Back to Lineup
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
      let performers = []
      performers.push(this.primaryContactName)
      this.additionalMembers.forEach(m=> {if(m.attending) performers.push(m.name)})
      return performers
    },
    scaledImageUrl() {
      return this.imageUrl.substr(0, this.imageUrl.length-4) + 'l.jpeg'
    }
  }
}

</script>

<style>
.act-details {
  border: 2px solid grey;
  margin-right: 15px;
  background-color: rgba(0,0,0,0.75);
  box-shadow: 3px 3px 5px black;
}
</style>