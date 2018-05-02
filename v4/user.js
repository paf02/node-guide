var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/firstDB');

var userSchema = new Schema({
  name: { 
  	type: String, 
  	required: false,
  },
	lastname: { 
  	type: String, 
  	required: false,
  },
	id: { 
  	type: String, 
  	required: true,
  	unique: true,
  },
	cel: { 
  	type: String,
  	validate: {
      validator: val => {
        return /^\d{4}(-)?\d{4}$/.test(val);
      },
      message: '{VALUE} is not a valid phone number!'
    },

    required: [true, 'User phone number required']
  },
	email: { 
  	type: String, 
  	required: [true, 'Who doesnt has a email dahhh?'],
  },
	likedMovies: { 
  	type: Array,
  	required: false,
  },
  createdAt: {
  	type: Date,
  	default: Date.now
  }
});


userSchema.methods.dudify = function() {
  return this.name + '-dude';
};


var User = mongoose.model('User', userSchema, 'user');

module.exports = User;