<template lang='pug'>
  b-modal#workshop-modal(:size="modalSize" ref="workshopModal" @hidden="reset" @shown="shown" hide-footer=true)
    template(slot="modal-header") 
      span {{workshop.day}}, {{formatVenue(workshop.venue)}} at {{formatTime(workshop.time)}}
      button.close(type="button" @click="$refs.workshopModal.hide()") &times;
    div.mt-2
      section(v-show="state==0")
        h2 {{workshop.name}} 
        .text-center.mb-3(v-if="workshop.imageUrl")
          img.img-fluid(:src="workshop.imageUrl + 'l.jpg'")
        h3 Workshop Details
        p {{workshop.description}}
        h3 About {{workshop.teacher}}
        vue-markdown(:source="workshop.bio")
        h3 When &amp; Where
        p {{formatDay(workshop.day)}}, {{formatTime(workshop.time)}}
        p(v-if="formatVenue(workshop.venue) == 'the Hideout Theatre'") At the 
          span.font-italic Hideout Theatre, 617 Congress Ave, Austin, TX 78701
        p(v-else) At 
          span.font-italic {{formatVenue(workshop.venue)}}
        .text-center.mt-3
          div(v-if="workshop.remaining > 0")
            button.btn.btn-secondary.btn-lg(type="button" @click="$refs.workshopModal.hide()") Cancel
            | &nbsp;
            button.btn.btn-primary.btn-lg(type="button" @click="state++") Buy Reservation - $45
          div(v-else)
            p.text-danger This workshop has sold out!
      section(v-show="state==1")
        .form-group
          label(for="name") Name 
            small (include everyone attending)
          input#name.form-control(type="text" v-model="ticket.name")
        .form-group
          label(for="email") Email
          input#email.form-control(type="email" v-model="ticket.email")
        .form-group
          label(for="phone") Phone Number
          input#phone.form-control(type="tel" v-model="ticket.phone")
        .form-group
          label(for="quantity") Quantity
          select#quantity.custom-select(name="quantity" v-model="ticket.quantity")
            option(v-for="n in workshop.remaining") {{n}}
        .row
          .col.text-right
            .form-group
              script(src="https://www.paypalobjects.com/api/checkout.js")
              #paypal-button
          .col.text-left
            .form-group
              button.btn.btn-secondary(type="button" @click="state--") Back
      section(v-show="state==2")
        p Thank you for your purchase!
        p An email has been sent to 
          span.code {{ticket.email}}


</template>

<script>
  import axios from 'axios'
  import VueMarkdown from 'vue-markdown'

  export default {
    components: {VueMarkdown},
    props: ['workshop'],
    data() {
      return {
        state: 0,
        ticket: {
          name: '',
          email: '',
          phone: '',
          quantity: 1
        }
      }
    },
    computed: {
      modalSize() {
        if(this.state>0) return 'md'
        else return 'lg'
      } 
    },
    methods: {
      shown() {
        // Get workshop info
        let self = this
        axios
          .get('https://app.oobfest.com/api/workshops/get-remaining/' + self.workshop._id)
          .then(function(response) {
            self.workshop.remaining = response.data.remaining
          })
          .catch(function(error) {
            alert("Error getting workshop data")
            console.log(error)
          })
      },
      reset() {
        this.state = 0
        this.quantity = 1
      },
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
      isValid() {
        return this.ticket.name != '' &&
          this.ticket.email != '' &&
          this.ticket.phone != ''
      },
      validate(actions) {
        this.isValid() ? actions.enable() : actions.disable()
      },
      onChange(handler) {
        document.querySelector('#name').addEventListener('change', handler)
        document.querySelector('#email').addEventListener('change', handler)
        document.querySelector('#phone').addEventListener('change', handler)
      }
    },
    mounted() {
      let self = this
      paypal.Button.render({
        env: 'production',
        commit: true,
        style: {
          layout: 'vertical',
          size:   'medium',
          shape:  'rect',
          color:  'gold' 
        },
        funding: {
          allowed: [ paypal.FUNDING.CARD ],
          disallowed: [ paypal.FUNDING.CREDIT ]
        },
        validate: function(actions) {
          self.validate(actions)
          self.onChange(function() { self.validate(actions) })
        },
        onClick: function() {
          if(!self.isValid()) alert('Please fill in all fields')
        },
        payment: function(data, actions) {
          return actions.request
            .post('https://app.oobfest.com/api/paypal/create-workshop-sale', {name: self.workshop.name, quantity: self.ticket.quantity})
            .then(function(response) {
              return response.id
            })
        },
        onAuthorize: function(data, actions) {
          return actions.payment
            .get()
            .then(function(paymentData) {
              let requestData = {
                paymentId: data.paymentID,
                payerId: data.payerID,
                domain: self.workshop.domain,
                name: self.ticket.name,
                email: self.ticket.email,
                phone: self.ticket.phone,
                quantity: paymentData.transactions[0].item_list.items[0].quantity
              }
              return actions.request
                .post('https://app.oobfest.com/api/paypal/execute-workshop-sale', requestData)
                .then(function(response) {
                  self.state++
                })
            })
        }
      }, '#paypal-button')
    }
  }
</script>