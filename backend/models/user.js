const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    required: true,
  },
  created: {
    type: Date,
    default: formatDate,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
