const app = require('./app');

const server = app.listen(process.env.HTTP_PORT, () => {
  const host = server.address().address;
  const { port } = server.address();

  console.log('Example app listening at http://%s:%s', host, port);
});
