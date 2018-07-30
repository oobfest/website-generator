<template lang="pug">
div
  p.mb-0 Please contact our Education Director, Asaf Ronen, via 
    a(href="#" @click="showModal" style="text-decoration: underline") this form
    | .
  b-modal(title="Contact Asaf" ref="contactAsafModal")
    .form-group
      label.col-form-label(for="contact-name") Full Name
      input#contact-name.form-control(v-model="asafContactFormData.name" type="text" name="name" required)
    .form-group
      label.col-form-label(for="contact-email") Email
      input#contact-email.form-control(v-model="asafContactFormData.email" type="email" name="email" required)
    .form-group
      label.col-form-label(for="contact-subject") Subject
      input#contact-subject.form-control(v-model="asafContactFormData.subject" type="text" name="subject")
    .form-group
      label.col-form-label(for="contact-message") Message
      textarea#contact-message.form-control(v-model="asafContactFormData.message" name="message" required)
    div(slot="modal-footer")
      b-button.m-1(variant="secondary" @click="hideModal") Cancel
      b-button.m-1(variant="primary" @click="send") Send
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        asafContactFormData: {
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
        data.append('name', this.asafContactFormData.name)
        data.append('email', this.asafContactFormData.email)
        data.append('subject', "WORKSHOPS | " + this.asafContactFormData.subject)
        data.append('message', this.asafContactFormData.message)

        let self = this
        axios
          .post('https://app.oobfest.com/api/email/contact', data)
          .then(function(response) {
            alert("Message sent!")
            self.asafContactFormData.name = ''
            self.asafContactFormData.email = ''
            self.asafContactFormData.subject = ''
            self.asafContactFormData.message = ''
          })
          .catch(function(error) {
            alert("Error :(")
            console.log(error)
          })
      },
      showModal() {
        this.$refs.contactAsafModal.show()
      },
      hideModal() {
        this.$refs.contactAsafModal.hide()
      }
    }
  }
</script>

<style scoped>
  .btn-link {
    font-size: 21px;
  }
</style>
