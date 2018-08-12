<template lang="pug">
div(style="padding-bottom:3em")
  show-modal(:show="modalModel")
  .row.align-items-center
    .col-md
      img.img-fluid.rounded.float-right(:src="scaledImageUrl")
    .col-md.act-details
      h1 {{actName}} 
        small &mdash; {{formatType(showType)}}
      h5 {{city}}, {{state}}
        span(v-if="country != 'US'") , {{country}}
      p {{publicDescription}}
      section(v-if="performers.length > 1")
        h3 Cast &amp; Crew
        ul
          li(v-for="performer in performers") {{performer}}
      section(v-if="socialMedia.length > 0")
        h3 Social Media
        ul
          li(v-for="socialMediaLink in socialMedia")
            a(:href="socialMediaLink.url" target="_blank") {{socialMediaLink.type}}
      section(v-if="shows.length > 0")
        h3 Shows
        ul
          li(v-for="show in shows")
            a(href="#" @click.prevent="modalModel = show" v-b-modal.show-modal) {{formatDay(show.day)}}, {{formatTime(show.time)}} at {{formatVenue(show.venue)}} 
      p.text-right
        a(href="/acts") Back to Lineup
</template>

<script>
import axios from 'axios'
import ShowModal from '@/components/ShowModal'
export default {
  components: {ShowModal},
  async asyncData ({ params, error, payload }) {
    if(payload) return payload
    else return axios
      .get('https://app.oobfest.com/api/submissions/get-act/' + params.domain)
      .then((response)=> {
        response.data.shows = []
        return response.data
      })
  },
  data() {
    return {
      modalModel: {}
    }
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
  },
  methods: {
    formatType(type) {
      if(type == 'Individual') return 'Sketch'
      else return type;
    },
    formatVenue(venue) {
      switch(venue) {
        case 'Hideout Up':        return 'the Hideout Theatre (Upstairs)'
        case 'Hideout Down':      return 'the Hideout Theatre (Downstairs)'
        case 'ColdTowne':         return 'ColdTowne Theater'
        case 'Fallout':           return 'the Fallout Theater'
        case 'Velveeta':          return 'the Velveeta Room'
        case 'Spider House':      return 'Spider House Ballroom'
        case 'Institution':       return 'The Institution Theater'
      }
    },
    formatTime(time) {
      time = String(time)
      return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
    },
    formatDay(day) {
      switch(day) {
        case 'Tuesday':   return 'Tue, Aug. 28th'
        case 'Wednesday': return 'Wed, Aug. 29th'
        case 'Thursday':  return 'Thu, Aug. 30th'
        case 'Friday':    return 'Fri, Aug. 31st'
        case 'Saturday':  return 'Sat, Sep. 1st'
        case 'Sunday':    return 'Sun, Sep. 2nd'
        case 'Monday':    return 'Mon, Sep. 3rd'
      }
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