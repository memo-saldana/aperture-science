const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Donator missing"]
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, "Project missing"]
  },
  amount: {
    type: Number,
    required: [true, "Amount missing"]
  },
  status: {
    type: String,
    enum: ['Created', 'Paid', 'Cancelled'],
    default: 'Created'
  },
  stripeSessionId: {
    type: String,
    required: [true, "Stripe session id missing"],
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Donation', donationSchema);