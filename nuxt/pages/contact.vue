<template>
<div>
  <main class="content page--contact">
    <div class="block">
      <h1>Restons en contact</h1>

      <div class="contact--infos">
        <p>Pour me contacter, vous pouvez <strong>remplir le formulaire</strong> ci-dessous ou bien me contacter : </p>
        <ul class="contact--list">
          <li class="contact--list-item">par <strong>e-mail</strong> : <a href="mailto:contact.chloecorfmat@gmail.com">contact.chloecorfmat@gmail.com</a></li>
          <li class="contact--list-item">par <strong>téléphone</strong> : <a href="tel:+33750346070">+33 7 50 34 60 70</a></li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div ref="success" tabindex="-1">
        <div v-if="this.success" role="alert" class="form-message form-success">
          <p class="form-message--title">Merci !</p>
          <p class="form-message--success">Le message a bien été envoyé. Une réponse vous sera fournie sous 72h maximum.</p>
        </div>
      </div>

      <form @submit.prevent="validateForm" novalidate>
        <div ref="errors" tabindex="-1">
          <div v-if="this.errorsList.length" role="alert" class="form-message form-errors">
            <p class="form-message--title">Messages d'erreur</p>
            <ul>
              <li v-for="error in this.errorsList" class="form-message--error">{{ error }}</li>
            </ul>
          </div>
        </div>

        <p class="form-alert--required">Les champs suivis d'un astérisque (<sup>*</sup>) sont obligatoires.</p>

        <fieldset>
          <div class="form-field">
            <label for="field-lastname">Nom</label>
            <input v-model= "lastname" type="text" name="field-lastname" id="field-lastname" />
          </div>

          <div class="form-field">
            <label for="field-firstname">Prénom</label>
            <input v-model= "firstname" type="text" name="field-firstname" id="field-firstname" />
          </div>
        </fieldset>

        <div class="form-field">
          <label for="field-email">Adresse e-mail <sup data-asterisk="">*</sup></label>
          <p id="field-email--description" class="field-description">L’adresse e-mail doit être de la forme : mail@exemple.com</p>
          <input
            v-model= "email"
            type="email"
            name="field-email"
            id="field-email"
            aria-required="true"
            aria-describedby="field-email--description"
            placeholder="mail@exemple.com"
            :aria-invalid="this.errors.email.length ? true : false"
            :aria-errormessage="this.errors.email.length ? 'field-email--errors' : ''"
          />
          <div v-if="this.errors.email.length" id="field-email--errors">
            <p v-for="error in this.errors.email" :key="error.id" class="field-error">{{ error }}</p>
          </div>
        </div>

        <div class="form-field">
          <label for="field-subject">Objet <sup data-asterisk="">*</sup></label>
          <input
            v-model= "subject"
            type="text"
            name="field-subject"
            id="field-subject"
            aria-required="true"
            placeholder="Je t'envoie un message pour..."
            :aria-invalid="this.errors.subject.length ? true : false"
            :aria-errormessage="this.errors.subject.length ? 'field-subject--errors' : ''"
          />
          <div v-if="this.errors.subject.length" id="field-subject--errors">
            <p v-for="error in this.errors.subject" :key="error.id" class="field-error">{{ error }}</p>
          </div>
        </div>

        <div class="form-field">
          <label for="field-message">Message <sup data-asterisk="">*</sup></label>
          <textarea
            v-model="message"
            name="field-message"
            id="field-message"
            aria-required="true"
            :aria-invalid="this.errors.message.length ? true : false"
            :aria-errormessage="this.errors.message.length ? 'field-message--errors' : ''"
            rows="5"
          ></textarea>
          <div v-if="this.errors.message.length" id="field-message--errors">
            <p v-for="error in this.errors.message" :key="error.id" class="field-error">{{ error }}</p>
          </div>
        </div>

        <div class="btn--container">
          <input type="submit" value="Envoyer le message" title="Envoyer le message" class="btn--secondary tag tag--primary"/>
        </div>
      </form>
    </div>
  </main>
</div>
</template>

<script>

export default {
  components: {

  },
  data: function() {
    return {
      errors: {
        email: [],
        subject: [],
        message: [],
        success: []
      },
      firstname: '',
      lastname: '',
      email: '',
      subject: '',
      message: '',
      success: 0
    }
  },
  computed: {
    errorsList: function () {
      let list = [];

      Object.values(this.errors).forEach(errors => {
        errors.forEach(error => list.push(error));
      });

      return list;
    }
  },
  methods: {
    async validateForm () {
      // Reset errors & success.
      this.errors = {
        email: [],
        subject: [],
        message: [],
        success: []
      };
      this.success = 0;

      if (!this.email.length) {
        this.errors.email.push('Le champ E-mail est requis.');
      }

      if (!this.subject.length) {
        this.errors.subject.push('Le champ Objet est requis.');
      }

      if (!this.message.length) {
        this.errors.message.push('Le champ Message est requis.');
      }

      if (!this.isValidEmail(this.email)) {
        this.errors.email.push('L\'adresse e-mail ne respecte pas le format : mail@exemple.com');
      }

      if (this.errorsList.length > 0) {
        this.$refs.errors.focus();
      } else {
        try {
          let object = { firstname: this.firstname, lastname: this.lastname, email: this.email, subject: this.subject, message: this.message, tag: 'blog'};
          let message = await this.$http.$post(process.env.STRAPI_BACK_URL + '/api/messages', JSON.parse(JSON.stringify({ data: object })));
          this.success = 1;
          this.$refs.success.focus();
          this.initForm();

        } catch (error) {
          console.log(error)
          this.errors.success.push('Une erreur est survenue. Veuillez réessayer plus tard ou envoyer un mail directement.');
          this.$refs.errors.focus();
        }
      }

    },
    isValidEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    initForm: function () {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    }
  }
}
</script>
