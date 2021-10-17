<template>
  <!-- INSTAGRAM -->
  <div class="block block--instagram">
    <h2>Dernières publications Instagram</h2>
    <ol class="instagram--list-posts">
      <li v-for="post in posts" :key="post.id" class="instagram--list-item">
        <Instagram :post_url="post.url_instagram" :image_url="post.image_instagram.url" />
      </li>
    </ol>
  </div>
</template>

<script>
    import Instagram from "./Instagram";

    export default {
        name: 'BlockInstagram',
        components: {
            Instagram
        },
        props: {
          posts: Array
        }
    }
</script>
