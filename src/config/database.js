const mongoose = require("mongoose");

const connectDB = async()=>{
  await mongoose.connect("mongodb+srv://praveen_revatagaon:Reva_123@devtinder.lriqpi3.mongodb.net/devTinder");
}

module.exports = connectDB;