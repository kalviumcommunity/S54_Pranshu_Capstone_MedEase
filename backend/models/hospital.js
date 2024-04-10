const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  contact:{
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    }},
  created: {
    type: Date,
    default: formatDate,
  }
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
