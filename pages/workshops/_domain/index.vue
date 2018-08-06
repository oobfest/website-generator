<template lang="pug">
div
  script(src="https://www.paypalobjects.com/api/checkout.js")
  .row.justify-content-center
    .col-md-8.workshop
      h2 {{workshop.name}}
      p By 
        span.font-italic {{workshop.teacher}}
        span(v-if="workshop.affiliation")  from 
          span.font-italic {{workshop.affiliation}}
        .text-center
          img.m-2.img-fluid(:src="thumbnailUrl")
      section(v-show="state==0")
        h3 Workshop Details
        vue-markdown {{workshop.description}}
        h3 Teacher Bio
        vue-markdown {{workshop.bio}}
        h3 Event Details
        p {{workshop.day}}, {{getTime(workshop.time)}} at {{getVenue(workshop.venue)}}
        .text-center
          .form-group(v-if="workshop.sold < workshop.capacity")
            button.btn.btn-primary.btn-lg(@click="state++" type="button") Get Reservation - $55*
            p.mt-3 * Special "early bird" price until August 1st
          .form-group(v-else-if="workshop.auditSold < workshop.auditCapacity")
            p Audit reservations available
            //button.btn.btn-primary.btn-lg(@click="state=10" type="button") Get Audit Reservation - $15
          div(v-else).text-center
            p.sold-out This workshop has sold out!
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
            option(v-for="n in (workshop.capacity - workshop.sold)") {{n}}
        .row
          .col.text-right
            .form-group
              #paypal-button
          .col.text-left
            .form-group
              button.btn.btn-secondary(type="button" @click="state--") Cancel
      section(v-show="state==2")
        p Thank you for your purchase!
        p An email has been sent to 
          span.code {{ticket.email}}

</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import axios from 'axios'

  export default {
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
    components: {VueMarkdown},
    computed: {
      thumbnailUrl() {
        return this.workshop.imageUrl + 'l.jpeg'
      }
    },
    methods: {
      getTime(time) {
        if(time=="10") return "11:00am"
        if(time=="20") return "12:00pm"
        if(time=="30") return "1:00pm"
        if(time=="40") return "3:00pm"
      },
      getVenue(venue) {
        if(venue=="Hideout Down") return "the Hideout Theatre"
        if(venue=="Hideout Up") return "the Hideout Theatre"
        if(venue=="Hideout Classroom") return "the Hideout Theatre"
        else return venue
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
    async asyncData({params, error, payload}) {
      // Always get via API, in case workshop sells out
      return axios
        .get('https://app.oobfest.com/api/workshops/get-by-domain/' + params.domain)
        .then((response)=> {
          return {workshop: response.data}
        })
        .catch((error)=> {
          alert("Error loading workshop")
          console.log(error)
        })
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

<style>
  .workshop {
    border: 2px solid grey;
    margin: 1rem;
    padding: 1rem;
    background-color: rgba(0,0,0,0.75);
    box-shadow: 3px 3px 5px black;
  }
  .sold-out {
    padding: 0.5em;
    background-color: #15808c;
  }

</style>