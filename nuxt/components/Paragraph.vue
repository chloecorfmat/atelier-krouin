<template>
    <div class="block block--paragraph">
        <h2 v-if="paragraph.title">{{ paragraph.title }}</h2>

        <StrapiImage v-if="paragraph.image_size == 'percent_100' && paragraph.image_order == 'after'" :image="paragraph.image" format="xlarge" classList="image--100" />
        
        <div v-if="paragraph.image_size == 'percent_33' && paragraph.image_order == 'after'"
             class="image--33 image--float image--float-right"
        >
            <StrapiImage :image="paragraph.image" format="medium" classList="image--paragraph" />
        </div>

        <div v-if="paragraph.image_size == 'percent_50' && paragraph.image_order == 'after'"
             class="image--50 image--float image--float-right"
        >
            <StrapiImage :image="paragraph.image" format="large" classList="image--paragraph" />
        </div>

        <div v-if="paragraph.image_size == 'percent_33' && paragraph.image_order == 'before'"
             class="image--33 image--float image--float-left"
        >
            <StrapiImage :image="paragraph.image" format="medium" classList="image--paragraph" />
        </div>

        <div v-if="paragraph.image_size == 'percent_50' && paragraph.image_order == 'before'"
             class="image--50 image--float image--float-left"
        >
            <StrapiImage :image="paragraph.image" format="large" classList="image--paragraph" />
        </div>

        <div class="wysiwyg" v-html="paragraph.content" />

        <StrapiImage v-if="paragraph.image_size == 'percent_100' && paragraph.image_order == 'before'" :image="paragraph.image" format="xlarge" classList="image--100" />
        
    </div>
</template>

<script>
    import StrapiImage from './StrapiImage';
    export default {
        name: 'Paragraph',
        components: {
    StrapiImage,
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
