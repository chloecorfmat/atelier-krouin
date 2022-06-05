<template>
  <div class="block block--comments">
    <div class="comments--content">
      <h2 class="comments--title">Pour commenter</h2>
      <p class="comments--text">{{ data.insta_text }}</p>
      <a :href="data.insta_url" class="tag tag--reverse" target="_blank">Commenter l'article</a>
    </div>

    <Instagram :image_url="data.insta_image.url" :post_url="data.insta_url"/>
  </div>
</template>

<script>
import Instagram from "./Instagram";

export default {
    name: 'BlockComments',
    components: {
      Instagram
    },
    props: {
      data: {}
    }
}
</script>
