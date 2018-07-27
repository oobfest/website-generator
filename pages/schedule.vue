<template lang="pug">
.container-fluid
  headline(:text="'Schedule'")
  show-modal(:show="modalModel")
  .row
    .col
      .tabs
        ul.nav.nav-pills
          li.nav-item(v-for="(day, index) in schedule",:key="index")
            a.nav-link(:class="{'active': selectedDay == day.name}" href="#" @click.prevent="selectedDay = day.name") {{formatDay(day.name)}}
        .tab-content
          .tab-pane.show.active(v-for="day in schedule" v-show="selectedDay == day.name")
            ul.list-unstyled.d-flex.flex-wrap.justify-content-around
              li.venue(v-for="venue in day.venues") 
                h3 {{formatVenue(venue)}}
                ul.list-unstyled
                  li.showy.text-center(v-for="show in getShowsByDayAndVenue(day.name, venue)" v-b-modal.show-modal @click="modalModel = show")
                    .mb-1
                      span.time {{formatTime(show.time)}}
                        span(v-if="show.endTime")  to {{show.endTime}}
                    ul.list-unstyled
                      li.media(v-for="act in show.acts") 
                        img(:src="act.imageUrl + 's.jpg'" v-if="act.imageUrl")
                        .media-body.ml-2.align-self-center(style="line-height: 1")
                          span.act-name {{act.name}}
                          br
                          span.act-location(v-if="act.city && act.city != 'Austin'") {{act.city}}, {{act.state}}
                    .text-center(v-if="show.remaining <= 0")
                      span.sold-out Sold out!
</template>

<script>
import axios from 'axios'
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

  .sold-out {
    font-variant: small-caps;
    font-weight: bold;
    color: #eb4d30;
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
    margin: 1.5rem 0;
  }
  .showy:hover {
    background-color: rgba(20,128,140,1);
    cursor: pointer;
  }

  .time {
    color: #f9a01b;
  }

  .act-name {
    font-size: 17px;
  }

  .act-location {
    font-size: 12px;
  }

  .media + .media {
    margin-top: 1rem;
  }
  .act + .act {
    /*border-top: 1px solid rgba(255,255,255,0.5);*/
  }

</style>