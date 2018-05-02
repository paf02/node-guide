const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { getSequence } = require('./../miscellaneous');

module.exports = (lion, wagner) => {
	//lion---------------------------------------------------------------

	lion.get('/', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.find(
				{
					species : 'leon'
				},
				(error, lion) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!lion || lion.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Lion: lion });					
			}); 
		}; 
	}));

	lion.get('/_id/:_id', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.findOne(
				{
					species : 'leon',
					_id: req.params._id
				},
				(error, lion) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!lion || lion.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Lion: lion });					
			}); 
		}; 
	}));

	lion.get('/name/:name', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.find(
				{
					species : 'leon',
					name: req.params.name
				},
				(error, lion) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!lion || lion.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Lion: lion });					
			}); 
		}; 
	}));

	lion.post('/', wagner.invoke((Animal, Counter) => {
		return (req, res) => {
			getSequence(Counter, counterId.animal, (error, int) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				const newLion = new Animal({
					_id: `${appCodes.animal}${int}`,
					name: req.body.lion.name,
					species: req.body.lion.species,
					keeper: req.body.lion.keeper
				});

				newLion.save((error, lion) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Lion: lion });
				});
			});
		}; 
	}));

	lion.put('/', wagner.invoke((Animal) => {
		return (req, res) => {
			
			Animal.findOne(
				{ 
					_id: req.body.filter._id
				}, 
			(error, lion) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!lion) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				if (req.body.lion.name) {
					lion.name = req.body.lion.name;
				}

				if (req.body.lion.species) {
					lion.species = req.body.lion.species;
				}

				if (req.body.lion.keeper) {
					lion.keeper = req.body.lion.keeper;
				}

				lion.save((error, lion) => {
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
						.json({ Lion: lion });
				});
			});		
		}
	}));

	lion.delete('/', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.findOne(
				{ 
					_id: req.body.filter._id
				}, 
			(error, lion) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!lion) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				lion.remove((error, lion) => {
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
						.json({ Lion: lion });
				});
			});
		}
	}));

	return lion;
}