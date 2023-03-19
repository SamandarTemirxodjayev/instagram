const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  pathFile: {
    type: String
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "PostLike" }]
}, { timestamps: true });
const Post = mongoose.model('Posts', postSchema);
module.exports = Post;