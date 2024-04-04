const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  degree:{type:String,required:true},
  hospital:{type:String,required:true},
  speciality:{type:String,required:true},
  contact:{
    email: {
      type: String,
      required: true,
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

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
