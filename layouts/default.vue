<template lang="pug">
  div
    script(async src="https://www.googletagmanager.com/gtag/js?id=UA-114369938-1")
    script.
      window.dataLayer = window.dataLayer || []
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date())
      gtag('config', 'UA-114369938-1')
    main
      .container-fluid.background-graphic
        navigation
        nuxt
      navigation-footer
</template>

<script>
  import Navigation from '@/components/Navigation'
  import NavigationFooter from '@/components/NavigationFooter'

  export default {
    components: { Navigation, NavigationFooter }
  }
</script>

<style scoped>
  .background-graphic {
    background: url('/assets/images/marcella-arguello-cropped-dark-min.jpeg') no-repeat bottom center fixed; 
    background-size: cover;
  }
</style>