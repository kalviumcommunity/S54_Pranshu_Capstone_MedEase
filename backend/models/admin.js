const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: {
    type: Date,
    default: formatDate,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
