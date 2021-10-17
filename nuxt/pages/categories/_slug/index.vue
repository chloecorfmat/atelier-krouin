<template>
  <main class="content page--list-articles">
    <div class="block block--last-articles">
      <h1 class="h2-like heading--with-tag">Tous les articles<span class="sr-only" aria-hidden="false"> de la catégorie {{ categorie.name }}</span></h1>
      <span class="tag tag--primary tag--inline">{{ categorie.name }}</span>
      <BlockArticles v-if="articles != null" :articles="articles" />
    </div>
  </main>
</template>
<script>
  import BlockArticles from "../../../components/BlockArticles";

    export default {
        name: 'Categorie',
        components: {
          BlockArticles
        },
        data: function() {
          return {
              categorie: null,
              articles: null
          }
        },
        async asyncData ({ params, $http }) {
            let response = await $http.$get(process.env.STRAPI_BACK_URL + '/categories?slug_categorie=' + params.slug);
            let categorie = response[0];

            let articles = await $http.$get(process.env.STRAPI_BACK_URL + '/articles?categories_contains=' + categorie.id);

            return { categorie, articles }
        }
    }
</script>
