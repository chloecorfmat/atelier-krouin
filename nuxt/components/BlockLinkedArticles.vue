<template>
  <div v-if="articles.length != 0" class="block block--last-articles block--related-articles">
      <h2>Articles en lien</h2>
      <ol class="list--articles list--articles--in-page">
         <Article v-if="articles != null" :article="article" v-for="article in articles" :key="article.id"/>
      </ol>
  </div>
</template>

<script>
    import Article from './Article';

    export default {
        name: 'BlockLinkedArticles',
        components: {
            Article
        },
        props: {
          articles: null
        }
    }
</script>
