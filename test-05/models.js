const mongoose = require('mongoose');
const { each } = require('underscore');

const animal = require('./schema/animal');
const keeper = require('./schema/keeper');
const counter = require('./schema/counter');
const { dataBaseName } = require('./config');

module.exports = wagner => {
	mongoose.connect(`mongodb://localhost:27017/${dataBaseName}`);

	const Animal = mongoose.model('Animal', animal, 'animal');
	const Counter = mongoose.model('Counter', counter, 'counter');
	const Keeper = mongoose.model('Keeper', keeper, 'keeper');

	const models = {
		Animal: Animal,
		Counter: Counter,
		Keeper: Keeper,
	};

	each(models, (value, key) => { 
		wagner.factory(key, () => {
			return value;
		});
	});

	return models;
};