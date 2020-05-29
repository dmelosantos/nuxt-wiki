const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.SQL_DIALECT,
  storage: process.env.SQL_STORAGE_PATH,
  logging: (process.env.SEQUELIZE_LOGGING === 'true'),
  options: {
    define: {},
  },
});

const testConnection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
};

module.exports = { sequelize, testConnection };
