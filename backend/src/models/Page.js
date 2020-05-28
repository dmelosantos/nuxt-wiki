const Sequelize = require('sequelize');
const sjs = require('sequelize-json-schema');

const { sequelize } = require('../database/sequelize');

const { Model } = Sequelize;
class Page extends Model {}

Page.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  modelName: 'Page',
});

const options = { exclude: ['id', 'createdAt', 'updatedAt'] };
Page.jsonSchema = sjs.getModelSchema(Page, options);

module.exports = Page;
