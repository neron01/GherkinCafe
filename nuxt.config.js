module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
    '~/assets/css/app.styl'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: [
      'axios',
      'vuetify',
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      config.module.rules.push({
        test: /\.postcss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader'
          }
        ]
      });
    },
    // postcss: {
    //   preset: {
    //     // https://cssdb.org/#staging-process
    //     stage: 2
    //   }
    // }
    //   parser: [require('postcss')],
    //   postcss: [
    //       require('postcss-nested')(),
    //       require('postcss-responsive-type')(),
    //       require('postcss-hexrgba')(),
    //   ],
    //   extractCSS: true,
      // postcss: {
      //     plugins: {
      //         'postcss-preset-env': {
      //             features: {
      //                 customProperties: false
      //             }
      //         },
      //
      //         // Add some plugins
      //         'postcss-nested': {},
      //         'postcss-mixins': {},
      //         'postcss-responsive-type': {},
      //         'postcss-hexrgba': {}
      //     }
      // },
  },
  router: {
    middleware: [
      'fwdcookies',
      'check-auth'
    ]
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ],
  /*
 ** Load Vuetify into the app
 */
  plugins: ['~/plugins/vuetify.js', { src: '~plugins/vue-apexcharts.js', ssr: false }]
};
