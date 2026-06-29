// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // For email/password signup
  googleId: { type: String }, // For Google auth
  wishlist: [{ type: Object }] // Array to store product objects
});

module.exports = mongoose.model('User', userSchema);