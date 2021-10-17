<template>
    <div class="block block--paragraph">
        <h2 v-if="paragraph.title">{{ paragraph.title }}</h2>
        <img v-if="paragraph.image_size == '100%' && paragraph.image_order == 'before'"
             class="image--100 " :src="baseUrl + paragraph.image.media.url" :alt="paragraph.image.alt"
        >

        <div v-if="paragraph.image_size == '33%' && paragraph.image_order == 'before'"
             class="image--33 image--float image--float-right"
        >
            <img class="image--paragraph" :src="baseUrl + paragraph.image.media.url" :alt="paragraph.image.alt">
        </div>

        <div v-if="paragraph.image_size == '50%' && paragraph.image_order == 'before'"
             class="image--50 image--float image--float-right"
        >
            <img class="image--paragraph" :src="baseUrl + paragraph.image.media.url" :alt="paragraph.image.alt">
        </div>

        <div v-if="paragraph.image_size == '33%' && paragraph.image_order == 'after'"
             class="image--33 image--float image--float-left"
        >
            <img class="image--paragraph" :src="baseUrl + paragraph.image.media.url" :alt="paragraph.image.alt">
        </div>

        <div v-if="paragraph.image_size == '50%' && paragraph.image_order == 'after'"
             class="image--50 image--float image--float-left"
        >
            <img class="image--paragraph" :src="baseUrl + paragraph.image.media.url" :alt="paragraph.image.alt">
        </div>

        <vue-markdown class="wysiwyg">{{ paragraph.content }}</vue-markdown>

        <img v-if="paragraph.image_size == '100%' && paragraph.image_order == 'after'"
             class="image--100 " :src="baseUrl + paragraph.image.media.url" :alt="paragraph.image.alt"
        >
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';

    export default {
        name: 'Paragraph',
        components: {
            VueMarkdown
        },
        props: {
            paragraph: {},
        },
        computed: {
          baseUrl: function () {
            return process.env.STRAPI_BACK_URL;
          }
        }
    }
</script>
