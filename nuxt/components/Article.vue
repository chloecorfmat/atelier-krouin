<template>
  <li class="list--articles-item">
    <a class="list--articles-item--container" :href="url">
      <div class="article--image--container">
        <img class="article--image" :src="imgUrl" :alt="this.article.image_header.alt" />
      </div>
      <div class="article--infos">
        <h3 class="article--title">{{ article.title }}</h3>
        <p class="article--time">{{ str_date }}<time :datetime="datetime_date">{{ date }}</time></p>
        <NuxtLink v-if="tagName != ''" class="tag tag--secondary on-image" :to="'/categories/' + tagSlug">{{ tagName }}</NuxtLink>
      </div>
    </a>
  </li>
</template>

<script>
export default {
    name: 'Article',
    props: {
      article: {}
    },
    data: function() {
      return {
        tagName: null,
        tagSlug: null
      }
    },
    computed: {
      imgUrl: function () {
        return process.env.STRAPI_BACK_URL + this.article.image_header.media.url;
      },
      date: function () {
        let published_date = new Date(this.article.published_at);
        let updated_date = new Date(this.article.updated_at);
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
        let published_date = new Date(this.article.published_at);
        let updated_date = new Date(this.article.updated_at);

        if (published_date < updated_date) {
          return "Modifié le ";
        } else {
          return "Publié le "
        }
      },
      datetime_date: function () {
        let published_date = new Date(this.article.published_at);
        let updated_date = new Date(this.article.updated_at);

        if (published_date < updated_date) {
          return this.article.updated_at;
        } else {
          return this.article.published_at;
        }
      },
      url: function() {
        return "/article/" + this.article.slug;
      }
    },
    async fetch () {
      if (this.article.categories == undefined) {
        let response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/articles/' + this.article.id);
        if (response.categories == undefined) {
          this.tagName = "";
          this.tagSlug = "";
        } else {
          this.tagName = response.categories[0].name;
          this.tagSlug = response.categories[0].slug_categorie;
        }
      } else if (this.article.categories[0].name != 'undefined' && this.article.categories[0].slug_categorie != 'undefined') {
        this.tagName = this.article.categories[0].name;
        this.tagSlug = this.article.categories[0].slug_categorie;
      }
    }
}
</script>
