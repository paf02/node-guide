const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { getSequence } = require('./../miscellaneous');

module.exports = (tiger, wagner) => {
	//tiger---------------------------------------------------------------

	tiger.get('/', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.find(
				{
					species : 'tigre'
				},
				(error, tiger) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!tiger || tiger.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Tiger: tiger });					
			}); 
		}; 
	}));

	tiger.get('/_id/:_id', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.findOne(
				{
					species : 'tigre',
					_id: req.params._id
				},
				(error, tiger) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!tiger || tiger.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Tiger: tiger });					
			}); 
		}; 
	}));

	tiger.get('/name/:name', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.find(
				{
					species : 'tigre',
					name: req.params.name
				},
				(error, tiger) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!tiger || tiger.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Tiger: tiger });					
			}); 
		}; 
	}));

	tiger.post('/', wagner.invoke((Animal, Counter) => {
		return (req, res) => {
			getSequence(Counter, counterId.animal, (error, int) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				const newTiger = new Animal({
					_id: `${appCodes.animal}${int}`,
					name: req.body.tiger.name,
					species: req.body.tiger.species,
					keeper: req.body.tiger.keeper
				});

				newTiger.save((error, tiger) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Tiger: tiger });
				});
			});
		}; 
	}));

	tiger.put('/', wagner.invoke((Animal) => {
		return (req, res) => {
			
			Animal.findOne(
				{ 
					_id: req.body.filter._id
				}, 
			(error, tiger) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!tiger) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				if (req.body.tiger.name) {
					tiger.name = req.body.tiger.name;
				}

				if (req.body.tiger.species) {
					tiger.species = req.body.tiger.species;
				}

				if (req.body.tiger.keeper) {
					tiger.keeper = req.body.tiger.keeper;
				}

				tiger.save((error, tiger) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ 
								error: error.toString(),
								name: error.name,
								message: error.message,
							});
					} 

					return res
						.status(status.OK)
						.json({ Tiger: tiger });
				});
			});		
		}
	}));

	tiger.delete('/', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.findOne(
				{ 
					_id: req.body.filter._id
				}, 
			(error, tiger) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!tiger) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				tiger.remove((error, tiger) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ 
								error: error.toString(),
								name: error.name,
								message: error.message,
							});
					}

					return res
						.status(status.OK)
						.json({ Tiger: tiger });
				});
			});
		}
	}));

	return tiger;
}