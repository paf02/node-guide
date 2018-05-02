const mongoose = require('mongoose');
const { each } = require('underscore');

const user = require('./schema/user');
const counter = require('./schema/counter');
const movie = require('./schema/movie');


const { dataBaseName } = require('./config');

module.exports = wagner => {
	mongoose.connect(`mongodb://localhost:27017/${dataBaseName}`);

	const User = mongoose.model('User', user, 'user');
	const Counter = mongoose.model('Counter', counter, 'counter');
	const Movie = mongoose.model('Movie', movie, 'movie');

	const models = {
		User: User,
		Counter: Counter,
		Movie:Movie,
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