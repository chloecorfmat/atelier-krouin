module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env('SMTP_PORT'),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: 'chloe@atelierkrouin.fr',
        defaultReplyTo: 'chloe@atelierkrouin.fr',
      },
    },
  },
  'wysiwyg': {
    enabled: true,
    resolve: './src/plugins/wysiwyg'
  },
  // https://market.strapi.io/plugins/strapi-plugin-menus
  'menus': {
    enabled: true,
    config: {
      maxDepth: 3,
    },
  },
  // https://market.strapi.io/plugins/@webbio-strapi-plugin-scheduler
  scheduler: {
    enabled: true,
    config: {
      model: "scheduler",
    },
  },
  // https://market.strapi.io/plugins/@strapi-plugin-seo
  seo: {
    enabled: true,
  }
});
