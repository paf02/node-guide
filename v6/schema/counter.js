const { Schema } = require('mongoose');

const counter = {
  _id: {
		type: String,
		required: true
	},
  sequenceValue: {
		type: Number,
		required: true
	}
};

module.exports = new Schema(counter);