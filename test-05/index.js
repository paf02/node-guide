const express = require('express');
const wagner = require('wagner-core');
const cors = require('cors');
const { createWriteStream } = require('fs');
const morgan = require('morgan');

const api = require('./api');
const models = require('./models');
const { dir, apiVersion, serverPort } = require('./config');

models(wagner);

const app = express();

app.use(morgan('combined', { 
	stream: createWriteStream(`${dir.logs}/log.log`, { flags: 'a' })
}));

app.use(cors());

app.use(express.static(dir.publicAccess));

app.use(`/api/${apiVersion}`, api(wagner));

app.get('/', (req, res) => {
	res.sendFile(`${dir.view}/bootstraping.html`);
});

app.listen(serverPort);
console.log(`Listen on port ${serverPort}!`);
