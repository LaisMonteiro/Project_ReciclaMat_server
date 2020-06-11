const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userCreator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  message: {
    type: String,
    maxlength: 1000
  },
  // post: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Post'
  // },
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
});
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
