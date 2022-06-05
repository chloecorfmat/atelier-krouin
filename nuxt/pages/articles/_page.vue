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
  import qs from "qs";

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

            let query = qs.stringify({
              populate: [
                'image_header.media',
                'category'
              ],
              sort: ['publishedAt:desc'],
              pagination: {
                page: page,
                pageSize: perPage,
                withCount: true
              }
            }, {
              encodeValuesOnly: true,
            });

            let data = await $http.$get(process.env.STRAPI_BACK_URL + '/api/articles?' + query);
            let articles = data.data;
            let articlesNbDisplayed = data.meta.pagination.pageSize;
            let articlesNb = data.meta.pagination.total;
            let pagesNb = data.meta.pagination.pageCount;

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
