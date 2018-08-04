<template lang="pug">
div
  headline(:text="'Workshops'")
  workshop-modal(:workshop="selectedWorkshop")
  .row
    .col
      .box
        h2 Workshop Information
        ul
          li Workshops are 3 hours long and cost $55/student 
          li If a workshop sells out you can get on a waiting list. As students drop reservations will become available to people on the waitlist in the order they signed up.
          li Workshops are open to anyone but it is recommended that students have some improv experience.
          li On the day of the class students can register in person if the workshop has not sold out.
          li A student’s spot in a workshop is forfeited if they are more than 10 minutes late without notification. Their spot will become available to those on the waitlist. 
        h2 Questions?
        asaf-contact-modal
  .row.pb-4
    .col
      div(v-for="day in days")
        ul.list-group
          div(v-for="time in times")
            li.list-group-item(v-for="workshop in workshopsByDay(day).filter(w=>w.time == time)") 
              .media.align-items-center.flex-wrap-reverse
                .media-body.m-3
                  h2 {{workshop.name}} 
                    small.font-italic &mdash; {{workshop.teacher}}
                  h3(v-if="workshop.affiliation") {{workshop.affiliation}}
                  h4 {{formatDay(day)}}, {{formatTime(time)}} at {{formatVenue(workshop.venue)}}
                  p.d-none.d-sm-block {{workshop.description}}
                  button.btn.btn-primary.btn-lg(type="button" v-b-modal.workshop-modal @click="selectedWorkshop = workshop") Read More
                img(:src="workshop.imageUrl + 'm.jpg'" style="max-width: 250px")
          
</template>

<script>
  import axios from 'axios'
  import Headline from '@/components/Headline'
  import WorkshopModal from '@/components/WorkshopModal'
  import AsafContactModal from '@/components/AsafContactModal'
  export default {
    components: {Headline, WorkshopModal, AsafContactModal},
    data() {
      return {
        days: ['Saturday', 'Sunday'],
        times: [10, 40],
        selectedWorkshop: {}
      }
    },
    async asyncData({params, error, payload}) {
      if(payload) return {workshops: payload}
      else return axios
        .get('https://app.oobfest.com/api/workshops/public')
        .then((response)=> {
          return {workshops: response.data}
        })
    },
    methods: {
      formatDay(day) {
        if(day=='Saturday') return 'Saturday, September 1st'
        if(day=='Sunday') return 'Sunday, September 2nd'
        else return day
      },
      formatVenue(venue) {
        switch(venue) {
          case 'Hideout Down':
          case 'Hideout Up':
          case 'Hideout Classroom':
            return 'the Hideout Theatre'
          default: return venue
        }
      },
      formatTime(time) {
        if(time == 10) return '11:00am'
        else return '3:00pm'
      },
      workshopsByDay(day) {
        return this.workshops
          .filter(w=> w.day == day)
      }
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
  .list-group-item, .box {
    background-color: rgba(0, 0, 0, 0.75);
    border: 1px solid grey;
    margin-top: 1rem;
  }

  .box {
    padding: 2rem;
  }

</style>