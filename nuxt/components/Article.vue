<template>
  <li class="list--articles-item">
    <NuxtLink class="list--articles-item--container" :to="url">
      <div class="article--image--container">
        <StrapiImage classList="article--image" :image="this.article.attributes.image_header" format="medium"/>
      </div>
      <div class="article--infos">
        <h3 class="article--title">{{ article.attributes.title }}</h3>
        <p class="article--time">{{ str_date }}<time :datetime="datetime_date">{{ date }}</time></p>
      </div>
    </NuxtLink>
    <NuxtLink v-if="tag_name != ''" class="tag tag--secondary on-image" :to="'/categories/' + tag_slug">{{ tag_name }}</NuxtLink>
  </li>
</template>

<script>
import StrapiImage from './StrapiImage';

export default {
    name: 'Article',
    components: {
      StrapiImage
    },
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
      date: function () {
        let published_date = new Date(this.article.attributes.publishedAt);
        let updated_date = new Date(this.article.attributes.updatedAt);
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
        let published_date = new Date(this.article.attributes.publishedAt);
        let updated_date = new Date(this.article.attributes.updatedAt);

        if (published_date < updated_date) {
          return "Modifié le ";
        } else {
          return "Publié le "
        }
      },
      datetime_date: function () {
        let published_date = new Date(this.article.attributes.publishedAt);
        let updated_date = new Date(this.article.attributes.updatedAt);

        if (published_date < updated_date) {
          return this.article.attributes.updatedAt;
        } else {
          return this.article.attributes.publishedAt;
        }
      },
      url: function() {
        return "/article/" + this.article.attributes.slug;
      },
      tag_name: function () {
        return this.article.attributes.category.data.attributes.name;
      },
      tag_slug: function () {
        return this.article.attributes.category.data.attributes.slug;
      }
    },
}
</script>
