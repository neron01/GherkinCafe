const path = require('path');
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
    // modules: [
    //     'nuxt-babel',
    // ],
  build: {
    // analyze: {
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: '9999',
    //   openAnalyzer: false
    // },
    //   vendor: [
    //       'babel-polyfill'
    //   ],
    extractCSS: true,
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
        config.module.rules.push({
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [
                    ["@babel/env",
                        {
                            "targets": { "ie": 11 },
                            "useBuiltIns": "entry",
                            "spec":  true
                        }
                    ]
                ],
                plugins: [
                    '@babel/plugin-proposal-object-rest-spread',
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-transform-arrow-functions',
                    '@babel/plugin-transform-runtime',
                    'transform-es2015-arrow-functions',
                ]
            }
        });
    },
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
  plugins: ['~/plugins/vuetify.js' ]
};
