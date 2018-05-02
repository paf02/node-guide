

const { token: tokenConfig } = require('./config');

let _prop = {
	// token: {
	// 	blacklist: [],
	// }
};

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
		// blacklist: {
		// 	is: (currentToken) => {
		// 		return _prop.token.blacklist.find((tok) => {
		// 			return currentToken == tok;
		// 		});
		// 	},

		// 	push: (currentToken) => {
		// 		_prop.token.blacklist.push(currentToken);
		// 	},

		// 	pull: (currentToken) => {
		// 		let indx =  _prop.token.blacklist.findIndex((tok) => {
		// 			return currentToken == tok;
		// 		});

		// 		if (indx > -1) {
		// 			_prop.token.blacklist.splice(indx, 1);
		// 		}
		// 	},

		// 	garbageCollector: () => {
		// 		window.setInterval(() => {
		// 			_prop.token.blacklist.forEach((tok) => {
		// 				miscellaneous.token.verify(tok, (error) => {      
		// 		      if (error) {
		// 		      	miscellaneous.token.blacklist.pull(tok);
		// 		      }
		// 		    });
		// 			});

		// 		}, 5000); //86400000 = 24*60*60*1000 = 24h
		// 	},
		// },

		sign: (user) => {
			return sign(user, tokenConfig.secret, {
        expiresIn: tokenConfig.expiresIn,
      });
		},

		verify: (token, cb) => {
			verify(token, tokenConfig.secret, cb);
		},

		getToken: (req) => {
			return req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
		}
	}
};

module.exports = miscellaneous;