const {Router} = require('express');

const routes = Router();

routes.post('/devs', (request, response) => {
  return response.json({ message: "Hello OmniStack Mundo "});
});

module.exports = routes;


