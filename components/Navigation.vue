<template lang="pug">
  .navbar.navbar-expand-md.justify-content-between.navbar-dark
    #main-navigation
      ul.navbar-nav.form-inline
        li.nav-item
          a.m-2(href="/")
            span.footer-link-text Home
        li.nav-item
          a.m-2(href="/lineup")
            span.footer-link-text Lineup

    span.navbar-text.pull-right
      a.nav-link.underline-on-hover(href="#" data-toggle="modal" data-target="#contact-modal")
        span.fa.fa-envelope.fa-lg
        contact-modal.footer-link-text

</template>

<script>
  import ContactModal from '@/components/ContactModal'

  export default {
    components: {ContactModal}
  }
</script>