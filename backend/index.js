const express = require('express');

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: "Hello OmniStack Mndo "});
});

app.listen(3333);