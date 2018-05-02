const { urlencoded, json } = require('body-parser');
const { Router } = require('express');

const endPoint_lion = require('./../endPoint/lion');
const { maxFileSize } = require('./../config');

module.exports = wagner => {
	const lion = Router();

	endPoint_lion(lion, wagner);
	return lion;
};

