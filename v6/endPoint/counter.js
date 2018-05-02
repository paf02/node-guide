const status = require('http-status');

module.exports = (api, wagner) => {
	//counter------------------------------------------------------------------


	api.get('/counter', wagner.invoke((Counter) => {
		return (req, res) => {
			Counter.find((error, counter) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!counter || counter.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				return res
					.status(status.OK)
					.json({ Counter: counter });					
			});
		}; 
	}));


	return api;
}