<template>
  <!-- LAST ARTICLES BLOCK -->
  <div>
    <ol class="list--articles">
      <ArticleLarge v-if="largeArticle != null" :article="largeArticle" />
      <Article v-if="shortArticles != null" :article="article" v-for="article in articles" :key="article.id"/>
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
        data: function () {
          return {
            largeArticle: null,
            shortArticles: null
          };
        },
        mounted() {
          this.largeArticle = this.articles.shift();
          this.shortArticles = this.articles;

        }
    }
</script>
