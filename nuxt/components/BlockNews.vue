<template>
  <!-- NEWS BLOCK -->
  <div class="block news">
    <div class="news--pseudo">
      <h2>À la Une</h2>
      <article class="article">
        <div class="article--infos">
          <h3 class="article--title">{{ news.title }}</h3>
          <time :datetime="news.published_at" class="article--time">{{ date }}</time>
        </div>
        <div class="article--description">
          <p>{{ news.header }}</p>
          <NuxtLink :to="url" class="btn--secondary tag tag--secondary article--link">Lire l'article</NuxtLink>
        </div>
        <div :class="'article--image--container image-v-' + news.image_header.centered_on">
          <div class="article--tag">
            <NuxtLink class="tag tag--primary on-image" :to="'/categories/' + news.categories[0].slug_categorie">{{ news.categories[0].name}}</NuxtLink>
          </div>
          <img class="article--image" :src="imgUrl" :alt="news.image_header.alt" />
        </div>
      </article>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'BlockNews',
        props: {
          news: null
        },
        computed: {
          imgUrl: function () {
            return process.env.STRAPI_BACK_URL + this.news.image_header.media.url;
          },
          date: function () {
            let date = new Date(this.news.published_at);
            return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h' + date.getMinutes();
          },
          url: function() {
            return "article/" + this.news.slug;
          }
        }
    }
</script>
