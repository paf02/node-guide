const { Router } = require('express');
const { json } = require('body-parser');

const users = require('./users');
const {  maxFileSize } = require('./config');

const api = Router();

api.use(json({ limit: maxFileSize }));


//localhost 5000 


api.get('/user', (req, res) => {
	res.json({ User: users });
});

api.get('/user/id/:id', (req, res) => {
	let user = users.find((us) => {
		return (us.id === req.params.id);
	});

	if (!user || user.length === 0) {
		return res
			.status(404)
			.json({ error: 'Not found'});
	}

	res.json({ User: user });
});

api.get('/user/email/:email', (req, res) => {
	let user = users.find((us) => {
		return (us.email === req.params.email);
	});

	if (!user || user.length === 0) {
		return res
			.status(404)
			.json({ error: 'Not found'});
	}

	res.json({ User: user });
});

api.post('/user', (req, res) => {
	let error = null
			newUser = null;

	try {
		newUser = {
			name: req.body.user.name,
			lastname: req.body.user.lastname,
			id: req.body.user.id,
			cel: req.body.user.cel,
			email: req.body.user.email,
			likedMovies: req.body.user.likedMovies,
		};

		if (!newUser.email) {
			error = 'no key value';
		}
	} catch(e) {
		error = e;
	}

	if (error) {
		return res
			.status(500)
			.json({ error: error.toString() });
	}

	users.push(newUser);

	res.json({ User: newUser });
});

api.put('/user', (req, res) => {
	let error = null,
			user;

	try {
		user = users.find((us) => {
			return (us.id === req.body.filter.id);
		});
	} catch(e) {
		error = e;
	}

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

	try {
		if (req.body.user.name) {
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
		}		
	} catch(e) {
		error = e;
	}

	if (error) {
		return res
			.status(500)
			.json({ error: error.toString() });
	}

	res.json({ User: user });
});

api.delete('/user/:id', (req, res) => {
	let userId = users.findIndex((us) => {
		return (us.id === req.params.id);
	});

	let user = users[userId];

	if (!user || user.length === 0) {
		return res
			.status(404)
			.json({ error: 'Not found'});
	}

	users.splice(userId, 1);

	res.json({ User: user });
});

module.exports = api;

