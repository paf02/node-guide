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
};

module.exports = miscellaneous;