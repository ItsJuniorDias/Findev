const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://junior:vestibulinho@cluster0-dlpmx.mongodb.net/RadarDev?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
});

app.use(express.json());
// Query Params: req.query (filtros, ordenação, paginação)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: requesdt.body (Dados para criação ou alteração  de um registro)

app.post('/users', (request, response) => {
  console.log(request.body);
  return response.json({ message: "Hello OmniStack Mundo "});
});

app.listen(3333);