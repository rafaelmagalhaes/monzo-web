const pkg = require('./package')
const opn = require('opn')
require('dotenv').config()

module.exports = {
  mode: 'spa',
  hooks: {
    listen(server, {host, port}) {
      opn(`http://${host}:${port}`)
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    script: [
      {src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js'},
      {src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'}

    ],
    link: [
      {
        rel: 'dns-prefetch shortcut icon',
        type: 'image/x-icon',
        href: 'https://monzo.com/static/images/favicon.png'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#FFFFFF'},

  /*
  ** Global CSS
  */
  css: [
    '~/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/plugins',
    '~/plugins/filters',
    '~/plugins/axios'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv',
  ],
  modulesDir: ['node_modules'],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:'https://api.monzo.com/' //global api url
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */

    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }

    }
  }
}
