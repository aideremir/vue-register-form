module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vrachu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/normalize.css',
    '~/assets/fonts/fonts.css',
    '~/assets/css/global.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/maskedInput.js', ssr: false },
    '~/plugins/vuelidate.js',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'svg-to-vue-component/nuxt',
    'portal-vue/nuxt'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
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

