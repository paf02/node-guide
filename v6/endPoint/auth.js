const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { getSequence, token } = require('./../miscellaneous');
//const {token} = require('jsonwebtoken');

module.exports = (api, wagner) => {
	//auth---------------------------------------------------------------

api.post('/login', wagner.invoke((User) => {
		return (req, res) => {
			User.findOne(
				{
					email: req.body.email
				},
				(error, user) => {
				if (error) {
					return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!user || user.length === 0) {
					return res
						.status(status.NOT_FOUND)
						.json({ error: 'Not found' });
				}

				user.comparePassword(req.body.password, (error, isMatch)=> {

					if(error){
						return res
						.status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
					}

					if (isMatch){
						return res.json({
							User: user,
							Token: token.sign(user)	
						});
					}

					return res 
					.status(status.NOT_FOUND)
					.json({ error: 'Authentication Failure'});	
				});				
			});
		}; 
	}));
	
	return api;
}
