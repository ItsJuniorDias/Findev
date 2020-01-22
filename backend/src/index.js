const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('cors');
const http = require('http');
const {setupWebsocket} = require('./webSocket');

const app = express();

const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://junior:vestibulinho@cluster0-dlpmx.mongodb.net/RadarDev?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

app.use(cors())
app.use(express.json());
app.use(routes);


server.listen(3333);