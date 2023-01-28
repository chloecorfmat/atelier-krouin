<template>
  <!-- NEWS BLOCK -->
  <div class="block news">
    <div class="news--pseudo">
      <h2>À la Une</h2>
      <article class="article">
        <div class="article--infos">
          <h3 class="article--title">{{ news.attributes.title }}</h3>
          <p class="article--time">{{ str_date }}<time :datetime="datetime_date">{{ date }}</time></p>
        </div>
        <div class="article--description">
          <p>{{ news.attributes.header }}</p>
          <NuxtLink :to="url" class="btn--secondary tag tag--primary article--link">Lire l'article</NuxtLink>
        </div>
        <div :class="'article--image--container image-v-' + news.attributes.image_header.centered_on">
          <div class="article--tag">
            <NuxtLink class="tag tag--secondary on-image" :to="'/categories/' + news.attributes.category.data.attributes.slug">{{ news.attributes.category.data.attributes.name}}</NuxtLink>
          </div>
          
          <StrapiImage :image="news.attributes.image_header" classList="article--image" format="xlarge"/>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
    import StrapiImage from './StrapiImage';
    export default {
        name: 'BlockNews',
        components: {
          StrapiImage
        },
        props: {
          news: null
        },
        computed: {
          date: function () {
            let published_date = new Date(this.news.attributes.publishedAt);
            let updated_date = new Date(this.news.attributes.updatedAt);
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
            let published_date = new Date(this.news.attributes.publishedAt);
            let updated_date = new Date(this.news.attributes.updatedAt);

            if (published_date < updated_date) {
              return "Modifié le ";
            } else {
              return "Publié le "
            }
          },
          datetime_date: function () {
            let published_date = new Date(this.news.attributes.publishedAt);
            let updated_date = new Date(this.news.attributes.updatedAt);

            if (published_date < updated_date) {
              return this.news.attributes.updatedAt;
            } else {
              return this.news.attributes.publishedAt;
            }
          },
          url: function() {
            return "article/" + this.news.attributes.slug;
          }
        }
    }
</script>
