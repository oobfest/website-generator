<template lang="pug">
  div
    .row.full-height
      .col.text-center
        h1
          img.mx-auto.d-block(src="~/assets/images/logo.png" style="max-width:100%" alt="Out of Bounds Comedy Festival")
        h3 Labor Day Weekend, August 28th to September 3rd in Austin, Texas
        h2 
          a(href="/schedule") Schedule is Live!
        h5
          a(href="/schedule") View Schedule
        h5
          a(href="/acts") View Lineup
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
        h4.color-green 6 Venues
    .row.text-center.light-background.justify-content-center
      .col
        h4 Where is Out of Bounds?
        p 
          a(href="https://www.google.com/maps/d/viewer?mid=19WBsyurVMyQ-G9bH8E4RJGW_F54Q7ShR&usp=sharing" target="_blank") Here's a handy map of all six of this year's venues
        iframe.mb-4(src="https://www.google.com/maps/d/u/0/embed?mid=19WBsyurVMyQ-G9bH8E4RJGW_F54Q7ShR" width="640" height="480")

    .row.text-center.dark-background.pb-4.justify-content-center
      .col-md-6
        h4 Out of Bounds is a Certified 501(c)(3) Nonprofit
        p Our mission is to bring world-wide attention to the Austin comedy community by featuring improv, sketch, podcasts, musical, variety and stand-up, strengthening performer networks, providing educational opportunities to our talent and stimulating both Austin tourism and industry interest.
        img.img-fluid(src="~/assets/images/sponsors/cultural-arts-logo.png" style="width:100%; max-width: 500px")
    //.row.text-center.light-background.pb-4.justify-content-center
      .col
        h2.mt-4 Sponsors
        div
          small Interested in becoming a sponsor?  
            a(href="#" data-toggle="modal" data-target="#contact-modal") contact us
            | !
        a(href="http://www.permanentrcrd.com/")
          img.img-fluid(src="~/assets/images/sponsors/permanent-rcrd.png" style="width:100%; max-width: 100px")
        a(href="https://www.austintexas.gov/department/cultural-arts")
          img.img-fluid(src="~/assets/images/sponsors/cultural-arts-logo.png" style="width:100%; max-width: 500px")
          

        
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

  .dark-background { background-color: #212529; }
  .light-background { background-color: #2c3034; }
</style>