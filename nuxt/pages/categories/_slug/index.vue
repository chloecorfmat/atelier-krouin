<template>
  <main class="content page--list-articles">
    <div class="block block--last-articles">
      <h1 class="h2-like heading--with-tag">Tous les articles<span class="sr-only" aria-hidden="false"> de la catégorie {{ categorie.name }}</span></h1>
      <span class="tag tag--secondary tag--inline">{{ categorie.name }}</span>
      <BlockArticles v-if="articles != null" :articles="articles" />
      <Pagination :page="page" :pagesNb="pagesNb" v-if="pagesNb > 1" :baseUrl="baseUrl"/>
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

            const perPage = process.env.ARTICLES_PER_PAGE;
            let articles = await $http.$get(process.env.STRAPI_BACK_URL + '/articles?categories_contains=' + categorie.id + '&_sort=published_at:DESC');
            let articlesNb = await $http.$get(process.env.STRAPI_BACK_URL + '/articles/count?categories_contains=' + categorie.id);

            let pagesNb = Math.ceil(articlesNb/perPage);
            let baseUrl = '/categories/' + params.slug + '/';

            return { categorie, articles, articlesNb, pagesNb, baseUrl }
        },
        head() {
          return {
            title: this.categorie.SEO.metatitle + ' | Atelier Krouiñ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: this.categorie.SEO.metadescription
              }
            ]
          }
        }
    }
</script>
