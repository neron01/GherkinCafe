import https from "https";

module.exports = {
  srcDir: 'src',
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
    ],
    script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.0.0/polyfill.min.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
    '~/assets/css/app.styl'
  ],
  modules: [
    "nuxt-typescript",
    '@nuxtjs/axios'
  ],
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    },
    // typescript: {
    //     formatter: "default"
    // },
  build: {
    // analyze: {
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: '9999',
    //   openAnalyzer: false
    // },
    extractCSS: true,
    extend (config) {
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
  },
  router: {
    middleware: [
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
  plugins: ['~/plugins/vuetify.js', { src: '~plugins/vue-apexcharts.js', ssr: false }, '~/plugins/axios' ]
};
