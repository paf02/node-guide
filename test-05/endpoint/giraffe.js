const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { getSequence } = require('./../miscellaneous');

module.exports = (giraffe, wagner) => {
	//giraffe---------------------------------------------------------------

	giraffe.get('/', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.find(
				{
					species : 'jirafa'
				},
				(error, giraffe) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!giraffe || giraffe.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Jirafa: giraffe });					
			}); 
		}; 
	}));

	giraffe.get('/_id/:_id', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.findOne(
				{
					species : 'jirafa',
					_id: req.params._id
				},
				(error, giraffe) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!giraffe || giraffe.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Jirafa: giraffe });					
			}); 
		}; 
	}));

	giraffe.get('/name/:name', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.find(
				{
					species : 'jirafa',
					name: req.params.name
				},
				(error, giraffe) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!giraffe || giraffe.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Jirafa: giraffe });					
			}); 
		}; 
	}));

	giraffe.post('/', wagner.invoke((Animal, Counter) => {
		return (req, res) => {
			getSequence(Counter, counterId.animal, (error, int) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				const newJirafa = new Animal({
					_id: `${appCodes.animal}${int}`,
					name: req.body.giraffe.name,
					species: req.body.giraffe.species,
					keeper: req.body.giraffe.keeper
				});

				newJirafa.save((error, giraffe) => {
					if (error) {
						return res
							.status(status.INTERNAL_SERVER_ERROR)
							.json({ error: error.toString() });
					}

					return res
						.status(status.OK)
						.json({ Jirafa: giraffe });
				});
			});
		}; 
	}));

	giraffe.put('/', wagner.invoke((Animal) => {
		return (req, res) => {
			
			Animal.findOne(
				{ 
					_id: req.body.filter._id
				}, 
			(error, giraffe) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!giraffe) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				if (req.body.giraffe.name) {
					giraffe.name = req.body.giraffe.name;
				}

				if (req.body.giraffe.species) {
					giraffe.species = req.body.giraffe.species;
				}

				if (req.body.giraffe.keeper) {
					giraffe.keeper = req.body.giraffe.keeper;
				}

				giraffe.save((error, giraffe) => {
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
						.json({ Jirafa: giraffe });
				});
			});		
		}
	}));

	giraffe.delete('/', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.findOne(
				{ 
					_id: req.body.filter._id
				}, 
			(error, giraffe) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!giraffe) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				giraffe.remove((error, giraffe) => {
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
						.json({ Jirafa: giraffe });
				});
			});
		}
	}));

	return giraffe;
}
