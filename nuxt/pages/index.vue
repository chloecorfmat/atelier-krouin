<template>
<div>
  <h1 class="visually-hidden">Page d'accueil</h1>

	<main class="content page--homepage">
    <BlockNews v-if="news != null" :news="news"/>

    <div class="block block--last-articles">
      <h2>Derniers articles</h2>
      <BlockArticles v-if="articles != null" :articles="lastArticles" />
      <div class="btn--container">
        <NuxtLink class="btn--secondary tag tag--primary" to="/articles">Voir plus d'articles</NuxtLink>
      </div>
    </div>

    <BlockIntroducing />
    <BlockInstagram :posts='homepage.data.attributes.instagram' />
  </main>
</div>
</template>

<script>
import BlockArticles from "../components/BlockArticles";
import BlockNews from "../components/BlockNews";
import BlockIntroducing from "../components/BlockIntroducing";
import BlockInstagram from "../components/BlockInstagram";
import qs from "qs";

export default {
  components: {
    BlockArticles,
    BlockNews,
    BlockIntroducing,
    BlockInstagram
  },
  data: function() {
    return {
      articles: null,
      homepage: null
    }
  },
  async asyncData ({ params, $http }) {
      let query = qs.stringify({
        populate: [
          'image_header.media',
          'category'
        ],
        sort: ['publishedAt:desc'],
        pagination: {
          start:0,
          limit: 6,
        }
      }, {
        encodeValuesOnly: true,
      });

      let articles = await $http.$get(process.env.STRAPI_BACK_URL + '/api/articles?' + query);
      query = qs.stringify({
        populate: {
          instagram: {
            populate: '*'
          }
        },
      }, {
        encodeValuesOnly: true,
      });
      let homepage = await $http.$get(process.env.STRAPI_BACK_URL + '/api/homepage?' + query);
      return { articles, homepage }
  },
  computed: {
    news: function(){
      return this.articles.data[0];
    },
    lastArticles: function(){
      return this.articles.data.slice(1);
    }
  }

}
</script>
