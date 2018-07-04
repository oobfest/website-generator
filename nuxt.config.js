const pkg = require('./package')

const axios = require('axios')

module.exports = {
  mode: 'universal',

  generate: {
    routes() {
      return axios.get('http://app.oobfest.com/api/submissions/get-valid-acts')
      .then((response) => {
        return response.data.map((act) => {
          return {
            route: '/act/' + act.domain,
            payload: act
          }
        })
      })
    }
  },

  /* FANCY GENERATE!
  generate: {
    routes() {
      return axios.all([
        axios.get('http://app.oobfest.com/api/submissions/get-valid-acts'),
        axios.get('http://app.oobfest.com/api/shows/')
      ])
      .then(axios.spread((acts, shows)=> {

      }))
    }
  }*/

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

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/custom.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      { src: '@/plugins/google-analytics'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',

    // Added by me!
    'nuxt-fontawesome',
  ],
  fontawesome: {
    imports: [
      {set: '@fortawesome/free-brands-svg-icons', icons: ['faGithub', 'faInstagram', 'faFacebook', 'faFlickr', 'faTwitter']},
      {set: '@fortawesome/free-solid-svg-icons', icons: ['faEnvelope']}
    ]
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
