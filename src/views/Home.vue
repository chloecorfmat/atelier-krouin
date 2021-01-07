<template>
  <main>
    <div class="block presentation">
      <prismic-image :field="fields.presentation.presentation_image"/>
      <div>
        <p>{{ fields.presentation.presentation_text }}</p>
        <p class="signature">{{ fields.presentation.presentation_signature }}</p>
      </div>
    </div>


  </main>
</template>

<script>
  export default {
    name: 'homepage',
    data () {
      return {
        fields: {
          title: null,
          presentation: {
            presentation_image: '',
            presentation_text: '',
            presentation_signature: ''
          },
        }
      };
    },
    methods: {
      getContent () {
        this.$prismic.client.getSingle('homepage')
                .then((document) => {
                  this.fields.title = document.data.title;
                  this.fields.presentation = document.data.body[0].primary
                })
      }
    },
    created () {
      this.getContent();
    }
  }
</script>

<style lang="scss">
  $terracotta : #DB8783;
  $white: #fff;

  body {
    margin: 0;
  }

  main {
    .block {
      margin-top: 5rem;
      margin-left: 0;
      margin-right: 0;
      padding-left: 10rem;
      padding-right: 10rem;
    }
    .presentation {
      background: $terracotta;
    }

    .signature {
      font-family: 'modernline - Personal Use';
      color: $white;
    }
  }
</style>
