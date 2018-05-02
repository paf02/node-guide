const status = require('http-status');

module.exports = (api, wagner) => {
	//counter------------------------------------------------------------------

	api.get('/counter', wagner.invoke((Counter) => {
		return (req, res) => {
			
			Counter.find((error, counter) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!counter || counter.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				res.json({ Counter: counter }); 
			}); 
		}; 
	}));

	api.post('/counter', wagner.invoke((Counter) => {
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
		}
	}));

	api.put('/counter', wagner.invoke((Counter) => {
		return (req, res) => {

			Counter.findOne(
				{ 
					_id: req.body._id 
				}, 
			(error, counter) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ 
							error: error.toString(),
							name: error.name,
							message: error.message,
						});
				}

				if (!counter) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found'});
				}

				counter.sequenceValue++;

				// section.update(updateObj, function(error, section) {
				counter.save((error, counter) => {
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
			});		
		}
	}));

	api.delete('/counterAll', wagner.invoke((Counter) => {
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
		}
	}));	

	return api;
}