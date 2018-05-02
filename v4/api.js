const { Router } = require('express');
const {json } = require('body-parser');

const {maxFileSize } = require('./config');

const api = Router();

api.use(json({ limit: maxFileSize }));


var User = require('./user');


api.get('/user', (req, res) => {
	User.find((error, user) => {
		if (error) {
			return res
				.status(500)
				.json({ error: error.toString() });
		}

		if (!user || user.length === 0) {
			return res
				.status(404)
				.json({ error: 'Not found'});
		}

		res.json({ User: user });					
	});
});

api.post('/user/id/:id', (req, res) => {
	User.findOne(
		{
			id: req.body.filter.id,
		},
	(error, user) => {
		if (error) {
			return res
				.status(500)
				.json({ error: error.toString() });
		}

		if (!user || user.length === 0) {
			return res
				.status(404)
				.json({ error: 'Not found'});
		}

		res.json({ User: user });					
	});
});

api.get('/user/email/:email', (req, res) => {
	User.findOne(
		{
			email: req.body.filter.email,
		},
	(error, user) => {
		if (error) {
			return res
				.status(500)
				.json({ error: error.toString() });
		}

		if (!user || user.length === 0) {
			return res
				.status(404)
				.json({ error: 'Not found'});
		}

		res.json({ User: user });					
	});
});

api.post('/user', (req, res) => {
	var newUser = new User({ 
		name: req.body.user.name,
		lastname: req.body.user.lastname,
		id: req.body.user.id,
		cel: req.body.user.cel,
		email: req.body.user.email,
		likedMovies: req.body.user.likedMovies,
	});

	newUser.dudify(function(error, name) {
	  if (error) {
			return res
				.status(500)
				.json({ error: error.toString() });
		}

	  console.log('Your new name is ' + name);
	});

	newUser.save((error, user) => {
		if (error) {
			return res
				.status(500)
				.json({ error: error.toString() });
		}

		return res
			.status(200)
			.json({ User: user });
	});
});

api.put('/user', (req, res) => {
	User.findOne(
		{
			id: req.body.filter.id,
		},
	(error, user) => {
		if (error) {
			return res
				.status(500)
				.json({ error: error.toString() });
		}

		if (!user || user.length === 0) {
			return res
				.status(404)
				.json({ error: 'Not found'});
		}


		for (prop in req.body.user) {
			user[prop] = req.body.user[prop];
		}

		/*if (req.body.user.name) {
			user.name = req.body.user.name;
		}

		if (req.body.user.lastname) {
			user.lastname = req.body.user.lastname;
		}

		if (req.body.user.id) {
			user.id = req.body.user.id;
		}

		if (req.body.user.cel) {
			user.cel = req.body.user.cel;
		}

		if (req.body.user.email) {
			user.email = req.body.user.email;
		}

		if (req.body.user.likedMovies) {
			user.likedMovies = req.body.user.likedMovies;
		}	*/



		user.save((error, user) => {
			if (error) {
				return res
					.status(500)
					.json({ error: error.toString() });
			}

			return res
				.status(200)
				.json({ User: user });
		});			
	});
});

api.delete('/user/:id', (req, res) => {
	User.findOne(
		{ 
			id: req.params.id 
		}, 
	(error, user) => {
		if (error) {
			return res
				.status(500)
				.json({ error: error.toString() });
		}

		if (!user) {
			return res
				.status(404)
				.json({ error: 'Not found'});
		}

		user.remove((error, user) => {
			if (error) {
				return res
					.status(500)
					.json({ error: error.toString() });
			}

			return res
				.status(200)
				.json({ User: user });
		});
	});
});


api.post('/movie', (req, res) => {
});

module.exports = api;

