<template>
  <!-- HEADER -->
  <header class="header">
      <!-- NAVIGATION MENU -->
      <nav class="menu--navigation--nav">
          <ul class="menu--navigation">
            <li v-for="categorie in menuMain.categories" :key="categorie.id" class="menu--navigation--item">
              <NuxtLink class="header--link" :to="'/categories/' + categorie.slug_categorie">{{ categorie.name }}</NuxtLink>
            </li>
          </ul>
      </nav>

      <!-- LOGO -->
      <NuxtLink to="/" class="logo-text">Atelier Krouiñ</NuxtLink>

      <!-- SOCIAL MEDIA -->
      <nav class="menu--social-media--nav">
          <ul class="menu--social-media">
            <li v-for="item in menuSocialMedia.items" :key="item.id" class="menu--social-media--item">
              <a class="header--link header--link--social" :href="item.url" :aria-label="item.text" :target="item.target" :title="item.text + ' - Nouvelle fenêtre'" rel="noreferrer noopener">
                <i aria-hidden="true" :class="item.icon"></i>
              </a>
            </li>
          </ul>
      </nav>
  </header>
</template>

<script>
    export default {
        name: 'Header',
        data: function () {
          return {
            menuMain: {},
            menuSocialMedia: {}
          }
        },
        async fetch () {
            try {
                let response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/menu-main')
                this.menuMain = response;

                response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/menu-social-media')
                this.menuSocialMedia = response;
            } catch (error) {
                console.log(error);
                this.error = error;
            }
        }
    }
</script>
