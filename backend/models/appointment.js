const mongoose = require("mongoose");
const formatDate = require("../utils/formatDate");

const appointemntSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  weight:{
    type:Number
  },
  issue:{
    type:String,
    required:true
  },
  preMedication:{
    type:String
  }
})


const Appointment = mongoose.model("Appointment", appointemntSchema);

module.exports = Appointment;
