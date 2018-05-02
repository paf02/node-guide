const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { getSequence } = require('./../miscellaneous');

module.exports = (api, wagner) => {
	//user---------------------------------------------------------------

api.get('/user', wagner.invoke((User) => {
		return (req, res) => {
			User.find((error, user) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!user || user.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				return res
					.status(status.OK)
					.json({ User: user });					
			});
		}; 
	}));

	api.get('/user/id/:id', wagner.invoke((User) => {
		return (req, res) => {
			User.findOne(
				{
					id: req.params.id,
				},
			(error, user) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!user || user.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				return res
					.status(status.OK)
					.json({ User: user });					
			});
		}; 
	}));

	api.get('/user/email/:email', wagner.invoke((User) => {
		return (req, res) => {
			User.findOne(
				{
					email: req.params.email,
				},
			(error, user) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!user || user.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				return res
					.status(status.OK)
					.json({ User: user });					
			});
		}; 
	}));

	api.post('/user', wagner.invoke((User, Counter) => {
		return (req, res) => {
			getSequence(Counter, counterId.user, (error, int) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				const newUser = new User({
					_id: `${appCodes.user}${int}`,
					name: req.body.name,
					lastname: req.body.lastname,
					id: req.body.id,
					cel: req.body.user.cel,
					email: req.body.email,
					likedMovies: req.body.user.likedMovies,
					password: req.body.password
				});
				


				newUser.save((error, user) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ User: newUser.toJSON() });
				});
			});
		}; 
	}));

	api.put('/user', wagner.invoke((User) => {
		return (req, res) => {
			User.findOne(
				{
					id: req.body.filter.id,
				},
			(error, user) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!user || user.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

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

				user.save((error, user) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ User: user });
				});			
			});
		}; 
	}));

	api.delete('/user/:id', wagner.invoke((User) => {
		return (req, res) => {
			User.findOne(
				{ 
					id: req.params.id 
				}, 
			(error, user) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!user) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				user.remove((error, user) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ User: user });
				});
			});
		}; 
	}));
	



	return api;
}
