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

donationSchema.statics.getAmountForProject = async function(projectId) {
  const data = await this.aggregate([{
    $match: {
      project: projectId,
      status: 'Paid'
    },
  }, {
    $group: {
      _id: null,
      total: {
        $sum: {$multiply: ['$amount', 0.95]}
      },
    },
  }]).exec();

  console.log('data :>> ', data);

  return data.length > 0 ? data[0].total : 0;
}

module.exports = mongoose.model('Donation', donationSchema);