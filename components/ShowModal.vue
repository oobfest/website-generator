<template lang="pug">

  b-modal#show-modal(:size="modalSize" ref="showModal" @hidden="reset" hide-footer=true)
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
              p.modal-act-description {{act.description}}
        div(v-if="show.remaining<=0")
            strong.text-danger This show is sold out!
        div(v-else)
          .text-right
            button.btn.btn-secondary(type="button" @click="$refs.showModal.hide()") Cancel
            | &nbsp;
            button.btn.btn-primary(type="button" @click="" style="text-decoration: line-through" v-b-tooltip.hover title="Individual ticket sales coming soon!") Buy Tickets
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
        p Success!
        p A confirmation email has been sent to 
          span.code {{email}}
        .text-right
          button.btn.btn-primary(type="button" @click="$refs.showModal.hide()") Close
      section(v-show="state==3")
        paypal(:show-id="show._id")
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
      }
    },
    computed: {
      modalSize() {
        return this.state == 0 
          ? 'lg' 
          : 'md'
      }
    },
    methods: {
      reserveWithBadge(showId) {
        if (this.email == '') return alert("Please enter email")

        let self = this
        axios
          .post('http://app.oobfest.com/api/shows/badge-reservation/' + showId, {email: self.email, quantity: self.quantity})
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
        this.email = ""
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

  .modal {
    color: white;
  }

  .close {
    color: white;
  }

  .close:hover {
    color: white;
  }

  .modal-content {
    background-color: #2c3034;
  }

  .modal-header, .modal-footer {
    background-color: #212529;
    border: none;
  }

  .formy {
    width: 100%;
    max-width: 500px;
  }
</style>