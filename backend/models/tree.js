const mongoose = require('mongoose');

const factoriesSchema = new mongoose.Schema({
    factTitle: {
        type: String,
        required: false,
    },
    nodes: {
        type: [Number],
        required: true,
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
});

const TreeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  factories: [factoriesSchema]
});

module.exports = mongoose.model('Tree', TreeSchema);