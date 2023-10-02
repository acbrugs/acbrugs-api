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

rugTypeSchema.pre('save', function(next) {
  this.slug = generateSlug(this.name);
  next();
});

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

rugTypeSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

rugTypeSchema.set('toJSON', {
  virtuals: true,
});

const RugType = mongoose.model('RugType', rugTypeSchema);

module.exports = RugType;
