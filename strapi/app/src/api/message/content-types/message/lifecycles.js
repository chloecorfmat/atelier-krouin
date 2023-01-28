const mjml2html = require('mjml');

module.exports = {

  async afterCreate(event) {
    const { data, where, select, populate } = event.params;

    const name = data.firstname + ' ' + data.lastname;
    const email = data.email;
    const subject = data.subject;
    const message = data.message;

    const htmlOutput_from = mjml2html(`
      <mjml>
        <mj-head>
          <mj-attributes>
            <mj-text align="center" color="#555" />
          </mj-attributes>
        </mj-head>
        <mj-body background-color="#eee">
          <mj-section background-color="#fff">
            <mj-column>
              <mj-text align="left">
                <p>Votre message envoyé sur Atelier Krouiñ a bien été reçu par Chloé Corfmat.</p>
                <p>Une réponse vous sera apportée sous 72h maximum.</p>
                <p>Bonne journée</p>
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section>
            <mj-column>
              <mj-text>
                Pour toute question, vous pouvez contacter Chloé Corfmat. Les informations se trouvent sur <a href="https://blog.atelierkrouin.fr/contact" target="_blank">la page Contact du blog</a>.
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
  `);

  await strapi.plugins['email'].services.email.send({
    to: 'contact.chloecorfmat@gmail.com',
    from: 'chloe@atelierkrouin.fr',
    replyTo: 'chloe@atelierkrouin.fr',
    subject: '[Atelier Krouiñ] : Votre message a bien été envoyé',
    html: htmlOutput_from.html,
  });

  const htmlOutput_to = mjml2html(`
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-text align="center" color="#555" />
        </mj-attributes>
      </mj-head>
      <mj-body background-color="#eee">
        <mj-section background-color="#fff">
          <mj-column>
            <mj-text align="left">
              <p>Vous avez reçu un nouveau message.</p>
              <p>Nom: ` + name + `</p>
              <p>E-mail: ` + email + `</p>
              <p>Objet: ` + subject + `</p>
              <p>Message: ` + message + `</p>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `);

  await strapi.plugins['email'].services.email.send({
    to: 'contact.chloecorfmat@gmail.com',
    from: 'chloe@atelierkrouin.fr',
    replyTo: 'chloe@atelierkrouin.fr',
    subject: '[Atelier Krouiñ] : Votre message a bien été envoyé',
    html: htmlOutput_to.html,
  });
  }
};
