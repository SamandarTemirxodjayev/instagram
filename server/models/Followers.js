const mongoose = require('mongoose');

const FollewersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const Followers = mongoose.model('Followers', FollewersSchema);
module.exports = Followers;