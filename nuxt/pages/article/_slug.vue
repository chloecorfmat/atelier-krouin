<template>
    <main class="content page--article">
        <div class="block news">
            <div class="news--pseudo">
                <div class="article--image--container">
                    <img v-if="article.image_header" :src="baseUrl + article.image_header.media.formats.large.url" class="article--image">
                </div>
            </div>
        </div>

        <div class="block article--details article">
            <span class="tag tag--primary">{{ article.categories[0].name }}</span>
            <h1 class="article--title">{{ article.title }}</h1>
            <p>{{ article.header }}</p>
        </div>

        <div v-for="(block, index) in article.content" :key="index" class="block--container">
            <div v-if="block.ColoredBlock" class="block block--colored">
                <h2 v-if="block.ColoredBlock.title">{{ block.ColoredBlock.title }}</h2>
                <vue-markdown class="wysiwyg">{{ block.ColoredBlock.content }}</vue-markdown>
                <div v-if="block.ColoredBlock.cta">
                    <a :href="block.ColoredBlock.cta.url" :target="block.ColoredBlock.cta.target" class="tag tag--secondary article--link" >{{ block.ColoredBlock.cta.text }}</a>
                </div>
            </div>

            <div v-if="block.CtaBlock" class="block block--cta">
                <vue-markdown class="wysiwyg">{{ block.CtaBlock.content }}</vue-markdown>
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
    import VueMarkdown from 'vue-markdown';
    import Paragraph from "../../components/Paragraph";
    import BlockLinkedArticles from "../../components/BlockLinkedArticles";
    import BlockComments from "../../components/BlockComments";

    export default {
        name: 'Article',
        components: {
            VueMarkdown,
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
          }
        }
    }
</script>
