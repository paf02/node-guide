const status = require('http-status');

const { counterId, appCodes } = require('./../config');

module.exports = (api, wagner) => {
	//animal---------------------------------------------------------------

	api.get('/animal', wagner.invoke((Animal) => {
		return (req, res) => {

			Animal.find((error, animal) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!animal || animal.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Animal: animal });					
			}); 
		}; 
	}));

	return api;
}
