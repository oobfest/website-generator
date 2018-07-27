const pkg = require('./package')

let axios = require('axios')
let limax = require('limax')

let isDev = process.env.npm_lifecycle_event == 'dev'

function getActs() {
  return axios.get('https://app.oobfest.com/api/submissions/get-valid-acts')
}

function getWorkshops() {
  return axios.get('https://app.oobfest.com/api/workshops/public/')
}

function getShows() {
  return axios.get('https://app.oobfest.com/api/shows/public/')
}


module.exports = {
  mode: 'universal',

  generate: {
    routes(callback) {
      axios
        .all([getActs(), getWorkshops(), getShows()])
        .then(axios.spread((actsResponse, workshopsResponse, showsResponse)=> {
          let acts = actsResponse.data
          let workshops = workshopsResponse.data
          let allShows = showsResponse.data
          let routes = []

          routes.push({ route: '/acts/', payload: acts })
          routes.push({ route: '/workshops/', payload: workshops })
          routes.push({ route: '/shows/', payload: allShows })
          
          for(let act of acts) {
            let showsTheActIsIn = []
            for(let show of allShows)
              for(let showAct of show.acts)
                if (showAct._id == act._id) showsTheActIsIn.push(show)
            act.shows = showsTheActIsIn
            routes.push({route: '/acts/' + act.domain, payload: act })
          }

          for (let show of allShows) {
            routes.push({route: `/shows/${show.day.toLowerCase()}/${limax(show.venue)}/${show.time}/`, payload: show })
          }

          for(let workshop of workshops) {
            routes.push({route: '/workshops/' + limax(workshop.name), payload: workshop})
          }
          
          callback(null, routes)
        }))
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Out of Bounds Comedy Festival | Labor Day Weekend | Austin, TX',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Out of Bounds Comedy Festival, Labor Day Weekend in Austin, TX" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Apparently there's a progress bar?
  loading: { color: '#FFFFFF' },

  // Global CSS file
  css: ['@/assets/scss/custom.scss'],

  // Plugins
  plugins: [],

  // Modules
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',

    // Added by me!
    'nuxt-fontawesome',
  ],

  // Font Awesome!
  fontawesome: {
    imports: [
      {set: '@fortawesome/free-brands-svg-icons', icons: ['faGithub', 'faInstagram', 'faFacebook', 'faFlickr', 'faTwitter']},
      {set: '@fortawesome/free-solid-svg-icons', icons: ['faEnvelope']}
    ]
  },

  // Router (added by me!)
  router: {
    middleware: ['redirect']
  },

  // Axios custom configuration
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // Build configuration
  build: {

    // Extend webpack config here
    extend(config, ctx) {}
  }
}
