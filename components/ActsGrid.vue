<template lang="pug">
div
  .row
    .col-md.text-center
      b-button.m-1(size="lg" type="button" @click="actTypeFilter='all'",:variant="actTypeFilter == 'all' ? 'primary' : 'secondary'") All Acts
      //b-button.m-1(size="lg" type="button" @click="featuredActFilter = !featuredActFilter",:variant="featuredActFilter ? 'warning' : 'secondary'") Featured  
      b-button.m-1(size="lg" type="button" @click="actTypeFilter='Improv'",:variant="actTypeFilter == 'Improv' ? 'primary' : 'secondary'") Improv  
      b-button.m-1(size="lg" type="button" @click="actTypeFilter='Sketch'",:variant="actTypeFilter == 'Sketch' ? 'primary' : 'secondary'") Sketch  
      b-button.m-1(size="lg" type="button" @click="actTypeFilter='Stand-Up'",:variant="actTypeFilter == 'Stand-Up' ? 'primary' : 'secondary'") Stand-Up
  .row
    .col
      transition-group.acts(name="act")
        act-tile.act-item(v-for="act in filteredActs",:key="act._id",:actName="act.actName",:imageUrl="act.imageUrl",:domain="act.domain")

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
  transition: transform 1s;
}

.act-item {
  transition: all 1s;
  display: inline-block;
}
.act-enter, .act-leave-to {
  opacity: 0;
}
.act-leave-active {
  position: absolute;
  z-index: 0;
}

</style>
