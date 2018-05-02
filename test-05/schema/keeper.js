const { Schema } = require('mongoose');

const keeper = {
	_id: {
		type: String,
		required: true,
		unique: true
	},
  name: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
};

const keeperSchema = new Schema(keeper, {
  toObject: {
  	virtuals: true
  },
  toJSON: {
  	virtuals: true 
  }
});

keeperSchema.virtual('fullname').get(function() {  
  return this.name + ' ' + this.lastname;
});


module.exports = keeperSchema;