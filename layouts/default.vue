<template lang="pug">
div
  b-navbar(toggleable="md" type="dark" variant="dark")
    b-navbar-toggle(target="nav_collapse")
    b-navbar-brand(href="#") OoB
    b-collapse(is-nav id="nav_collapse")
      b-navbar-nav
        b-nav-item(href="/") Home
        b-nav-item(href="/about") About
  //nav.navbar.navbar-expand-lg.navbar-dark.bg-primary
    a.navbar-brand(href="#") OoB
    button.navbar-toggler(type="button" data-toggle="collapse" data-target="#navigation")
      span.navbar-toggler-icon
    #navigation.collapse.navbar-collapse
      ul.navbar-nav.mr-auto
        li.nav-item
          a.nav-link(href="/") Home
        li.nav-item
          a.nav-link(href="/about/") About
  
  main.container-fluid
    nuxt
</template>