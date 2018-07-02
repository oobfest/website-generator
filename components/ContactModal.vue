<template lang="pug">
div
  b-button.footer-link-text(@click="showModal" variant="link") Contact
  b-modal(title="Contact" ref="contactModal")
    .form-group
      label.col-form-label(for="contact-name") Full Name
      input#contact-name.form-control(v-model="contactFormData.name" type="text" name="name" required)
    .form-group
      label.col-form-label(for="contact-email") Email
      input#contact-email.form-control(v-model="contactFormData.email" type="email" name="email" required)
    .form-group
      label.col-form-label(for="contact-subject") Subject
      input#contact-subject.form-control(v-model="contactFormData.subject" type="text" name="subject")
    .form-group
      label.col-form-label(for="contact-message") Message
      textarea#contact-message.form-control(v-model="contactFormData.message" name="message" required)
    //.g-recaptcha(data-sitekey="6LfAnkIUAAAAAJYFRNJnZCGuxXGXHP5OoBIl_TOx" data-callback="recaptchaCallback")
    div(slot="modal-footer")
      b-button.m-1(variant="secondary" @click="hideModal") Cancel
      b-button.m-1(variant="primary" @click="send") Send
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        contactFormData: {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      }
    },
    methods: {
      send() {
        this.hideModal()

        // Convert to application/x-www-form-urlencoded format
        var data = new URLSearchParams()
        data.append('name', this.contactFormData.name)
        data.append('email', this.contactFormData.email)
        data.append('subject', this.contactFormData.subject)
        data.append('message', this.contactFormData.message)

        axios
          .post('http://app.oobfest.com/api/email/contact', data)
          .then(function(response) {
            alert("Message sent!")
          })
          .catch(function(error) {
            alert("Error :(")
            console.log(error)
          })
      },
      showModal() {
        this.$refs.contactModal.show()
      },
      hideModal() {
        this.$refs.contactModal.hide()
      }
    }
  }
</script>