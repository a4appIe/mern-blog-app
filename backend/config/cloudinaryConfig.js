const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = async () => {
  try {
    await cloudinary.config({
      cloud_name: "da84typbb",
      api_key: "165176457511347",
      api_secret: "UCZOPXMe34_jO-byqU-Ak9VD-6c",
    });
    console.log("Cloudinary config successful")
  } catch (error) {
    console.log("Error: ", error)
  }
};

module.exports = cloudinaryConfig;