const { Schema } = require('mongoose');

const user = {
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
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

    required: [false, 'User phone number required']
  },
  email: { 
    type: String, 
    required: [true, 'Who doesnt has a email dahhh?'],
    unique: true
  },
  likedMovies: { 
    type: Array,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: false
  }
};

const userSchema = new Schema(user);

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = userSchema;
