<template>
  <div>

    <div v-if="error.statusCode === 404">
      <h1><span>404</span> page introuvable</h1>
      <p>La page à laquelle vous essayez d'accéder a pu être supprimée, a changé de nom ou est temporairement indisponible.</p>
      <NuxtLink to="/articles" class="tag tag--primary">Voir les derniers articles</NuxtLink>
    </div>
    <div v-else>
      <h1>Erreur !</h1>
      <p>Une erreur s'est produite et la page que vous recherchez n'est pas disponible.</p>
      <NuxtLink to="/articles" class="tag tag--primary">Voir les derniers articles</NuxtLink>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>
