const express = require('express');
const asyncHandler = require('express-async-handler');
const { isEmpty } = require('ramda');
const Ajv = require('ajv');

const { Op } = require('sequelize');
const { sequelize } = require('../database/sequelize');
const { toExpressError } = require('../commons/utils');
const Page = require('../models/Page');
const PageHistory = require('../models/PageHistory');

const router = express.Router();

const ajv = new Ajv();
const validateSchema = ajv.compile(Page.jsonSchema);

/**
 * List all pages
 */
router.get('/', asyncHandler(async (req, res) => {
  const pages = await Page.findAll({
    where: {},
  });

  res.json(pages);
}));

/**
 * List page history
 */
router.get('/history/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isEmpty(id)) {
    const pages = await PageHistory.findAll({
      where: {
        previousId: id,
      },
    });
    res.json(pages);
  } else {
    toExpressError(res, 'Id is required');
  }
}));

/**
 * List page history
 */
router.get('/compare/:originalId/:historyId', asyncHandler(async (req, res) => {
  const { originalId, historyId } = req.params;

  if (!isEmpty(originalId) && !isEmpty(historyId)) {
    const historyPage = await PageHistory.findOne({
      where: {
        [Op.and]: [
          {
            previousId: originalId,
          },
          {
            id: historyId,
          },
        ],
      },
    });

    const originalPage = await Page.findOne({
      where: {
        id: originalId,
      },
    });
    res.json({ historyPage, originalPage });
  } else {
    toExpressError(res, 'Original Id and History Id are required');
  }
}));

/**
 * Get page by id
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isEmpty(id)) {
    const pages = await Page.findOne({
      where: {
        id,
      },
    });
    res.json(pages);
  } else {
    toExpressError(res, 'Id is required');
  }
}));

router.get('/byName/:name', asyncHandler(async (req, res) => {
  const { name } = req.params;

  if (!isEmpty(name)) {
    const pages = await Page.findAll({
      where: {
        name,
      },
    });
    res.json(pages);
  } else {
    toExpressError(res, 'Name is required');
  }
}));

/**
 * Search page by term
 */
router.get('/search/:term', asyncHandler(async (req, res) => {
  const { term } = req.params;

  if (!isEmpty(term)) {
    const pages = await Page.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${term}%`,
            },
          },
          {
            body: {
              [Op.like]: `%${term}%`,
            },
          },
        ],
      },
    });
    res.json(pages);
  } else {
    toExpressError(res, 'Name is required');
  }
}));

/**
 * Save page
 */
router.post('/', asyncHandler(async (req, res) => {
  // validate via json schema if the contents of the request are fine
  const isSchemaValid = validateSchema(req.body);

  if (isSchemaValid) {
    let transaction;

    try {
      transaction = await sequelize.transaction();

      const page = await Page.create(req.body, { transaction, returning: true });
      // add a page history so we can diff it
      const pageHistoryContent = { ...req.body, previousId: page.id };
      await PageHistory.create(pageHistoryContent, { transaction, returning: true });

      // commit
      await transaction.commit();

      res.json(page);
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      if (transaction) await transaction.rollback();

      toExpressError(res, err.message);
    }
  } else {
    toExpressError(res, 'Invalid request body');
  }
}));

/**
 * Update page
 */
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isEmpty(id)) {
    let transaction;

    // TODO clean out id/createdAt/updatedAt from request
    // TODO use bind to avoid sql injections, this is a fast prototype just for demoing
    try {
      transaction = await sequelize.transaction();

      // get the old page content and store on history for comparison
      // add a page history so we can diff it
      const oldPage = await Page.findOne({
        where: {
          id,
        },
      });
      const oldPageJson = oldPage.toJSON();
      const pageHistoryContent = { body: oldPageJson.body, name: oldPageJson.name, previousId: id };
      await PageHistory.create(pageHistoryContent, { transaction, returning: true });

      // update the new page
      await Page.update(req.body, {
        transaction,
        where: {
          id,
        },
      });

      // commit
      await transaction.commit();

      res.end();
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      if (transaction) await transaction.rollback();

      toExpressError(res, err.message);
    }
  } else {
    toExpressError(res, 'Id is required');
  }
}));

/**
 * Update page
 * TODO add permission roles to this kind of endpoint
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isEmpty(id)) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      await Page.destroy({
        where: {
          id,
        },
      }, { transaction });

      await transaction.commit();

      res.end();
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      if (transaction) await transaction.rollback();

      toExpressError(res, err.message);
    }
  } else {
    toExpressError(res, 'Id is required');
  }
}));

module.exports = router;
