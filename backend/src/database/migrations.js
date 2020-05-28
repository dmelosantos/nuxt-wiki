const { sequelize } = require('./sequelize');
const Page = require('../models/Page');
const PageHistory = require('../models/PageHistory');

/**
 * Run first time to create the main page also as content
 *
 * @param content
 * @return {Promise<boolean>}
 */
const createMainPage = async (content) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const pages = await Page.findAll({
      where: {
        name: 'Main Page',
      },
    });

    if (pages.length > 0) return false;

    await Page.create(content, { transaction });

    // commit
    await transaction.commit();

    return true;
  } catch (err) {
    console.log(err);

    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return false;
  }
};

/**
 * Create the history after creating the page
 *
 * @param content
 * @param shouldCreate
 * @return {Promise<void>}
 */
const createMainPageFirstHistory = async (content, shouldCreate) => {
  if (shouldCreate) {
    let transaction;

    try {
      transaction = await sequelize.transaction();

      await PageHistory.create({ ...content, previousId: 1 }, { transaction });

      // commit
      await transaction.commit();
    } catch (err) {
      console.log(err);

      // Rollback transaction only if the transaction object is defined
      if (transaction) await transaction.rollback();
    }
  }
};

const syncAllModels = async () => {
  await Page.sync();
  await PageHistory.sync();
};

/**
 * This is only run once on boot up of the node project to add the Main Page
 *
 * @return {Promise<void>}
 */
const bootUpFirstPages = async () => {
  await syncAllModels();

  const content = { name: 'Main Page', body: '<h3>Main Page</h3>' };

  const shouldCreate = await createMainPage(content);
  await createMainPageFirstHistory(content, shouldCreate);
};

module.exports = { bootUpFirstPages };
