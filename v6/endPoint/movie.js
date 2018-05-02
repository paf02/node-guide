const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { getSequence } = require('./../miscellaneous');


module.exports = (api, wagner) => {
	//movie------------------------------------------------------------------

	api.get('/movie', wagner.invoke((Movie) => {
		return (req, res) => {
			Movie.find((error, movie) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!movie || movie.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				return res
					.status(status.OK)
					.json({ Movie: movie });					
			});
		}; 
	}));



	api.get('/movie/title/:title', wagner.invoke((Movie) => {
		return (req, res) => {
			Movie.findOne(
				{
					title: req.params.title,
				},
			(error, movie) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!movie || movie.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				return res
					.status(status.OK)
					.json({ Movie: movie });					
			});
		}; 
	}));



	api.post('/movie', wagner.invoke((Movie, Counter) => {
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
					genre: req.body.genre,
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


	api.put('/movie', wagner.invoke((Movie) => {
		return (req, res) => {
			Movie.findOne(
				{
					title: req.body.filter.title,
				},
			(error, movie) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!movie || movie.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				
				if (req.body.movie.title) {
					movie.title = req.body.movie.title;
				}	

				if (req.body.movie.genre) {
					movie.genre = req.body.movie.genre;
				}

				
				if (req.body.movie.year) {
					movie.year = req.body.movie.year;
				}	

				movie.save((error, movie) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Movie: movie });
				});			
			});
		}; 
	}));




	return api;
}