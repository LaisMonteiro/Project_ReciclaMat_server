const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  nameCreator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  message: {
    type: String,
    maxlength: 1000
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  // (reference to post id)
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate'
  }
});
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
