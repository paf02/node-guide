const { urlencoded, json } = require('body-parser');
const { Router } = require('express');

const bootstraping = require('./endPoint/bootstraping');
const animal = require('./endPoint/animal');
const keeper = require('./endPoint/keeper');
const counter = require('./endPoint/counter');

const lion = require('./routes/lion');
const tiger = require('./routes/tiger');
const giraffe = require('./routes/giraffe');


const { maxFileSize } = require('./config');

module.exports = wagner => {
	const api = Router();
	api.use(json({limit: maxFileSize}));
	
	api.use('/lion', lion(wagner));
	api.use('/tiger', tiger(wagner));
	api.use('/giraffe', giraffe(wagner));

	bootstraping(api, wagner);
	animal(api, wagner);
	keeper(api, wagner);
	counter(api, wagner);
	return api;
};

