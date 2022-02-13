<template>
  <main class="content page--list-articles">
    <div class="block block--last-articles">
      <h1 class="h2-like heading--with-tag">Tous les articles (page 1)</h1>
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
        name: 'ArticleList',
        components: {
          BlockArticles,
          Pagination
        },
        data: function() {
          return {
              articles: null,
              page: 1,
              pagesNb: null,
              articlesNbDisplayed: null,
              articlesNb: null
          }
        },
        async asyncData ({ params, $http }) {
          const perPage = process.env.ARTICLES_PER_PAGE;
          const page = 1;
          let start = page * perPage - (perPage-1);

          let articles = await $http.$get(process.env.STRAPI_BACK_URL + '/articles?_limit=' + perPage + '&_sort=published_at:DESC');
          let articlesNbDisplayed = Object.keys(articles).length;
          let articlesNb = await $http.$get(process.env.STRAPI_BACK_URL + '/articles/count');

          let pagesNb = Math.ceil(articlesNb/perPage);

          return { articles, articlesNbDisplayed, articlesNb, pagesNb }
        },
        head() {
          return {
            title: 'Liste des articles | Atelier Krouiñ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: 'La liste des articles du blog Atelier Krouiñ (classés par ordre antéchronologique).'
              }
            ]
          }
        }
    }
</script>
