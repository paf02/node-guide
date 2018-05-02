const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { getSequence } = require('./../miscellaneous');

module.exports = (api, wagner) => {
	//keeper---------------------------------------------------------------

	api.get('/keeper', wagner.invoke((Keeper) => {
		return (req, res) => {

			Keeper.find((error, keeper) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!keeper || keeper.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Keeper: keeper });					
			}); 
		}; 
	}));

	api.get('/keeper/_id/:_id', wagner.invoke((Keeper) => {
		return (req, res) => {

			Keeper.findOne(
				{
					_id: req.params._id,
				},
			(error, keeper) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!keeper || keeper.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Keeper: keeper });					
			}); 
		}; 
	}));

	api.post('/keeper', wagner.invoke((Keeper, Counter) => {
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
					name: req.body.keeper.name,
					lastname: req.body.keeper.lastname
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
		}
	}));
	
	api.put('/keeper', wagner.invoke((Keeper) => {
		return (req, res) => {
			
			Keeper.findOne(
				{ 
					_id: req.body.filter._id 
				}, 
			(error, keeper) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!keeper) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				if (req.body.keeper.name) {
					keeper.name = req.body.name;
				}

				if (req.body.keeper.lastname) {
					keeper.lastname = req.body.lastname;
				}

				keeper.save((error, keeper) => {
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
			});		
		}
	}));

	api.delete('/keeper', wagner.invoke((Keeper) => {
		return (req, res) => {

			Keeper.findOne(
				{ 
					'internal.tracking': req.params.tracking 
				}, 
			(error, keeper) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!keeper) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				keeper.remove((error, keeper) => {
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
			});
		}
	}));

	return api;
}
