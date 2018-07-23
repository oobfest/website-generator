<template lang="pug">
  footer.container-fluid
    .navbar.navbar-expand-md.justify-content-between.navbar-dark
      #footer-menu
        ul.navbar-nav.form-inline
          li.nav-item
            span &nbsp; 
            font-awesome-icon(:icon="['fab', 'facebook']")
            a.m-2(href="https://www.facebook.com/oobfest")
              span.footer-link-text Facebook
            span.d-none.d-md-inline | 
          li.nav-item 
            span &nbsp; 
            font-awesome-icon(:icon="['fab', 'twitter']")
            a.m-2(href="https://www.twitter.com/oobfest")
              span.footer-link-text Twitter
            span.d-none.d-md-inline | 
          li.nav-item
            span &nbsp; 
            font-awesome-icon(:icon="['fab', 'instagram']")
            a.m-2(href="https://www.instagram.com/oobfest")
              span.footer-link-text Instagram
            span.d-none.d-md-inline | 
          li.nav-item
            span &nbsp; 
            font-awesome-icon(:icon="['fab', 'flickr']")
            a.m-2(href="https://www.flickr.com/photos/oob_pics")              
              span.footer-link-text Flickr
            span.d-none.d-md-inline | 
          li.nav-item
            span &nbsp; 
            font-awesome-icon(:icon="['fab', 'github']")
            a.m-2(href="https://github.com/oobfest")
              span.footer-link-text GitHub
</template>

<style scoped>
  footer { background-color: #0a0a0a; }
  .navbar { padding: 1.5em; }
</style>