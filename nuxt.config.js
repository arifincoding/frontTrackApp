export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'trackApp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src:'~/plugins/repositories.js'},
    {src:'~/plugins/axios.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs:[
      '~/components/',
      '~/components/button',
      '~/components/dropdown',
      '~/components/heading',
      '~/components/input',
      '~/components/kategori',
      '~/components/modal',
      '~/components/navigation',
      '~/components/pegawai',
      '~/components/perbaikan',
      '~/components/table',
      '~/components/akun',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:'http://localhost:8000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
