const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  kind: {
    type: String,
    emun: ['produtos', 'doar', 'receber']
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Material'
    // (reference to selected material)
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{ type: Number, min: -180, max: 180 }]
  },
  description: {
    type: String,
    maxlength: 2500
  },
  image: {
    type: String
  },
  userCreator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // (reference to post creator id)
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate'
  }
});

PostSchema.index({ location: '2dsphere' });
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
