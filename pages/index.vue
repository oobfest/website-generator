<template lang="pug">
  div
    .row
      .col.text-center
        h1
          img.mx-auto.d-block(src="~/assets/images/logo.png" style="max-width:100%" alt="Out of Bounds Comedy Festival")
        h3.m-4 Labor Day Weekend, August 28th to September 3rd in Austin, Texas
        h5.m-4
          a(href="/schedule") View the Schedule 
            font-awesome-icon(:icon="['fas', 'arrow-circle-right']")
    .row.light-background
      .col.text-center
        h2.m-3 Featured Act
        .row.pb-4
          .col.text-right
            img(src="ian.jpg" style='max-width: 75%; box-shadow:3px 3px 3px rgba(0, 0, 0, .25);')
          .col.text-left
            h4 Ian Abramson &mdash; Stand Up
            p
              span.font-italic Saturday, 9:00pm at Spider House Ballroom 
            p A regular contributer to 
              span.font-italic The Onion 
              | and creator of Comedy Central's 
              span.font-italic 7 Minutes in Purgatory
              |, Ian Abramson's stand up is a mix of precise wordplay, longer emotionally absurd jokes, and larger conceptual pieces.
            .text-center
              a.btn.btn-primary(href="https://oobfest.com/shows/saturday/spider-house/900") See Show Details 
                font-awesome-icon(:icon="['fas', 'arrow-circle-right']")

    .row.justify-content-center.dark-background.pb-4(id="learn-more")
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
        .d-md-none
          p
            a(href="https://www.google.com/maps/d/viewer?mid=19WBsyurVMyQ-G9bH8E4RJGW_F54Q7ShR&usp=sharing" target="_blank") Click here for a handy map of all six venues
        .d-none.d-md-block
          p
            a(href="https://www.google.com/maps/d/viewer?mid=19WBsyurVMyQ-G9bH8E4RJGW_F54Q7ShR&usp=sharing" target="_blank") Here's a handy map of all six venues
          iframe.mb-4(src="https://www.google.com/maps/d/u/0/embed?mid=19WBsyurVMyQ-G9bH8E4RJGW_F54Q7ShR" width="640" height="480")

    .row.text-center.dark-background.pb-4.justify-content-center
      .col-md-6
        h4 Out of Bounds is a Certified 501(c)(3) Nonprofit
        p Our mission is to bring world-wide attention to the Austin comedy community by featuring improv, sketch, podcasts, musical, variety and stand-up, strengthening performer networks, providing educational opportunities to our talent and stimulating both Austin tourism and industry interest.
        img.img-fluid(src="~/assets/images/sponsors/cultural-arts-logo.png" style="width:100%; max-width: 500px")
        h5.m-4
          a(href="/schedule") View the Schedule 
            font-awesome-icon(:icon="['fas', 'arrow-circle-right']")
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