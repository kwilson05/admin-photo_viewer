export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'admin-photo_viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
      '~/assets/css/reset.css',
      '~/assets/css/toast.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/axios-port.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:8081', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:8081'
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  auth: {
      localStorage: false,
    strategies: {
       local:{
          token:{
         property: 'token',
         type: false
       },
        endpoints: {
          login: { url: '/login', method: 'post', },
          register: { url: '/register', method: 'post', },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get', property: 'user' }
        },

      }
    }

  },
  router: {
  middleware: ['auth']
}
}
