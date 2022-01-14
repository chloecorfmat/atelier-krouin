<template>
  <footer class="footer">
      <div class="footer--description">
          <p class="footer--title">Atelier Krouiñ</p>
          <p class="footer--description-text">L'espace créatif de Chloé : un peu de peinture, beaucoup de couture, énormément de DIY, toujours plus de passion et de partage. Bienvenue sur mon blog !</p>
          <nav>
            <ul class="menu--social-media-footer">
              <li v-for="item in menuSocialMedia.items" :key="item.id" class="menu--social-media-footer--item">
                <a class="footer--link footer--link--social" :href="item.url" :aria-label="item.text" :target="item.target">
                  <i aria-hidden="true" :class="item.icon"></i>
                </a>
              </li>
            </ul>
          </nav>
      </div>
      <div class="footer--projects">
          <h2 class="footer--subtitle">Autres projets</h2>
          <ul>
              <li v-for="project in menuProjects.items">
                <a class="footer--link" :href="project.url" :target="project.target">{{ project.text }}</a>
              </li>
          </ul>
      </div>
      <div class="footer--contact">
          <h2 class="footer--subtitle">Contact</h2>
          <ul class="menu--contact">
              <li class="menu--contact--item">
      <i class="fa-icon fas fa-envelope"></i><a class="footer--link" href="mailto:chloe@chloecorfmat.fr">chloe@chloecorfmat.fr</a>
    </li>
              <!--<li class="menu--contact--item">
      <a class="footer--link" href="#">Formulaire de contact</a>
    </li>-->
              <li class="menu--contact--item"><i class="fa-icon fas fa-map-marker-alt"></i> Nantes</li>
          </ul>
      </div>
      <div class="footer--legal-infos">
          <p class="footer--rights">© 2021 Chloé Corfmat - Tous droits réservés</p>
          <ul class="menu--legal-infos">
            <li v-for="item in menuLegalInformations.items" :key="item.id" class="menu--legal-infos--item">
              <NuxtLink class="footer--link" :to="item.url">{{ item.text}}</NuxtLink>
            </li>
          </ul>
      </div>
  </footer>
</template>

<script>
    export default {
        name: 'Footer',
        data: function () {
          return {
            menuProjects: {},
            menuSocialMedia: {},
            menuLegalInformations: {}
          }
        },
        async fetch () {
            try {
                let response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/menu-projects')
                this.menuProjects = response;

                response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/menu-social-media')
                this.menuSocialMedia = response;

                response = await this.$http.$get(process.env.STRAPI_BACK_URL + '/menu-legal-informations')
                this.menuLegalInformations = response;
            } catch (error) {
                console.log(error);
                this.error = error;
            }
        }
    }
</script>
