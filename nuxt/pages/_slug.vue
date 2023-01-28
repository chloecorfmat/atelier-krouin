<template>
    <main class="content page--page">
        <div class="block">
            <h1>{{ page.attributes.title }}</h1>
        </div>

        <div v-for="(block, index) in page.attributes.content" :key="index" class="block--container">
            <Paragraph :paragraph="block" />
        </div>
    </main>
</template>
<script>
    import Paragraph from "../components/Paragraph";
    import qs from "qs";

    export default {
        name: 'Page',
        components: {
            Paragraph,
        },
        data: function() {
          return {
              page: null
          }
        },
        async asyncData ({ params, $http }) {
          let query = qs.stringify({
            filters: {
              slug: {
                $eq: params.slug
              }
            },
            populate: [
              'content',
              'content.image.media',
              'seo',
            ]
          }, {
            encodeValuesOnly: true,
          })

          const response = await $http.$get(process.env.STRAPI_BACK_URL + '/api/pages?' + query);
          let page = response.data[0];
          return { page }
        },
        computed: {
          baseUrl: function () {
            return process.env.STRAPI_BACK_URL;
          }
        },
        /**head() {
          return {
            title: this.article.attributes.title + ' - Atelier Krouiñ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: this.article.attributes.seo.metaDescription
              }
            ]
          }
        }**/
    }
</script>
