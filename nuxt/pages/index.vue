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
    <BlockInstagram :posts='homepage.instagram_posts' />
  </main>
</div>
</template>

<script>
import BlockArticles from "../components/BlockArticles";
import BlockNews from "../components/BlockNews";
import BlockIntroducing from "../components/BlockIntroducing";
import BlockInstagram from "../components/BlockInstagram";

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
      let articles = await $http.$get(process.env.STRAPI_BACK_URL + '/articles?_limit=6&_sort=published_at:DESC')
      let homepage = await $http.$get(process.env.STRAPI_BACK_URL + '/homepage')
      return { articles, homepage }
  },
  computed: {
    news: function(){
      return this.articles[0];
    },
    lastArticles: function(){
      let a = [...this.articles];
      a.shift();
      return a;
    }
  }

}
</script>
