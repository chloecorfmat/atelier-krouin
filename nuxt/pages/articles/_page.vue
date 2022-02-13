<template>
  <main class="content page--list-articles">
    <div class="block block--last-articles">
      <h1 class="h2-like heading--with-tag">Tous les articles (page {{ page }})</h1>
      <p class="list--articles-infos">
        Affichage de {{ articlesNbDisplayed}}

        <span v-if="articlesNbDisplayed > 1">articles</span>
        <span v-else>article</span>

         sur {{ articlesNb}} (page {{ page }} sur {{ pagesNb }})
       </p>
      <BlockArticles v-if="articles != null" :articles="articles" />
      <Pagination :page="page" :pagesNb="pagesNb" v-if="pagesNb > 1" baseUrl="/articles/"/>
    </div>
  </main>
</template>
<script>
  import BlockArticles from "../../components/BlockArticles";
  import Pagination from "../../components/Pagination";

    export default {
        name: 'ArticleListPaginated',
        components: {
          BlockArticles,
          Pagination
        },
        data: function() {
          return {
              articles: null,
              page: null,
              pagesNb: null,
              articlesNbDisplayed: null,
              articlesNb: null
          }
        },
        async asyncData ({ params, $http }) {
            const perPage = process.env.ARTICLES_PER_PAGE;
            let page = parseInt(params.page);
            let start = page * perPage - perPage;

            let articles = await $http.$get(process.env.STRAPI_BACK_URL + '/articles?_limit=' + perPage + '&_start=' + start + '&_sort=published_at:DESC');
            let articlesNbDisplayed = Object.keys(articles).length;
            let articlesNb = await $http.$get(process.env.STRAPI_BACK_URL + '/articles/count');

            let pagesNb = Math.ceil(articlesNb/perPage);

            return { page, articles, articlesNbDisplayed, articlesNb, pagesNb }
        },
        head() {
          return {
            title: 'Liste des articles, page ' + this.page +' | Atelier Krouiñ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: 'La liste des articles du blog Atelier Krouiñ (classés par ordre antéchronologique - page ' + this.page + ').'
              }
            ]
          }
        }
    }
</script>
