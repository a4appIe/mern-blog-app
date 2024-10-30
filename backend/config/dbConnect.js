const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/blogDatabase");
      console.log("DB connected successfully");
    } catch (error) {
      console.log("Error in connecting DB");
    }
  };
  
  module.exports = dbConnect;