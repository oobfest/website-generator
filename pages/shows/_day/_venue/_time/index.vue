<template lang='pug'>
div
  show-modal(:show="show")
  h2 {{show.day}} at {{show.venue}}, {{formatTime(show.time)}}
  ul
    li(v-for="act in show.acts") {{act.name}}
      small &mdash; {{act.type}}
  button.btn.btn-primary(v-b-modal.show-modal) Get Tickets
</template>

<script>
  import ShowModal from '@/components/ShowModal'
  export default {
    components: {ShowModal},
    async asyncData ({ params, error, payload }) {
      if(payload) return {show: payload}
      else return {show: {acts: []}}
    },
    methods: {
      formatTime(time) {
        time = String(time)
        return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
      }
    }
  }

</script>