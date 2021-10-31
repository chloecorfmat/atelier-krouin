import axios from 'axios';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    STRAPI_BACK_URL: 'http://192.168.1.14:1337',
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
      { hid: 'description', name: 'description', content: 'L\'espace créatif de Chloé : un peu de peinture, beaucoup de couture, énormément de DIY, toujours plus de passion et de partage.' },
      { name: 'format-detection', content: 'telephone=no' },
      // Favicon
      { name: 'msapplication-TileColor', content: '#ffffff'},
      { name: 'theme-color', content: '#ffffff'}
    ],
    link: [
      // Favicon
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'icon', type:"image/png", sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type:"image/png", sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicon/site.webmanifest' },
      { rel: 'mask-icon', href: '/favicon//safari-pinned-tab.svg', color:'#db8783' },

      { rel: 'stylesheet', href: '/css/styles.css' },
    ],
    script: [
      //{ hid: 'analytics', src: 'https://analytics.chloecorfmat.me/js/plausible.js', "data-domain": "atelierkrouin.fr", async: true, defer: true}
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
    '@nuxtjs/axios',
    '@nuxt/http',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  sitemap: {
    hostname: 'https://blog.atelierkrouin.fr'
  },
  robots: {
    UserAgent: '*',
    Disallow: '',
    Sitemap: (req) => `https://blog.atelierkrouin.fr/sitemap.xml`
  },
  generate: {
    crawler: false,
    async routes() {
      let routes = [];
      let articles = await axios.get('http://192.168.1.14:1337' + '/articles');

      articles.data.forEach(element => {
        routes.push('/article/'+element.slug);
      });

      let categories = await axios.get('http://192.168.1.14:1337' + '/categories');

      categories.data.forEach(element => {
        routes.push('/categories/'+element.slug_categorie);
      });

      let perPage = 8;
      let nbArticles = await axios.get('http://192.168.1.14:1337' + '/articles/count');
      let nbPages = Math.ceil(parseInt(nbArticles.data)/perPage);

      for (let i = 1; i <= nbPages; i++) {
        routes.push('/articles/' + i);
      }

      return routes;
    }
  }
}
