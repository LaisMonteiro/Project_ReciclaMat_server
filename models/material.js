const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  item: {
    type: String,
    enum: ['glass bottles', 'newspaper', 'white paper', 'cartboard', 'aluminum', 'plastic bottles']
  }
});
const Material = mongoose.model('Material', MaterialSchema);
module.exports = Material;
