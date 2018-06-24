<template lang="pug">
div
  .row.justify-content-center
    .col-md.text-center
      b-button.m-1(size="lg" type="button" @click="actTypeFilter='all'",:variant="actTypeFilter == 'all' ? 'primary' : 'secondary'") All Acts
    .col-md.text-center
      b-button.m-1(size="lg" type="button" @click="featuredActFilter = !featuredActFilter",:variant="featuredActFilter ? 'warning' : 'secondary'") Featured
    .col-md.text-center  
      b-button.m-1(size="lg" type="button" @click="actTypeFilter='Improv'",:variant="actTypeFilter == 'Improv' ? 'primary' : 'secondary'") Improv
    .col-md.text-center  
      b-button.m-1(size="lg" type="button" @click="actTypeFilter='Sketch'",:variant="actTypeFilter == 'Sketch' ? 'primary' : 'secondary'") Sketch
    .col-md.text-center  
      b-button.m-1(size="lg" type="button" @click="actTypeFilter='Stand-Up'",:variant="actTypeFilter == 'Stand-Up' ? 'primary' : 'secondary'") Stand-Up
  .row
    .col
      .acts
        act-tile(v-for="act in filteredActs",:key="act._id",:actName="act.actName",:imageUrl="act.imageUrl",:domain="act.domain")

</template>

<script>
  import ActTile from "@/components/ActTile"

  export default {
    components: {ActTile},
    props: ['acts'],
    data() {
      return {
        featuredActFilter: false,
        actTypeFilter: 'all'
      }
    },
    computed: {
      filteredActs() {
        if(this.actTypeFilter === 'all') return this.acts
        if(this.actTypeFilter === 'Sketch') return this.acts.filter(a=> a.showType == 'Sketch' || a.showType == 'Individual')
        else return this.acts.filter(a=> a.showType == this.actTypeFilter)
      }
    }
  }

</script>

<style>
.acts { 
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
