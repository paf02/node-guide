const status = require('http-status');

const { counterId, appCodes } = require('./../config');
const { token } = require('./../miscellaneous');
//const {token} = require('jsonwebtoken');


module.exports = (api, wagner) => {
	//user---------------------------------------------------------------

api.use((req, res, next)=>{
	const currentToken = token.getToken(req);

	if(currentToken){
		token.verify(currentToken, (error, decoded)=> {
			if(error){
				return res
				.status(status.UNAUTHORIZED)
				.json({
					error: 'Failed to authentica token',
					message: error.toString(),
				});
			}
			req.decoded = decoded;
			next();
		});
	}else{
		return res 
		.status(status.FORBIDDEN)
		.json({
				error: 'Not Login',
			});
	}

}); 

return api;
}
