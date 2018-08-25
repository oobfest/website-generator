<template lang="pug">
.container-fluid
  headline(:text="'Venues'")
  .row(v-for="venue in venues")
    .col
      .media
        img.mr-3(:src="'/venues/' + venue.image" style="max-width: 350px;")
        .media-body
          h2 {{venue.name}}
          h3 {{venue.address}}
          ul
            li
              a(:href="venue.website") website

</template>

<style scoped>
  .media {
    border: 2px solid white;
    margin: 2rem;
    margin-top: 0;
    padding: 2rem;
    background-color: rgba(0,0,0,0.75);
  }
</style>

<script>
  import Headline from '@/components/Headline'
  export default {
    components: {Headline},
    data(){
      return {
        venues: [
          { 
            name: "ColdTowne Theater",
            address: "4803 Airport Blvd, Austin, TX 78751",
            website: "http://www.coldtownetheater.com/",
            image: 'coldtowne.jpg',
          },
          { 
            name: "Hideout Theatre",
            address: "617 Congress Ave, Austin, TX 78701",
            website: "http://hideouttheater.com/",
            image: 'hideout.jpg',
          },
          { 
            name: "Fallout Theater",
            address: "616 Lavaca St, Austin, TX 78701",
            website: "https://www.falloutcomedy.com/",
            image: 'fallout.jpg',
          },
          { 
            name: "Velveeta Room",
            address: "521 E 6th St, Austin, TX 78701",
            website: "http://www.thevelveetaroom.com/",
            image: 'velveeta-room.jpg',
          },
          { 
            name: "Spider House Ballroom",
            address: "2908 Fruth St, Austin, TX 78705",
            website: "https://spiderhouse.com/ballroom/",
            image: 'spider-house.jpg',
          },
          { 
            name: "The Institution Theater",
            address: "3708 Woodbury Dr, Austin, TX 78704",
            website: "http://www.theinstitutiontheater.com/",
            image: 'institution.jpg',
          },
        ]
      }
    }
  }
</script>
