<template>
  <li class="list--articles-item">
    <NuxtLink class="list--articles-item--container" :to="url">
      <div class="article--image--container">
        <img class="article--image" :src="imgUrl" :alt="this.article.image_header.alt" />
      </div>
      <div class="article--infos">
        <span v-if="tag != ''" class="tag tag--primary">{{ tag }}</span>
        <h3 class="article--title">{{ article.title }}</h3>
        <time class="article--time" :datetime="article.published_at">{{ date }}</time>
      </div>
    </NuxtLink>
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
        tag: null,
      }
    },
    computed: {
      imgUrl: function () {
        return process.env.STRAPI_BACK_URL + this.article.image_header.media.url;
      },
      date: function () {
        let date = new Date(this.article.published_at);
        return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h' + date.getMinutes();
      },
      url: function() {
        return "/article/" + this.article.slug;
      }
    },
    async fetch () {
      if (this.article.categories == undefined) {
        let response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/articles/' + this.article.id);
        if (response.categories == undefined) {
          this.tag = "";
        } else {
          this.tag = response.categories[0].name;
        }
      } else if (this.article.categories[0].name != 'undefined') {
        this.tag = this.article.categories[0].name;
      }
    }
}
</script>
