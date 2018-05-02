const {sign, verify} = require('jsonwebtoken');

const {token:tokenConfig} = require('./config');

const miscellaneous = { 
	prop: { },
	getSequence: (Counter, filter, cb) => {
		Counter.findOneAndUpdate(
			{ _id: filter }, 
			{ $inc: { sequenceValue: 1 } }, 
			(err, counter) => {
			if (err) {
				return cb(err);
			}

  		return cb(null, counter.sequenceValue);
  	});
	},

	token: {
		sign:(userID) => {
			return sign({id: userID},tokenConfig.secret,{
				expiresIn: tokenConfig.expiresIn,
			});
		},

		verify: (token, cb) =>{
			verify(token, tokenConfig.secret, cb);
		},

		getToken: (req) =>{
			return req.body.token || req.query.token || req.headers['x-acess-token'] || req.headers.authorization;
		}

	}



};

module.exports = miscellaneous;