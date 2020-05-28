const request = require('supertest');
const R = require('ramda');
const { v4: uuidv4 } = require('uuid');
const app = require('../../../src/app');

const insertNewPage = async (name) => {
  const newPage = {
    name,
    body: 'test',
  };
  // insert a new page
  const response = await request(app).post('/pages/').send(newPage);
  expect(response.statusCode).toBe(200);
  const testPage = await response.body;
  expect(testPage).not.toBeNull();
  expect(testPage.name).toBe(name);
  return testPage.id;
};

const attestPageExists = async (pageName) => {
  // make sure it was recorded on the database properly
  const response2 = await request(app).get(`/pages/byName/${pageName}`);
  expect(response2.statusCode).toBe(200);
  const fetchedTestPages = await response2.body;
  expect(fetchedTestPages.length).toBe(1);

  const fetchedTestPage = R.head(fetchedTestPages);
  expect(R.head(fetchedTestPage)).not.toBeNull();
  expect(fetchedTestPage.name).toBe(pageName);
};

it('Should fetch all pages', async () => {
  const response = await request(app).get('/pages');

  expect(response.statusCode).toBe(200);

  const pages = await response.body;
  expect(pages).not.toBeNull();

  const mainPage = R.find(R.propEq('id', 1))(pages);
  expect(mainPage).not.toBeNull();
});

it('Should fetch a specific page', async () => {
  const response = await request(app).get('/pages/1');

  expect(response.statusCode).toBe(200);

  const mainPage = await response.body;
  expect(mainPage).not.toBeNull();
  expect(mainPage.name).toBe('Main Page');
});

it('Should add a page and delete afterwards', async () => {
  const pageName = uuidv4();
  const id = await insertNewPage(pageName);
  await attestPageExists(pageName);

  // clean up
  const response3 = await request(app).delete(`/pages/${id}`);
  expect(response3.statusCode).toBe(200);
}, 30000);

it('Should update a page and delete afterwards', async () => {
  const pageName = uuidv4();
  const id = await insertNewPage(pageName);
  await attestPageExists(pageName);

  const updatedBody = { body: pageName };
  await request(app).put(`/pages/${id}`).send(updatedBody);

  const response2 = await request(app).get(`/pages/byName/${pageName}`);
  const updatedPage = await response2.body;

  expect(R.head(updatedPage).body).toBe(pageName);

  // clean up
  const response3 = await request(app).delete(`/pages/${id}`);
  expect(response3.statusCode).toBe(200);
}, 30000);
