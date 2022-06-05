<template>
    <div class="block block--paragraph">
        <h2 v-if="paragraph.title">{{ paragraph.title }}</h2>
        <img v-if="paragraph.image_size == 'percent_100' && paragraph.image_order == 'after'"
             class="image--100 " :src="baseUrl + paragraph.image.media.data.attributes.url" :alt="paragraph.image.media.attributes.alternativeText"
        >

        <div v-if="paragraph.image_size == 'percent_33' && paragraph.image_order == 'after'"
             class="image--33 image--float image--float-right"
        >
            <img class="image--paragraph" :src="baseUrl + paragraph.image.media.data.attributes.url" :alt="paragraph.image.media.data.attributes.alternativeText">
        </div>

        <div v-if="paragraph.image_size == 'percent_50' && paragraph.image_order == 'after'"
             class="image--50 image--float image--float-right"
        >
            <img class="image--paragraph" :src="baseUrl + paragraph.image.media.data.attributes.url" :alt="paragraph.image.media.data.attributes.alternativeText">
        </div>

        <div v-if="paragraph.image_size == 'percent_33' && paragraph.image_order == 'before'"
             class="image--33 image--float image--float-left"
        >
            <img class="image--paragraph" :src="baseUrl + paragraph.image.media.data.attributes.url" :alt="paragraph.image.media.data.attributes.alternativeText">
        </div>

        <div v-if="paragraph.image_size == 'percent_50' && paragraph.image_order == 'before'"
             class="image--50 image--float image--float-left"
        >
            <img class="image--paragraph" :src="baseUrl + paragraph.image.media.data.attributes.url" :alt="paragraph.image.media.data.attributes.alternativeText">
        </div>

        <div class="wysiwyg" v-html="paragraph.content" />

        <img v-if="paragraph.image_size == 'percent_100' && paragraph.image_order == 'before'"
             class="image--100 " :src="baseUrl + paragraph.image.media.data.attributes.url" :alt="paragraph.image.media.data.attributes.alternativeText"
        >
    </div>
</template>

<script>
    export default {
        name: 'Paragraph',
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
