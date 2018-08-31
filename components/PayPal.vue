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
      option(v-for="n in remaining") {{n}}
  .row
    .col-3
    .col-8
      #paypal-button

</template>

<script>
  import axios from 'axios'
  
  export default {
    props: ['showId', 'remaining'],
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
        env: 'production',
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
            .post('https://app.oobfest.com/api/paypal/create-ticket-sale/' + self.showId, self.ticket)
            .then(function(response) {
              return response.data.id
            })
            .catch(function(error) {
              alert("Payment creation failed, show may have sold out!")
              console.log(error)
            })
        },
        onAuthorize: function(data, actions) {
          return actions.payment
            .get()
            .then(function(paymentData) {
              let requestData = {
                paymentId: data.paymentID,
                payerId: data.payerID,
                ticket: self.ticket
              }
              return axios
                .post('https://app.oobfest.com/api/paypal/execute-ticket-sale/' + self.showId, requestData)
                .then(function(response) {
                  self.$emit('paid')
                })
                .catch(function(error) {
                  alert("Payment execution failed")
                  console.log(error)
                })
            })
        },
        onError: function(error) {
          console.log("Error")
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