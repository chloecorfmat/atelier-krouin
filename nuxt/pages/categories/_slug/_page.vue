<template>
  <main class="content page--list-articles">
    <div class="block block--last-articles">
      <h1 class="h2-like heading--with-tag">Tous les articles<span class="sr-only" aria-hidden="false"> de la catégorie {{ categorie.name }}</span> (page {{ page }}) </h1>
      <span class="tag tag--secondary tag--inline">{{ categorie.name }}</span>
      <p class="list--articles-infos">
        Affichage de {{ articlesNbDisplayed}}

        <span v-if="articlesNbDisplayed > 1">articles</span>
        <span v-else>article</span>

         sur {{ articlesNb}} (page {{ page }} sur {{ pagesNb }})
       </p>
      <BlockArticles v-if="articles != null" :articles="articles" />
      <Pagination :page="page" :pagesNb="pagesNb" v-if="pagesNb > 1" :baseUrl="baseUrl"/>
    </div>
  </main>
</template>
<script>
  import BlockArticles from "../../../components/BlockArticles";
  import Pagination from "../../../components/Pagination";

    export default {
        name: 'Categorie',
        components: {
          BlockArticles,
          Pagination
        },
        data: function() {
          return {
              categorie: null,
              articles: null,
              page: null,
              pagesNb: null,
              baseUrl: null,
              articlesNbDisplayed: null,
              articlesNb: null
          }
        },
        async asyncData ({ params, $http }) {
            let response = await $http.$get(process.env.STRAPI_BACK_URL + '/categories?slug_categorie=' + params.slug);
            let categorie = response[0];

            const perPage = process.env.ARTICLES_PER_PAGE;
            let page = parseInt(params.page);
            let start = page * perPage - perPage;

            let articles = await $http.$get(process.env.STRAPI_BACK_URL + '/articles?categories_contains=' + categorie.id + '&_limit=' + perPage + '&_start=' + start + '&_sort=published_at:DESC');
            let articlesNbDisplayed = Object.keys(articles).length;
            let articlesNb = await $http.$get(process.env.STRAPI_BACK_URL + '/articles/count?categories_contains=' + categorie.id);

            let pagesNb = Math.ceil(articlesNb/perPage);
            let baseUrl = '/categories/' + params.slug + '/';

            return { categorie, articles, page, pagesNb, baseUrl, articlesNbDisplayed, articlesNb }
        },
        head() {
          return {
            title: this.categorie.SEO.metatitle + ', page ' + this.page + ' | Atelier Krouiñ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: this.categorie.SEO.metadescription + ' (page ' + this.page + ')'
              }
            ]
          }
        }
    }
</script>
