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
  .pb-5
  //.row.justify-content-md-center
    .col-md-10
      .card-deck.mt-5
        .card.bg-blue.mb-5
          .card-head
            h2.m-3 Performer Upgrade
          .card-body
            .row
              .col.align-self-center
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
                  li For people performing in the festival
                  li Upgrade your Performer pass to an All-Access pass. 
                  li Use the email included in your act's submission to verify
                  li Purchase a special “Weekend Upgrade” for Fri – Mon only
                button.btn.btn-primary.btn-lg(type="button") Weekend Upgrade
                | &nbsp;
                button.btn.btn-primary.btn-lg(type="button") Full Week Upgrade
              .col.align-self-center
                img.img-fluid.img-thumbnail(src="~/assets/images/promo/echo-lake.jpg")

</template>

<script>
  export default {
    data() {
      return {
        cardState: 1,
        badge: {
          name: '', 
          email: '',
          phone: '',
          quantity: 1
        }
      }
    },
    methods: {
      isValid() {
        return this.badge.name != '' && 
               this.badge.email != '' && 
               this.badge.phone != ''
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
            .post('http://app.oobfest.com/api/paypal/create-badge-all-sale', self.badge)
            .then(function(response) {
              console.log("RESPONSE", response.id)
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
</style>