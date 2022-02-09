<template>
    <main class="content page--article">
        <div v-if="article.image_header && article.image_header.media.formats.large" class="block news">
            <div class="news--pseudo">
                <div :class="'article--image--container image-v-' + article.image_header.centered_on ">
                    <img :src="baseUrl + article.image_header.media.formats.large.url" class="article--image">
                </div>
            </div>
        </div>

        <div class="block article--details article">
            <span class="tag tag--secondary">{{ article.categories[0].name }}</span>
            <p class="article--time">
              Publié le <time :datetime="article.published_at">{{ published_date }}</time><span v-if="updated_date">, Modifié le <time :datetime="article.updated_at">{{ updated_date }}</time></span>
            </p>
            <h1 class="article--title">{{ article.title }}</h1>
            <p>{{ article.header }}</p>
        </div>

        <div v-for="(block, index) in article.content" :key="index" class="block--container">
            <div v-if="block.ColoredBlock" class="block block--colored">
                <h2 v-if="block.ColoredBlock.title">{{ block.ColoredBlock.title }}</h2>
                <div class="wysiwyg" v-html="block.ColoredBlock.content" />
                <div v-if="block.ColoredBlock.cta">
                    <a :href="block.ColoredBlock.cta.url" :target="block.ColoredBlock.cta.target" class="tag tag--secondary article--link" >{{ block.ColoredBlock.cta.text }}</a>
                </div>
            </div>

            <div v-if="block.CtaBlock" class="block block--cta">
                <div class="wysiwyg" v-html="block.CtaBlock.content" />
                <div v-if="block.CtaBlock.cta">
                    <a :href="block.CtaBlock.cta.url" :target="block.CtaBlock.cta.target" class="tag tag--secondary article--link" >{{ block.CtaBlock.cta.text }}</a>
                </div>
            </div>

            <div v-if="block.ParagraphBlock" class="block--container">
                <Paragraph :paragraph="block.ParagraphBlock" />
            </div>
        </div>

        <div class="block block--signature">
            <p class="signature">Chloé</p>
        </div>

      <BlockComments v-if="article.instagram != null" :data="article.instagram" />
      <BlockLinkedArticles :articles="article.articles" />
    </main>
</template>
<script>
    import Paragraph from "../../components/Paragraph";
    import BlockLinkedArticles from "../../components/BlockLinkedArticles";
    import BlockComments from "../../components/BlockComments";

    export default {
        name: 'Article',
        components: {
            Paragraph,
            BlockLinkedArticles,
            BlockComments
        },
        data: function() {
          return {
              article: null
          }
        },
        async asyncData ({ params, $http }) {
            const response = await $http.$get(process.env.STRAPI_BACK_URL + '/articles?slug=' + params.slug)
            let article = response[0];
            return { article }
        },
        computed: {
          baseUrl: function () {
            return process.env.STRAPI_BACK_URL;
          },
          published_date: function () {
            let date = new Date(this.article.published_at);

            let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h' + minutes;
          },
          updated_date: function () {
            let published_date = new Date(this.article.published_at);
            let updated_date = new Date(this.article.updated_at);

            if (published_date < updated_date) {
              let date = updated_date;
              let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
              return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h' + minutes;
            } else {
              return false;
            }
          }
        },
        head() {
          return {
            title: this.article.SEO.metatitle + ' | Atelier Krouiñ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: this.article.SEO.metadescription
              }
            ]
          }
        }
    }
</script>
