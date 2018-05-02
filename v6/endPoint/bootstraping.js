const status = require('http-status');

const { getSequence } = require('./../miscellaneous');
const { counterId, appCodes } = require('./../config');

module.exports = (api, wagner) => {
	//bootstraping------------------------------------------------------------------


api.post('/bootstrapingUser', wagner.invoke((User, Counter) => {
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
					cel: req.body.cel,
					email: req.body.email,
					likedMovies: req.body.likedMovies,
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


api.post('/bootstrapingMovie', wagner.invoke((Movie, Counter) => {
		return (req, res) => {
			getSequence(Counter, counterId.movie, (error, int) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				const newMovie = new Movie({
					_id: `${appCodes.movie}${int}`,
					title: req.body.title,
					year: req.body.year,
					genre: req.body.genre
				});

				newMovie.save((error, movie) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Movie: movie});
				});
			});
		}; 
	}));


	api.post('/bootstrapingCounter', wagner.invoke((Counter) => {
		return (req, res) => { 
			let newCounter = new Counter({ 
				_id: req.body._id,
				sequenceValue: req.body.sequenceValue
			});

			newCounter.save((error, counter) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Counter: counter });
			});
		}; 
	}));

	api.delete('/bootstrapingUser', wagner.invoke((User) => {
		return (req, res) => { 
			User.remove((error, user) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ User: user });
			});
		}; 
	}));


	api.delete('/bootstrapingMovie', wagner.invoke((Movie) => {
		return (req, res) => { 
			Movie.remove((error, movie) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Movie: movie });
			});
		}; 
	}));

	api.delete('/bootstrapingCounter', wagner.invoke((Counter) => {
		return (req, res) => { 
			Counter.remove((error, counter) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				return res
					.status(status.OK)
					.json({ Counter: counter });
			});
		}; 
	}));


	return api;
}