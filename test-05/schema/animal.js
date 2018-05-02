const { Schema } = require('mongoose');

const animal = {
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true,
    enum: ['jirafa', 'tigre', 'leon']
  },
  keeper: {
    list: [{
      ref: 'Keeper',
      type: String
    }]
  }
};

const animalSchema = new Schema(animal, {
  toObject: {
  	virtuals: true
  },
  toJSON: {
  	virtuals: true 
  }
});

module.exports = animalSchema;