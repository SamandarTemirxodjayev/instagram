const mongoose = require('mongoose');

const FollewsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const Follows = mongoose.model('Follows', FollewsSchema);
module.exports = Follows;