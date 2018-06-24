<template lang="pug">
  a(:href="'/act/' + domain")
    .act(:style="thumbnailUrl")
      .banner
        span.name(:style="fontSize") {{actName}}      

</template>

<script>

  export default {
    props: ['actName', 'imageUrl', 'domain'],
    computed: {
      thumbnailUrl() {
        return "background-image: url(" + this.imageUrl.substr(0, this.imageUrl.length-4) + 'l.jpeg)'
      },
      fontSize() {
        let length = this.actName.length
        if(length > 30) return 'font-size: 20px'
        if(length > 20) return 'font-size: 24px'
        if(length > 12) return 'font-size: 30px'
        else return 'font-size: 36px'
      }
    }
  }

</script>

<style>

a:hover {
  z-index: 1;
}

.act {
  display: flex;
  flex: 1 1 370px;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;

  width: 370px;
  height: 370px;

  /*
  background-size: 110%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  */
  transition: all 0.2s ease-in-out;
  transform: scale(1,1);
}

.act:hover {
  transform: scale(1.1,1.1);
}

.banner {
  text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
  background-color: rgba(21, 128, 140, 0.75);
  font-size: 36px;
  color: white;
  font-variant: small-caps;
  font-weight: bold;
  align-self: flex-end;
  width: 100%;
  height: 74px;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  text-align: center;
}
</style>
