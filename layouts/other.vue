<template lang="pug">
  main
    .container-fluid
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

<style>
  main {
    background-color: #1A1A1A;
  }
</style>