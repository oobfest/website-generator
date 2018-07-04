<template lang="pug">
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
    background: url('/assets/images/marcella-arguello-cropped-dark.jpeg') no-repeat bottom center fixed; 
    background-size: cover;
  }
</style>