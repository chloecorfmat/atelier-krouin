<template>
<div>
  <main class="content page--legal-informations">
    <div class="block">
      <h1>Mentions légales</h1>
    </div>
    <div v-for="(block, index) in paragraphs" :key="index" class="block--container">
      <Paragraph :paragraph="block" />
    </div>
  </main>
</div>
</template>

<script>
import Paragraph from "../components/Paragraph";

export default {
  components: {
    Paragraph
  },
  data: function() {
    return {
      paragraphs: null
    }
  },
  async asyncData ({ params, $http }) {
      let homepage = await $http.$get(process.env.STRAPI_BACK_URL + '/homepage?')
      let paragraphs = homepage.legal_informations;

      return { paragraphs }
  },
  computed: {

  }

}
</script>
