<template lang='pug'>
div
  h2 {{show.day}} at {{show.venue}}, {{formatTime(show.time)}}
  // Add anchor tag to bottom of page here!
  ul.list-group.pb-3
    li.list-group-item(v-for="act in show.acts") 
      .media.align-items-center.flex-wrap-reverse
        img(:src="act.imageUrl + 'b.jpg'" v-if="act.imageUrl")
        .media-body.m-3
          h2 {{act.name}} 
          h3 {{act.type}} 
            small(v-if="act.city") from {{act.city}}, {{act.state}}
          p.d-none.d-sm-block {{act.description}}
    li.list-group-item
      section(v-show="state==0")
        div.text-center(v-if="show._id == '5b1ec986bd40f900140ae3a7'")
          p Shit-Faced Shakespeare is an independent show! Please purchase tickets to their show from 
            a(href="https://www.shit-facedshakespeare.com/tickets-for-austin-shows--atx.html" target="_blank" style="color: #f9a01b") their website
        div(v-else)
          div(v-if="remaining == null")
            strong.text-info Getting ticket information...
          div(v-else-if="remaining<=0")
              strong.text-danger This show is sold out!
          div(v-else).text-center
            button.btn.btn-primary(type="button" @click="state=3") Buy Tickets – ${{show.price}}
            | &nbsp;
            button.btn.btn-primary(type="button" @click="state++") Reserve with Badge
      section.form(v-show="state==1")
        .form-group
          label Badge Email
          input.form-control(type="email" v-model="email")
        .form-group
          label Quantity
          select.custom-select(v-model="quantity")
            option 1
            option 2
            option 3
        .text-center
          button.btn.btn-secondary(type="button" @click="state--") Back
          | &nbsp;
          button.btn.btn-primary(type="button" @click="reserveWithBadge(show._id)") Make Reservation
      section(v-show="state==2")
        .text-center
          h2 Success!
          p A confirmation email has been sent to &nbsp;
            span.code {{email}}
      section(v-show="state==3")
        paypal(:show-id="show._id", :remaining="remaining" @paid="paid")
        .text-center
          button.mt-3.btn.btn-secondary(type="button" @click="state=0") Cancel
      section.mt-3
        .text-center
          font-awesome-icon(:icon="['fas', 'arrow-circle-left']" size="sm") 
          | &nbsp;
          a(href="/schedule") Back to the full schedule
</template>

<script>
  import axios from 'axios'
  import PayPal from '@/components/PayPal'

  export default {
    components: {paypal: PayPal},
    data() {
      return {
        state: 0,
        email: "",
        quantity: 1,
        remaining: null,
        clickCounter: 0,
      }
    },
    async asyncData ({ params, error, payload }) {
      if(payload) return {show: payload}
      else return {show: {acts: []}}
    },
    created() {
      this.shown()
    },
    methods: {
      paid(email) {
        this.email = email
        this.state = 2
      },
      shown() {
        let self = this
        return axios
          .get('https://app.oobfest.com/api/shows/get-remaining-tickets/' + self.show._id)
          .then((response)=> {
            self.remaining = Number(response.data.remaining)
          })
          .catch((error)=> {
            alert("Error getting ticket data")
            console.log(error)
          })
      },
      reserveWithBadge(showId) {
        if (this.email == '') return alert("Please enter email")

        let self = this
        axios
          .post('https://app.oobfest.com/api/shows/badge-reservation/' + showId, {email: self.email, quantity: self.quantity})
          .then(function(response) {
            if(response.data.reservationSuccessful) {
              self.state++
            }
            else {
              alert(response.data.message)
            }
          })
          .catch(function(error) {
            alert("Error reserving for show with badge :(")
            console.log(error)
            this.reset()
          })
      },
      reset() {
        this.state = 0
        // Keep the same email address for convenience!
        this.quantity = 1
      },
      formatVenue(venue) {
        switch(venue) {
          case 'Hideout Up':        return 'Hideout Upstairs'
          case 'Hideout Down':      return 'Hideout Downstairs'
          case 'ColdTowne':         return 'ColdTowne'
          case 'Fallout':           return 'Fallout'
          case 'Velveeta':          return 'Velveeta'
          case 'Spider House':      return 'Spider House'
          case 'Institution':       return 'Institution'
        }
      },
      formatTime(time) {
        time = String(time)
        return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
      },
      formatActType(type) {
        return type == 'Individual' 
          ? 'Sketch'
          : type
      }
    }
  }

</script>

<style scoped>
  .modal-act-name {
    font-size: 1.5rem;
  }

  .modal-act-description {
    font-size: 1rem;
  }

  .formy {
    width: 100%;
    max-width: 500px;
  }

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

  .form {
    max-width: 500px;
    margin: 0 auto;
  }

</style>