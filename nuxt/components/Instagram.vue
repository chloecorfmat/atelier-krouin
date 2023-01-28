<template>
  <a :href="post_url" class="item--instagram" target="_blank" rel="noreferrer noopener">
    <div class="item--instagram-profile">
      <img src="/images/instagram.jpg" alt="Photo de profil Instagram de Atelier Krouiñ">
      <p class="item--instagram-username">atelierkrouin</p>
    </div>
    <img class="item--instagram-image" :src="imgUrl" alt="Image du post Instagram en lien"/>
  </a>
</template>

<script>
export default {
    name: 'Instagram',
    props: {
      image_url: String,
      post_url: String
    },
    computed: {
      imgUrl: function () {
        return process.env.STRAPI_BACK_URL + this.image_url;
      },
    }
}
</script>
