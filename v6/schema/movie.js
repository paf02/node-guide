const { Schema } = require('mongoose');

const movie = {
  _id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: false
  },

  year:{
    type:String,
    required:false
  }
};


module.exports = new Schema(movie);