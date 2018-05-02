const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { getSequence } = require('./../miscellaneous');

module.exports = (api, wagner) => {
	//bootstraping---------------------------------------------------------------

	api.post('/bootstrapingKeeper', wagner.invoke((Keeper, Counter) => {
		return (req, res) => {
			getSequence(Counter, counterId.keeper, (error, int) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				const newKeeper = new Keeper({
					_id: `${appCodes.keeper}${int}`,
					name: req.body.name,
					lastname: req.body.lastname
				});

				newKeeper.save((error, keeper) => {
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
						.json({ Keeper: newKeeper.toJSON() });
				});
			});
		}; 
	}));

	api.post('/bootstrapingAnimal', wagner.invoke((Animal, Counter) => {
		return (req, res) => {
			getSequence(Counter, counterId.animal, (error, int) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				const newAnimal = new Animal({
					_id: `${appCodes.animal}${int}`,
					name: req.body.name,
					species: req.body.species
				});

				newAnimal.save((error, animal) => {
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
						.json({ Animal: newAnimal.toJSON() });
				});
			});
		}; 
	}));

	api.post('/bootstrapingCounter', wagner.invoke((Counter) => {
		return (req, res) => { 
			const newCounter = new Counter({ 
				_id: req.body._id,
				sequenceValue: req.body.sequenceValue
			});

			newCounter.save((error, counter) => {
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
					.json({ Counter: counter });
			});
		}; 
	}));

	api.delete('/bootstrapingKeeper', wagner.invoke((Keeper) => {
		return (req, res) => { 
			Keeper.remove((error, keeper) => {
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
					.json({ Keeper: keeper });
			});
		}; 
	}));

	api.delete('/bootstrapingAnimal', wagner.invoke((Animal) => {
		return (req, res) => { 
			Animal.remove((error, animal) => {
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
					.json({ Animal: animal });
			});
		}; 
	}));

	api.delete('/bootstrapingCounter', wagner.invoke((Counter) => {
		return (req, res) => { 
			Counter.remove((error, counter) => {
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
					.json({ Counter: counter });
			});
		}; 
	}));

	return api;
}
