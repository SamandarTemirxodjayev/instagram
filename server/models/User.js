const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  follow: [{ type: mongoose.Schema.Types.ObjectId, ref: "Follow" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Followers" }]
});
const User = mongoose.model('MongoDB', userSchema);
module.exports = User;