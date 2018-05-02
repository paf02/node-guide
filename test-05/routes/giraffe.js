const { urlencoded, json } = require('body-parser');
const { Router } = require('express');

const endPoint_giraffe = require('./../endPoint/giraffe');
const { maxFileSize } = require('./../config');

module.exports = wagner => {
	const giraffe = Router();

	endPoint_giraffe(giraffe, wagner);
	return giraffe;
};

