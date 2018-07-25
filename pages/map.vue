<template lang='pug'>
div
  headline(:text="'Map'")
  p.text-center
    a(href="https://www.google.com/maps/d/viewer?mid=19WBsyurVMyQ-G9bH8E4RJGW_F54Q7ShR&usp=sharing" target="_blank") Open in a separate window
  iframe.map(src="https://www.google.com/maps/d/u/0/embed?mid=19WBsyurVMyQ-G9bH8E4RJGW_F54Q7ShR" width="640" height="480")
  p.pb-5
</template>

<script>
  import Headline from '@/components/Headline'
  export default {
    components: {Headline}
  }
</script>

<style>
  .map {
    display: block;
    margin: 0 auto;
  }
</style>