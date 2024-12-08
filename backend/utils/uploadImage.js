const cloudinary = require("cloudinary").v2;

const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "blog_app",
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteImage = async (imageId) => {
  try {
    await cloudinary.uploader.destroy(imageId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadImage, deleteImage };
