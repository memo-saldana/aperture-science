const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name missing"]
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Category', projectSchema);