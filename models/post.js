const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  kind: {
    type: String,
    emun: ['produtos', 'doar', 'receber']
  },
  material: {
    type: String,
    enum: ['glass', 'paper', 'plastic', 'metal', 'wood', 'fabric']
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ]
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
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

PostSchema.index({ location: '2dsphere' });
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
