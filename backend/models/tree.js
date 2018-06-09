const mongoose = require('mongoose');

const TreeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  factories: [ {
      title: {
          type: String,
          required: false,
      },
      numNodes: {
          type: Number,
          required: true,
          min: 0,
          max: 15,
      },
      rangeMin: {
          type: Number,
          required: true,
      },
      rangeMax: {
          type: Number,
          required: true,
      }
  } ]
});

module.exports = mongoose.model('Tree', TreeSchema);