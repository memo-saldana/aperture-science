const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title missing."],
  },
  schedule: {
    type: String,
    required: [true, "Schedule missing."],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category missing."],
  },
  picture: {
    type: String,
  },
  goal: {
    type: Number,
    required: [true, "Goal missing."],
  },
  campaignStart: {
    type: Date,
    required: [true, "Campaign start missing."],
  },
  campaignEnd: {
    type: Date,
    required: [true, "Campaign end missing."],
  },
})

module.exports = mongoose.model('Project', projectSchema);