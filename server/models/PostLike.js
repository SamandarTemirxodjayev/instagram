const mongoose = require('mongoose');

const postLikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },

}, { timestamps: true }, { collection: "Posts" });
const PostLike = mongoose.model('PostLike', postLikeSchema);
module.exports = PostLike;