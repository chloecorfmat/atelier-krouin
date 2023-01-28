<template>
    <main class="content page--article">
        <div v-if="article.attributes.image_header" class="block news">
            <div class="news--pseudo">
                <div :class="'article--image--container image-v-' + article.attributes.image_header.centered_on ">
                    <StrapiImage :image="article.attributes.image_header" format="xlarge" classList="article--image" />
                </div>
            </div>
        </div>

        <div class="block article--details article">
            <span class="tag tag--secondary">{{ article.attributes.category.data.attributes.name }}</span>
            <p class="article--time">
              Publié le <time :datetime="article.attributes.publishedAt">{{ published_date }}</time><span v-if="updated_date">, modifié le <time :datetime="article.attributes.updatedAt">{{ updated_date }}</time></span>
            </p>
            <h1 class="article--title">{{ article.attributes.title }}</h1>
            <p>{{ article.attributes.header }}</p>
        </div>

        <div v-for="(block, index) in article.attributes.content" :key="index" class="block--container">
            <div v-if="block.__component == 'block.cta-block'" :class="[block.colored ? 'block--colored' : '', 'block']">
                <div class="wysiwyg" v-html="block.content" />
                <div v-if="block.cta">
                    <a :href="block.cta.url" :target="block.cta.target" class="tag tag--secondary article--link" >{{ block.cta.text }}</a>
                </div>
            </div>

            <div v-if="block.__component == 'block.paragraph-block'" class="block--container">
                <Paragraph :paragraph="block" />
            </div>
        </div>

        <div class="block block--signature">
            <p class="signature">Chloé</p>
        </div>

        <div class="block block--author">
          <p>Article entièrement rédigé par Chloé Corfmat</p>
        </div>

      <!--<BlockComments v-if="article.instagram != null" :data="article.instagram" />-->
      <BlockLinkedArticles :articles="article.attributes.linked_articles.data" />
    </main>
</template>
<script>
    import Paragraph from "../../components/Paragraph";
    import BlockLinkedArticles from "../../components/BlockLinkedArticles";
    import BlockComments from "../../components/BlockComments";
    import StrapiImage from "../../components/StrapiImage";
    import qs from "qs";
import { maxHeaderSize } from "http";

    export default {
        name: 'Article',
        components: {
    Paragraph,
    BlockLinkedArticles,
    BlockComments,
    StrapiImage,
    StrapiImage
},
        data: function() {
          return {
              article: null
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
              'image_header.media',
              'content',
              'content.image.media',
              'content.cta',
              'category',
              'seo',
              'seo.metaSocial',
              'seo.metaSocial.image',
              'linked_articles.image_header.media',
              'linked_articles.category',
              'author',
              'createdBy',
              'creator'
            ]
          }, {
            encodeValuesOnly: true,
          })

          const response = await $http.$get(process.env.STRAPI_BACK_URL + '/api/articles?' + query);
          let article = response.data[0];
          return { article }
        },
        computed: {
          baseUrl: function () {
            return process.env.STRAPI_BACK_URL;
          },
          published_date: function () {
            let date = new Date(this.article.attributes.publishedAt);

            let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h' + minutes;
          },
          updated_date: function () {
            let published_date = new Date(this.article.attributes.publishedAt);
            let updated_date = new Date(this.article.attributes.updatedAt);

            if (published_date < updated_date) {
              let date = updated_date;
              let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
              return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h' + minutes;
            } else {
              return false;
            }
          },
          metaSocial: function () {
            let meta = this.article.attributes.seo.metaSocial;
            let obj = {};
            meta.forEach(element => {
              let socialNetwork = element.socialNetwork.toLowerCase();
              obj[socialNetwork] = {
                'description' : element.description,
                'title': element.title,
                'image': element.image
              }
            });
            return obj;
          }
        },
        head() {
          return {
            title: this.article.attributes.title + ' - Atelier Krouiñ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: this.article.attributes.seo.metaDescription
              },
              {
                property: 'og:locale',
                content: 'fr_FR'
              },
              {
                property: 'og:site_name',
                content: 'Atelier Krouiñ'
              },
              // Facebook
              {
                property: 'og:url',
                content: process.env.FRONT_URL + "/article/" + this.article.attributes.seo.canonicalURL
              },
              {
                property: 'og:title',
                content: this.metaSocial.facebook.title
              },
              {
                property: 'og:description',
                content: this.metaSocial.facebook.description
              },
              {
                property: 'og:image',
                content: process.env.STRAPI_BACK_URL + this.metaSocial.facebook.image.data.attributes.formats.large.url
              },
              {
                property: 'og:image:secure_url',
                content: process.env.STRAPI_BACK_URL + this.metaSocial.facebook.image.data.attributes.formats.large.url
              },
              {
                property: 'og:image:width',
                content: this.metaSocial.facebook.image.data.attributes.formats.large.width
              },
              {
                property: 'og:image:height',
                content: this.metaSocial.facebook.image.data.attributes.formats.large.height
              },
              /**{
                property: 'fb:app_id',
                content: ''
              },**/
              // Twitter
              {
                name: 'twitter:card',
                content: 'summary_large_image',
              },
              {
                name: 'twitter:site',
                content: '@chloecorfmat'
              },
              {
                name: 'twitter:creator',
                content: '@chloecorfmat'
              },
              {
                name: 'twitter:title',
                content: this.metaSocial.twitter.title
              },
              {
                name: 'twitter:description',
                content: this.metaSocial.facebook.description
              },
              {
                name: 'twitter:image',
                content: process.env.STRAPI_BACK_URL + this.metaSocial.facebook.image.data.attributes.formats.large.url,
              },
            ],
            link: [
              {
                rel: "canonical",
                href: process.env.FRONT_URL + "/article/" + this.article.attributes.seo.canonicalURL
              }
            ]
          }
        }
    }
</script>
