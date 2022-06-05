<template>
  <!-- HEADER -->
  <header class="header">
      <!-- NAVIGATION MENU -->
      <nav class="menu--navigation--nav">
          <ul class="menu--navigation">
            <li v-for="item in menuMain.items" :key="item.id" class="menu--navigation--item">
              <NuxtLink class="header--link" :to="'/categories' + item.url">{{ item.title }}</NuxtLink>
            </li>
          </ul>
      </nav>

      <!-- LOGO -->
      <NuxtLink to="/" class="logo-text">Atelier Krouiñ</NuxtLink>

      <!-- SOCIAL MEDIA -->
      <nav class="menu--social-media--nav">
          <ul class="menu--social-media">
            <li v-for="item in menuSocialMedia.items" :key="item.id" class="menu--social-media--item">
              <a class="header--link header--link--social" :href="item.url" :aria-label="item.title" :target="item.target" :title="item.title + ' - Nouvelle fenêtre'" rel="noreferrer noopener">
                <i aria-hidden="true" :class="'fab fa-' + item.title.toLowerCase()"></i>
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
                let response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/api/menus/main-menu')
                this.menuMain = response.menu;

                response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/api/menus/social-media-menu')
                this.menuSocialMedia = response.menu;
            } catch (error) {
                console.log(error);
                this.error = error;
            }
        }
    }
</script>
