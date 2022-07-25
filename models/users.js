// modules
const mongoose = require('mongoose');

// schema definitions
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true }
});

// creating user
const User = mongoose.model('user', UserSchema);

// exporting
module.exports = User;