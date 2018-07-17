<template lang="pug">

  b-modal#show-modal(ref="showModal" hide-footer=true @hidden="reset")
    template(slot="modal-header") 
      span.h6 {{formatDay(show.day)}}, {{formatVenue(show.venue)}} at {{formatTime(show.time)}}
      button.close(type="button" @click="$refs.showModal.hide()") &times;
    ul
      li(v-for="act in show.acts") {{act.name}}
    hr
    section(v-show="state==0")
      //button.btn.btn-primary(type="button" @click="state++") Reserve with Badge
    section(v-show="state==1")
      .form-group
        label Badge Email
        input.form-control(type="email" v-model="email")
      .form-group
        label Quantity
        select.custom-select(v-model="quantity")
          option 1
          option 2b
          option 3
      .form-group
        button.btn.btn-primary(type="button" @click="makeBadgeReservation") Make Reservation
    section(v-show="state==2")
      p Success!
      button.btn.btn-primary(type="button" @click="$refs.showModal.hide()") Close

</template>

<script>
  import axios from 'axios'

  export default {
    props: ['show'],
    data() {
      return {
        state: 0,
        email: "",
        quantity: 1
      }
    },
    methods: {
      makeBadgeReservation() {
        if(this.email == '') {
          alert("Please enter an email address")
          return
        }
        axios
          .post('http://app.oobfest.com/api/shows/badge-reservation/' + this.show._id, {email: this.email, quantity: this.quantity})
          .then((response)=> {
            console.log(response.data)
            console.log(response)
            let success = response.data.valid
            if(success) this.state++
            else {
              alert(response.data.message)
              this.reset()
            }
          })
          .catch((error)=> {
            alert("Error making badge reservation")
            this.reset()
          })
      },
      reset() {
        this.state = 0
        this.email = ""
        this.quantity = 1
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