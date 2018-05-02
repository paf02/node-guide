const express = require('express');


const { serverPort , apiVersion} = require('./config');
const api = require('./api');

const app = express();


app.get('/', (req, res) => {
	res.send(`<p>a</p>`);
});




app.use(`/api/${apiVersion}`, api);


app.listen(serverPort);
console.log(`Listen on port ${serverPort}!`);
