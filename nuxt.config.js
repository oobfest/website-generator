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
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
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
