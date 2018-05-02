const { urlencoded, json } = require('body-parser');
const { Router } = require('express');

const endPoint_tiger = require('./../endPoint/tiger');
const { maxFileSize } = require('./../config');

module.exports = wagner => {
	const tiger = Router();

	endPoint_tiger(tiger, wagner);
	return tiger;
};

