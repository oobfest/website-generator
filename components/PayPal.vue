<template lang="pug">
.form
  script(src="https://www.paypalobjects.com/api/checkout.js")
  .form-group
    label(for="name") Name 
    input#paypal-name.form-control(type="text" v-model="ticket.name")
  .form-group
    label(for="email") Email
    input#paypal-email.form-control(type="email" v-model="ticket.email")
  .form-group
    label(for="phone") Phone Number
    input#paypal-phone.form-control(type="tel" v-model="ticket.phone")
  .form-group
    label(for="quantity") Quantity
    select#paypal-quantity.custom-select(name="quantity" v-model="ticket.quantity")
      option 1
      option 2
      option 3
  .row
    .col-3
    .col-6
      #paypal-button

</template>

<script>
  import axios from 'axios'
  
  export default {
    props: ['showId'],
    data() {
      return {
        ticket: {
          name: '',
          email: '',
          phone: '',
          quantity: 1
        }
      }
    },
    methods: {
      isValid() {
        return this.ticket.name != '' &&
          this.ticket.email != '' &&
          this.ticket.phone != ''
      },
      validate(actions) {
        this.isValid()
          ? actions.enable()
          : actions.disable()
      },
      onChange(handler) {
        document.querySelector('#paypal-name').addEventListener('change', handler)
        document.querySelector('#paypal-email').addEventListener('change', handler)
        document.querySelector('#paypal-phone').addEventListener('change', handler)
      }
    },
    // Mounted? Or OnCreate?
    mounted() {
      let self = this
      paypal.Button.render({

        // Properties
        env: 'sandbox',       // Remember to switch me back to 'production'!
        commit: true,
        style: {layout: 'vertical', size: 'medium', shape: 'rect', color: 'gold'},
        funding: {allowed: [paypal.FUNDING.CARD], disallowed: [paypal.FUNDING.CREDIT]},

        // Methods
        validate: function(actions) {
          self.validate(actions)
          self.onChange(function() { self.validate(actions)})
        },
        onClick: function() {
          let isInvalid = !(self.isValid())
          if(isInvalid) alert('Please fill in all fields')
        },
        payment: function(data, actions) {
          return axios
            .post('http://test.oobfest.com/api/paypal/create-ticket/' + self.showId, self.ticket)
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
                // Whatever other fields I'll need
              }
              return axios
                .post('http://test.oobfest.com/api/paypal/execute-ticket', requestData)
                .then(function(response) {
                  // Do whatever when it's successful
                })
            })
        }
      }, '#paypal-button')
     }
  }
</script>

<style scoped>
  .form {
    max-width: 500px;
    margin: 0 auto;
  }
</style>