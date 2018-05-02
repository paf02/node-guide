const express = require('express');
const wagner = require('wagner-core');
const { createWriteStream } = require('fs');
const morgan = require('morgan');

const api = require('./api');
const models = require('./models');
const { dir, apiVersion, serverPort } = require('./config');

models(wagner);

const app = express();

app.use(morgan('combined', { 
	stream: createWriteStream(`${dir.logs}/log.log`, { flags: 'a' })
}))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(dir.publicAccess));

app.use(`/api/${apiVersion}`, api(wagner));

app.get('/', (req, res) => {
	res.sendFile(`${dir.view}/bootstraping.html`);
});

app.listen(serverPort);
console.log(`Listen on port ${serverPort}!`);
