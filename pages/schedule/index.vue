<template lang="pug">
.container-fluid
  .row
    .col
      show-modal(:show="modalModel")
      b-tabs(pills)
        b-tab(v-for="(day, index) in schedule",:key="index",:title="formatDay(day.name)")
          ul.list-unstyled.d-flex.flex-wrap.justify-content-around
            li.venue(v-for="venue in day.venues") 
              h3 {{formatVenue(venue)}}
              ul.list-unstyled
                li.showy(v-for="show in getShowsByDayAndVenue(day.name, venue)" v-b-modal.show-modal @click="getModal(show)")
                  span.time {{formatTime(show.time)}}
                  ul.list-unstyled
                    li.act(v-for="act in show.acts") {{act.name}}

</template>

<script>
import axios from 'axios'
import ShowModal from '@/components/ShowModal'

export default {
  components: {ShowModal},
  async asyncData ({ params, error, payload }) {
    if(payload) return payload
    else return axios
      .get('http://app.oobfest.com/api/shows/public')
      .then((response)=> {
        return {shows: response.data}
      })
  },
  data() {
    return {
      modalModel: {},
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
    getModal(show) {
      this.modalModel = show
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
  .nav.nav-pills {
    margin-bottom: 1rem;
  }
  .nav-link {
    font-variant: small-caps;
    font-weight: bold;
    color: #f9a01b;
    background-color: unset;
    font-size: 1.25rem;
  }
  .nav-pills .nav-link.active {
    color: black;
    background-color: #f9a01b;
  }

  h3 {
    font-size: 1.5rem;
    text-decoration: underline;
    text-transform: none;
    font-variant: small-caps;
    text-align: center;
  }

  .schedule {
  }

  .tabs {
    background-color: rgba(0,0,0,0.5);
    margin-top: 2rem;
  }

  .venue {
    width: 300px;
    margin-top: 1rem;
  }

  .showy {
    background-color: rgba(20, 128, 140, .75);
    padding: 0.5rem;
    border-radius: 5px;
    margin: 1rem 0;
  }
  .showy:hover {
    background-color: rgba(20,128,140,1);
    cursor: pointer;
  }

  .time {
    color: #f9a01b;
  }

  .act {
    font-size: 1rem;
  }
  .act + .act {
    border-top: 1px solid rgba(255,255,255,0.5);
  }

</style>