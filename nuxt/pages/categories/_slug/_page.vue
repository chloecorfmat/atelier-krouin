<template>
  <main class="content page--list-articles">
    <div class="block block--last-articles">
      <h1 class="h2-like heading--with-tag">Tous les articles<span class="sr-only" aria-hidden="false"> de la catégorie {{ category.name }}</span> (page {{ page }}) </h1>
      <span class="tag tag--secondary tag--inline">{{ category.name }}</span>
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
              category: null,
              articles: null,
              page: null,
              pagesNb: null,
              baseUrl: null,
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
              filters: {
                category: {
                  slug: {
                    $eq: params.slug
                  }
                }
              },
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
            let baseUrl = '/categories/' + params.slug + '/';
            let category = articles[0].attributes.category.data.attributes;

            return { category, articles, page, pagesNb, baseUrl, articlesNbDisplayed, articlesNb }
        },
        head() {
          return {
            title: 'Tous les articles de la catégorie ' + this.category.name + ', page ' + this.page + ' | Atelier Krouiñ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: this.categorie.seo.metaDescription + ' (page ' + this.page + ')'
              }
            ]
          }
        }
    }
</script>
