const mongoose = require('mongoose');

const rugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rugTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RugType',
    required: true,
  }
}, {
  timestamps: true,
});
rugSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

rugSchema.set('toJSON', {
  virtuals: true,
});

const Rug = mongoose.model('Rug', rugSchema);

module.exports = Rug;
