import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PrismicVue from "@prismicio/vue";
import linkResolver from './link-resolver'

Vue.config.productionTip = false

Vue.use(PrismicVue, {
  endpoint: "https://krouin.cdn.prismic.io/api/v2",
  linkResolver
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
