import _ from 'lodash'
import pkg from './package.json'
import configs from './config'
import router from './client/app/settings/app-routers'
import plugins from './client/plugins'
import css from './client/app/settings/app-style'
import theme from './client/app/settings/app-theme'

const { clientConfigs } = configs

export default {
  publicRuntimeConfig: clientConfigs,
  telemetry: false,
  /*
  ** Headers of the page
  */
  head: {
    title: _.startCase(pkg.name),
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#cea643' },

  /*
  ** Global CSS
  */
  css,
  srcDir: 'client/',
  buildDir: 'build/.nuxt',
  /*
  ** Router config
  */
  router,
  /*
  ** Plugins to load before mounting the App
  */
  plugins,
  /*
  ** Nuxt.js modules
  */
  modules: [],
  /*
  ** Axios module configuration
  */
  axios: {
    // proxyHeaders: false
    // See https://github.com/nuxt-community/axios-module#options
  },
  // buildModules: ['@nuxt/typescript-build'],
  /*
  ** Build configuration
  */
  build: {
    babel: { compact: true },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (!ctx.isDev) {
        config.module.rules.push({
          test: /\.less$/,
          loader: 'less-loader',
          options: {
            modifyVars: theme,
            javascriptEnabled: true
          },
          exclude: /(node_modules)/
        })
      }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
