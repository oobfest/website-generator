<template lang="pug">
.container-fluid
  .row
    .col
      ul.list-unstyled
        li(v-for="day in schedule")
          h2.mt-3.mb-1 {{day.name}}
          ul.list-unstyled
            li(v-for="venue in day.venues")
              ul
                li(v-for="show in getShowsByDayAndVenue(day.name, venue)") 
                  a(:href="`/${day.name.toLowerCase()}/${limax(venue)}/${show.time}/`") {{venue}}, {{formatTime(show.time)}}
</template>

<script>
import axios from 'axios'
import limax from 'limax'
import Headline from '@/components/Headline'
import ShowModal from '@/components/ShowModal'
export default {
  components: {ShowModal, Headline},
  async asyncData ({params, error, payload}) {
    if(payload) return {shows: payload}
    else return axios
      .get('https://app.oobfest.com/api/shows/public')
      .then(function(response) {
        return { shows: response.data }
      })
      .catch(function(error) {
        return { shows: [] }
      })
  },
  data() {
    return {
      modalModel: {},
      selectedDay: 'Tuesday',
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
      venues: ['Hideout Down', 'Hideout Up', 'ColdTowne', 'Fallout', 'Velveeta', 'Spider House', 'Institution'],
      schedule: [
        {name: 'Tuesday',    venues: ['Hideout Down', 'Hideout Up', 'ColdTowne']},
        {name: 'Wednesday',  venues: ['Hideout Down', 'Hideout Up', 'ColdTowne']},
        {name: 'Thursday',   venues: ['Hideout Down', 'Hideout Up', 'ColdTowne', 'Fallout', 'Velveeta']},
        {name: 'Friday',     venues: ['Hideout Down', 'Hideout Up', 'ColdTowne', 'Fallout', 'Velveeta', 'Spider House']},
        {name: 'Saturday',   venues: ['Hideout Down', 'Hideout Up', 'ColdTowne', 'Fallout', 'Velveeta', 'Spider House', 'Institution']},
        {name: 'Sunday',     venues: ['Hideout Down', 'Fallout', 'Velveeta']},
        {name: 'Monday',     venues: ['Hideout Down']},
      ]
    }
  },
  methods: {
    limax(input) {
      return limax(input)
    },
    getShowsByDayAndVenue(day, venue) {
      return this.shows.filter(s=> s.day == day && s.venue == venue)
    },
    formatVenue(venue) {
      switch(venue) {
        case 'Hideout Up':        return 'Hideout Theatre Upstairs'
        case 'Hideout Down':      return 'Hideout Theatre Downstairs'
        case 'ColdTowne':         return 'ColdTowne Theater'
        case 'Fallout':           return 'Fallout Theater'
        case 'Velveeta':          return 'Velveeta Room'
        case 'Spider House':      return 'Spider House Ballroom'
        case 'Institution':       return 'Institution Theater'
      }
    },
    formatTime(time) {
      time = String(time)
      return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
    }
  }
}
</script>