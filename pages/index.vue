<template lang="pug">
  div
    .row.full-height
      .col.text-center
        h1
          img.mx-auto.d-block(src="~/assets/images/logo.png" style="max-width:100%" alt="Out of Bounds Comedy Festival")
        h3 Labor Day Weekend, August 28th to September 3rd in Austin, Texas
        h2 
          a(href="/lineup") Lineup announced!
        h5
          a(href="/lineup") View Lineup
        p.mt-4
          a(href="#learn-more") Learn More about OoB
    .row.justify-content-center.dark-background.mt-3.pb-4(id="learn-more")
      .col-md-6.text-center.m-3
        h4 What is Out of Bounds?
        p The  
          strong Out of Bounds Comedy Festival (OoB)  
          | is a live performance festival that showcases the best in improv, sketch and standup. OoB is Austin's longest-running comedy festival and 
          em the largest multi-disciplinary comedy festival in the south
          | .
    .row.text-center.dark-background.pb-4.justify-content-center
      .col-md-2
        img.icon(src="~/assets/images/icon-sketch.png")
        h4.color-blue 500+ Performers
      .col-md-2
        img.icon(src="~/assets/images/icon-standup.png")
        h4.color-red 130 Acts
      .col-md-2
        img.icon(src="~/assets/images/icon-improv.png")
        h4.color-orange 7 Days
      .col-md-2
        img.icon(src="~/assets/images/icon-variety.png")
        h4.color-green 6 Stages

    .row.text-center.dark-background.pb-4.justify-content-center
      .col-md-6
        h4 Out of Bounds is a Certified 501(c)(3) Nonprofit
        p Our mission is to bring world-wide attention to the Austin comedy community by featuring improv, sketch, podcasts, musical, variety and stand-up, strengthening performer networks, providing educational opportunities to our talent and stimulating both Austin tourism and industry interest.
        img(src="~/assets/images/cultural-arts-logo.png" style="max-width: 500px")
</template>

<style>
  h1 { 
    padding-top: 80px; 
  }

  h2 a { color: #f9a01b; }
  h2 a:hover { color: #f9a01b; }

  h3 {
    color: white;
    margin-top: 16px;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: -1px;
  }

  h4 {
    color: #f9a01b;
    font-family: 'gotham-black', sans-serif;
    padding-top: 1em;
  }
</style>