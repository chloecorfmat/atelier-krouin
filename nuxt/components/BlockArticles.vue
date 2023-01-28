<template>
  <!-- LAST ARTICLES BLOCK -->
  <div>
    <ol class="list--articles">
      <ArticleLarge v-if="largeArticle != null" :article="largeArticle" />
      <Article v-if="shortArticles != null" :article="article" v-for="article in shortArticles" :key="article.id"/>
    </ol>
  </div>
</template>

<script>
    import ArticleLarge from './ArticleLarge';
    import Article from './Article';

    export default {
        name: 'BlockArticles',
        components: {
            ArticleLarge,
            Article
        },
        props: {
          articles: null
        },
        computed: {
          largeArticle: function () {
            return this.articles[0];
          },
          shortArticles: function () {
            return this.articles.slice(1);
          }
        }
    }
</script>
