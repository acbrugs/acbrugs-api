const mongoose = require('mongoose');

const rugTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    imageUrl: String
  },
  {
    timestamps: true, // This will automatically add `createdAt` and `updatedAt` fields
  }
);

const RugType = mongoose.model('RugType', rugTypeSchema);

module.exports = RugType;
