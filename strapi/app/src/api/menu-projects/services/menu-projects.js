// path: ./src/api/<content-type-name>/services/<service-name>.js

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::menu-projects.menu-projects');
