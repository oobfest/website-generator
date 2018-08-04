<template lang="pug">

  b-modal#show-modal(:size="modalSize" ref="showModal" @hidden="reset" @shown="shown" hide-footer=true)
    template(slot="modal-header") 
      span {{show.day}}, {{formatVenue(show.venue)}} at {{formatTime(show.time)}}
      button.close(type="button" @click="$refs.showModal.hide()") &times;

    div.mt-2
      section(v-show="state==0")
        ul.list-unstyled
          li.media(v-for="act in show.acts")
            img.mr-3.align-self-center(:src="act.imageUrl + 'b.jpg'" v-if="act.imageUrl")
            .media-body.align-self-center
              h2.modal-act-name {{act.name}}
                small &mdash; {{formatActType(act.type)}}
              h5(v-if="act.city") {{act.city}}, {{act.state}}
              p.modal-act-description {{act.description}}
        div.text-center(v-if="show._id == '5b1ec986bd40f900140ae3a7'")
          p Shit-Faced Shakespeare is an independent show! Please purchase tickets to their show from 
            a(href="https://www.shit-facedshakespeare.com/tickets-for-austin-shows--atx.html" target="_blank" style="color: #f9a01b") their website
        div(v-else)
          div.text-right(v-if="remaining<=0")
              strong.text-danger This show is sold out!
          div(v-else)
            .text-right
              button.btn.btn-secondary(type="button" @click="$refs.showModal.hide()") Cancel
              | &nbsp;
              button.btn.btn-primary(type="button" @click="state=3") Buy Tickets – ${{show.price}}
              | &nbsp;
              button.btn.btn-primary(type="button" @click="state++") Reserve with Badge
      section(v-show="state==1")
        .form-group
          label Badge Email
          input.form-control(type="email" v-model="email")
        .form-group
          label Quantity
          select.custom-select(v-model="quantity")
            option 1
            option 2
            option 3
        .text-right
          button.btn.btn-secondary(type="button" @click="state--") Back
          | &nbsp;
          button.btn.btn-primary(type="button" @click="reserveWithBadge(show._id)") Make Reservation
      section(v-show="state==2")
        .text-center
          h2 Success!
          p A confirmation email has been sent to &nbsp;
            span.code {{email}}
        .text-right
          button.btn.btn-primary(type="button" @click="$refs.showModal.hide()") Close
      section(v-show="state==3")
        paypal(:show-id="show._id", :remaining="remaining" @paid="paid")
        .text-right
          button.btn.btn-secondary(type="button" @click="state=0") Back

</template>

<script>
  import axios from 'axios'
  import PayPal from '@/components/PayPal'

  export default {
    components: {paypal: PayPal},
    props: ['show', 'acts'],
    data() {
      return {
        state: 0,
        email: "",
        quantity: 1,
        remaining: 0,
        clickCounter: 0,
      }
    },
    computed: {
      modalSize() {
        return this.state == 0 || this.state == 2
          ? 'lg' 
          : 'md'
      }
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

<style>
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
</style>