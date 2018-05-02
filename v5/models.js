const mongoose = require('mongoose');
const { each } = require('underscore');

const user = require('./schema/user');
const counter = require('./schema/counter');
const { dataBaseName } = require('./config');

module.exports = wagner => {
	mongoose.connect(`mongodb://localhost:27017/${dataBaseName}`);

	const User = mongoose.model('User', user, 'user');
	const Counter = mongoose.model('Counter', counter, 'counter');

	const models = {
		User: User,
		Counter: Counter,
	};

	each(models, (value, key) => { 
		wagner.factory(key, () => {
			return value;
		});
	});


	// wagner.factory(User, () => {
	// 	return User;
	// });

	// wagner.factory(Counter, () => {
	// 	return Counter;
	// });

	return models;
};