const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  location: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["designer", "recruiter", "explorer"],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
