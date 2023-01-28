const slugify = require('slugify');

module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    if (!data.slug) {
      data.slug = slugify(data.title, {lower: true});
    }
  }
};
