<template lang="pug">
.row
  .col.text-center
    h1.display-3.mb-4 {{text}}
</template>

<script>
  export default {
    props: ['text']
  }
</script>

<style>
  .display-3 {
    word-break: break-all;
  }
</style>