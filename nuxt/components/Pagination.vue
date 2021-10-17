<template>
  <div class="pagination--container">
    <nav class="pagination--nav">
      <ul class="pagination">
        <li v-show="page != 1" class="pagination--item">
          <NuxtLink class="btn--secondary tag tag--secondary tag--inline" :to="baseUrl + previousPage">
            <span class="sr-only">Page </span>Précédente
          </NuxtLink>
        </li>
        <li v-show="page > 1" class="pagination--item">
          <NuxtLink class="pagination--item--link btn--secondary tag tag--secondary tag--inline" :to="baseUrl + 1">1</NuxtLink>
        </li>

        <li v-show="page > 2" class="pagination--item">
          ...
        </li>

        <li class="pagination--item pagination--item--is-active">
          <p class="pagination--item--link tag tag--secondary tag--inline" aria-current="page">{{ page }}</p>
        </li>

        <li v-show="(page == 1 && pagesNb != 1) || (page < pagesNb-1)" class="pagination--item">
          ...
        </li>

        <li v-show="page < pagesNb" class="pagination--item">
          <NuxtLink class="pagination--item--link btn--secondary tag tag--secondary tag--inline" :to="baseUrl + pagesNb">{{ pagesNb }}</NuxtLink>
        </li>
        <li v-show="page != pagesNb"class="pagination--item">
          <NuxtLink class="pagination--item--link btn--secondary tag tag--secondary tag--inline" :to="baseUrl + nextPage">
            <span class="sr-only">Page </span>Suivante
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
      page: Number,
      pagesNb: Number,
      baseUrl: String
    },
    computed: {
      nextPage: function () {
        return this.page + 1;
      },
      previousPage: function () {
        return this.page - 1;
      },
    }
}
</script>
