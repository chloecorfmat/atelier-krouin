module.exports = ({ env }) => ({
  connection: {
    default: {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST', 'mariadb'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'krouin'),
        username: env('DATABASE_USERNAME', 'root'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL', false)
        },
        charset: 'utf8mb4'
      },
    },
  },
});
