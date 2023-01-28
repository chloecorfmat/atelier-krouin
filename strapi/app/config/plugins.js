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
  // https://market.strapi.io/plugins/strapi-plugin-comments
  comments: {
    enabled: true,
    config: {
      badWords: false,
      moderatorRoles: ["Authenticated"],
      approvalFlow: ["api::page.page"],
      entryLabel: {
        "*": ["Title", "title", "Name", "name", "Subject", "subject"],
        "api::page.page": ["MyField"],
      },
      reportReasons: {
        MY_CUSTOM_REASON: "MY_CUSTOM_REASON",
      },
      gql: {
        // ...
      },
    },
  },
  // https://market.strapi.io/plugins/@strapi-plugin-seo
  seo: {
    enabled: true,
  },
  upload: {
     config: {
       breakpoints: {
         xlarge: 1500,
         large: 1000,
         medium: 750,
         small: 500
       },
     },
   },
});
