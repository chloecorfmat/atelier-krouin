<template>
    <img :class="classList" :src="imgUrl" :alt="image.media.data.attributes.alternativeText + 'sdgdfhfhfdh'" />
</template>

<script>
    export default {
        name: 'StrapiImage',
        props: {
            image: null,
            classList: '',
            format: ''
        },
        computed: {
          imgUrl: function () {
            return process.env.STRAPI_BACK_URL + this.image.media.data.attributes.formats[this.realFormat].url;
          },
          realFormat: function () {
            let format = this.format;
        
            if(this.image.media.data.attributes.formats[format] !== undefined){
                return format;
            }

            if (format == 'xlarge' && this.image.media.data.attributes.formats.xlarge === undefined) {
                format = 'large';
            }

            if (format == 'large' && this.image.media.data.attributes.formats.large === undefined) {
                format = 'medium';
            }

            if (format == 'medium' && this.image.media.data.attributes.formats.medium === undefined) {
                format = 'small';
            }
            
            return format;
          }
        }
    }
</script>