const Sequelize = require('sequelize');
const sjs = require('sequelize-json-schema');
const { sequelize } = require('../database/sequelize');

const { Model } = Sequelize;
class PageHistory extends Model {}

PageHistory.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
  },
  previousId: {
    type: Sequelize.INTEGER,
  },
}, {
  sequelize,
  modelName: 'pageHistory',
});

const options = { exclude: ['id', 'createdAt', 'updatedAt'] };
PageHistory.jsonSchema = sjs.getModelSchema(PageHistory, options);

module.exports = PageHistory;
