const { Router } = require('express');
const { json } = require('body-parser');
const status = require('http-status');
const cors = require ('cors');


const auth = require('./endPoint/auth');
const jwt = require('./endPoint/jwt');


const counter = require('./endPoint/counter');
const bootstraping = require('./endPoint/bootstraping');
const user = require('./endPoint/user');
const movie = require('./endPoint/movie');




const { maxFileSize, counterId, appCodes } = require('./config');
const { getSequence } = require('./miscellaneous');


module.exports = wagner => {
	const api = Router();

	api.use(json({limit: maxFileSize}));

	bootstraping(api,wagner);
	auth(api,wagner);

	jwt(api);

	counter(api, wagner);
	user(api,wagner);
	movie(api,wagner);

	return api;
};

