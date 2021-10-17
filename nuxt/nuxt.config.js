import axios from 'axios';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    STRAPI_BACK_URL: 'http://192.168.1.22:1337',
    ARTICLES_PER_PAGE: 8
  },

  server: {
   port: 3001,
   host: '0.0.0.0'
 },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Atelier Krouiñ',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/styles.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/http'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  generate: {
    async routes() {
      let routes = [];
      let articles = await axios.get('http://192.168.1.22:1337' + '/articles');

      articles.data.forEach(element => {
        routes.push('/article/'+element.slug);
      });

      let categories = await axios.get('http://192.168.1.22:1337' + '/categories');

      categories.data.forEach(element => {
        routes.push('/categories/'+element.slug_categorie);
      });

      return routes;
    }
  }
}
