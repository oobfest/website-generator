<template lang="pug">
div.text-center
  script(src="https://www.paypalobjects.com/api/checkout.js")
  .row.justify-content-md-center
    .col-md-10
      .card-deck
        .card.bg-blue
          .card-head
            h2.m-3 All-Access Badge
          .card-body
            .row
              .col-md.align-self-center
                img.img-fluid.img-thumbnail(src="~/assets/images/promo/immigrants.jpg")
              .col.align-self-center(v-show="cardState==1")
                .card-title
                  h3.price
                    sup.dollar-sign $
                    span 99*
                p.font-italic * Special "early bird" price for a limited time
                ul
                  li All Shows (Including Headliners)
                  li Reserve Your Seat Ahead of Time
                  li After-Parties
                  li Food and Drink Discounts
                
                button.btn.btn-primary.btn-lg(type="button" @click="cardState++") Buy Now
              .col(v-show="cardState==2").text-left.align-self-center
                .max-width
                  .form-group
                    label(for="name") Name
                    input#name.form-control(type="text" v-model="badge.name")
                  .form-group
                    label(for="email") Email
                    input#email.form-control(type="email" v-model="badge.email")
                  .form-group
                    label(for="phone") Phone Number
                    input#phone.form-control(type="tel" v-model="badge.phone")
                  .form-group
                    label(for="quantity") Quantity
                    select#quantity.custom-select(name="quantity" v-model="badge.quantity")
                      option(selected) 1
                      option 2
                      option 3
                      option 4
                      option 5
                  .row
                    .col.text-right
                      .form-group
                        #paypal-button
                    .col.text-left
                      button.btn.btn-secondary(type="button" @click="cardState--") Cancel
              .col.align-self-center(v-show="cardState==3")
                p Thank you for your purchase! 
                p An email has been sent to 
                  span.code {{badge.email}}
  .row.justify-content-md-center
    .col-md-10
      .card-deck.mt-5
        .card.bg-blue.mb-5
          .card-head
            h2.m-3 Performer Upgrade
          .card-body
            .row
              .col.align-self-center(v-show="state==0")
                .card-title
                  h3.price
                    sup.dollar-sign $
                    span 69
                    span.tiny full-week
                  h3.price
                    sup.dollar-sign $
                    span 45
                    span.tiny weekend-only
                ul
                  li Upgrade your Performer badge to an All-Access badge
                  li For festival performers who want to reserve tickets
                  li Use the email included in your act's submission to verify
                  li Purchase a special “Weekend Upgrade” for Fri – Mon only
                .form-group
                  button.btn.btn-primary.btn-lg(type="button" @click="performerBadge.weekendOnly=true; state++") Weekend Upgrade
                .form-group
                  button.btn.btn-primary.btn-lg(type="button" @click="performerBadge.weekendOnly=false; state++") Full Week Upgrade
              .col.align-self-center(v-show="state==1")
                .max-width
                  .form-group
                    label(for="performer-email") Confirm Email
                    input#performer-email.form-control(type="text" v-model="performerBadge.email")
                  button.btn.btn-secondary.btn-lg(type="button" @click="state--") Cancel
                  | &nbsp;
                  button.btn.btn-primary.btn-lg(:disabled="performerBadge.email==''" type="button" @click="confirmPerformerEmail") Confirm Email Address
              .col.align-self-center(v-show="state==2")
                p We did not find your email. Please try again!
                button.btn.btn-secondary.btn-lg(type="button" @click="state--") Try Again
                p If you continue to have problems, email 
                  span.code(style="white-space:nowrap") box-office@oobfest.com
                  |  with your name, email and the act you are performing in.
              .col.align-self-center.text-left(v-show="state==3")
                .max-width
                  p Email confirmed!
                  .form-group
                    label(for="performer-name") Name
                    input#performer-name.form-control(type="text" v-model="performerBadge.name")
                  .form-group
                    label(for="performer-phone") Phone Number
                    input#performer-phone.form-control(type="tel" v-model="performerBadge.phone")
                  .row
                    .col.text-right
                      .form-group
                        #paypal-button-2
                    .col.text-left
                      button.btn.btn-secondary(type="button" @click="state-=2") Cancel
              .col.align-self-center(v-show="state==4")
                p Thank you for your purchase! 
                p An email has been sent to 
                  span.code {{performerBadge.email}}

              .col-md.align-self-center
                img.img-fluid.img-thumbnail(src="~/assets/images/promo/echo-lake.jpg")

</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        cardState: 1,
        state: 0,
        badge: {
          name: '', 
          email: '',
          phone: '',
          quantity: 1
        },
        performerBadge: {
          name: '',
          phone: '',
          email: '',
          weekendOnly: null,
        }
      }
    },
    methods: {
      isValid() {
        return this.badge.name != '' && 
               this.badge.email != '' && 
               this.badge.phone != ''
      },
      isValidPerformer() {
        return this.performerBadge.name != '' && 
               this.performerBadge.email != '' && 
               this.performerBadge.phone != ''
      },
      validate(actions) {
        this.isValid() ? actions.enable() : actions.disable()
      },
      onChange(handler) {
        document.querySelector('#name').addEventListener('change', handler)
        document.querySelector('#email').addEventListener('change', handler)
        document.querySelector('#phone').addEventListener('change', handler)
      },
      validatePerformerBadge(actions) {
        this.isValidPerformer() ? actions.enable() : actions.disable()
      },
      onChangePerformerBadge(handler) {
        document.querySelector('#performer-name').addEventListener('change', handler)
        document.querySelector('#performer-phone').addEventListener('change', handler)
      },
      confirmPerformerEmail() {
        let self = this
        axios
          .post('http://app.oobfest.com/api/submissions/confirm-performer-email', {email: this.performerBadge.email})
          .then(function(response) {
            let isValid = response.data.valid
            if(isValid) {
              self.state+= 2
            }
            else {
              self.state++
            }
          })
          .catch(function() { 
            alert("Email check failed. Please try again later. ")
          })
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
            .post('http://app.oobfest.com/api/paypal/create-badge-all-sale', self.badge)
            .then(function(response) {
              return response.id;
            })
        },
        onAuthorize: function(data, actions) {
          return actions.payment
            .get()
            .then(function(paymentData) {
              let requestData = {
                paymentId: data.paymentID,
                payerId: data.payerID,
                name: self.badge.name,
                email: self.badge.email,
                phone: self.badge.phone,
                quantity: paymentData.transactions[0].item_list.items[0].quantity
              }
              return actions.request
                .post('http://app.oobfest.com/api/paypal/execute-badge-all-sale', requestData)
                .then(function(response) {
                  self.cardState++
                })
            })
        }
      }, '#paypal-button')

      paypal.Button.render({
        env: 'production',
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
          self.validatePerformerBadge(actions)
          self.onChangePerformerBadge(function() { self.validatePerformerBadge(actions) })
        },
        onClick: function() {
          if(!self.isValidPerformer()) alert("All fields are mandatory")
        },
        payment: function(data, actions) {
          return actions.request
            .post('http://app.oobfest.com/api/paypal/create-performer-badge-sale', self.performerBadge)
            .then(function(response) {
              return response.id;
            })
        },
        onAuthorize: function(data, actions) {
          return actions.payment
            .get()
            .then(function(paymentData) {
              let requestData = {
                paymentId: data.paymentID,
                payerId: data.payerID,
                name: self.performerBadge.name,
                email: self.performerBadge.email,
                phone: self.performerBadge.phone,
                weekendOnly: self.performerBadge.weekendOnly
              }
              return actions.request
                .post('http://app.oobfest.com/api/paypal/execute-performer-badge-sale', requestData)
                .then(function(response) {
                  self.state++
                })
            })
        }
      }, '#paypal-button-2')
    }
  }

</script>

<style scoped>
  .weekend {
    font-size: 24px;
    color: white;
  }
  .card {
    border-radius: 5px;
  }
  .card-head {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .bg-blue {
    background-color: rgba(20, 128, 140, 0.75)
  }
  .bg-blue .card-head {
    background-color: #14808c;
  }
  .bg-gold {
    background-color: rgba(249, 160, 27, 0.5)
  }
  .bg-gold.header { 
    background-color: #f9a01b;
  }
  .bg-red {
    background-color: rgba(239, 76, 34, 0.2);
  }
  .bg-red .card-head {
    background-color: #ef4c22
  }
  .price {
    font-size: 80px;
    font-weight: 300;
    color: rgb(249, 160, 27);
  }
  .dollar-sign {
    font-size: 40px;
  }
  .tiny {
    margin: 0 0 0 12px;
    font-size: 32px;
  }
  .max-width {
    margin: 0 auto;
    max-width: 500px;
  }
</style>