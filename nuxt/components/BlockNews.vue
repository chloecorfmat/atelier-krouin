<template>
  <!-- NEWS BLOCK -->
  <div class="block news">
    <div class="news--pseudo">
      <h2>À la Une</h2>
      <article class="article">
        <div class="article--infos">
          <h3 class="article--title">{{ news.title }}</h3>
          <p class="article--time">{{ str_date }}<time :datetime="datetime_date">{{ date }}</time></p>
        </div>
        <div class="article--description">
          <p>{{ news.header }}</p>
          <NuxtLink :to="url" class="btn--secondary tag tag--primary article--link">Lire l'article</NuxtLink>
        </div>
        <div :class="'article--image--container image-v-' + news.image_header.centered_on">
          <div class="article--tag">
            <NuxtLink class="tag tag--secondary on-image" :to="'/categories/' + news.categories[0].slug_categorie">{{ news.categories[0].name}}</NuxtLink>
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
            let published_date = new Date(this.news.published_at);
            let updated_date = new Date(this.news.updated_at);
            let date = null;

            if (published_date < updated_date) {
              date = updated_date;
            } else {
              date = published_date;
            }

            let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h' + minutes;
          },
          str_date: function () {
            let published_date = new Date(this.news.published_at);
            let updated_date = new Date(this.news.updated_at);

            if (published_date < updated_date) {
              return "Modifié le ";
            } else {
              return "Publié le "
            }
          },
          datetime_date: function () {
            let published_date = new Date(this.news.published_at);
            let updated_date = new Date(this.news.updated_at);

            if (published_date < updated_date) {
              return this.news.updated_at;
            } else {
              return this.news.published_at;
            }
          },
          url: function() {
            return "article/" + this.news.slug;
          }
        }
    }
</script>
