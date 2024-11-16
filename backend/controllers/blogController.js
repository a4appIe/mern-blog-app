const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const { uploadImage, deleteImage } = require("../utils/uploadImage");
const fs = require("fs");
const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 15 });

const createBlog = async (req, res) => {
  try {
    const creator = req.user;
    const image = req.file;
    const { title, description, draft } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const findUser = await User.findById(creator);
    if (!findUser) {
      res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
    const { secure_url, public_id } = await uploadImage(image.path);
    fs.unlinkSync(image.path);

    const blogId = `${title.toLowerCase().split(/[^a-zA-Z0-9]+/).join("-")}-${randomUUID()}`; 
    const blog = await Blog.create({
      title,
      description,
      draft,
      creator,
      image: secure_url,
      imageId: public_id,
      blogId,
    });
    await User.findByIdAndUpdate(creator, { $push: { blogs: blog._id } });
    return res.status(200).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false }).populate({
      path: "creator",
      select: "-password -blogs",
    });
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    console.log(blogId)
    const blog = await Blog.findOne({ blogId })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate({
        path: "creator",
        select: "name email",
      });
    console.log(blog);
    if (!blog) {
      console.log("not found");
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateBlog = async (req, res) => {
  try {
    const creator = req.user;
    const { id } = req.params;
    const { title, description, draft } = req.body;
    const blog = await Blog.findOne({blogId: id});
    if (!blog) {
      return res.status(500).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (!(creator == blog.creator)) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized",
      });
    }

    if(image){
      await deleteImage(blog.imageId)
      const { secure_url, public_id } = await uploadImage(image.path);
      blog.image = secure_url;
      blog.imageId = public_id;
      fs.unlinkSync(image.path);
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.draft = draft || blog.draft;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = req.user;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(500).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (!(creator == blog.creator)) {
      return res.status(500).json({
        success: false,
        message: "You are not authorized",
      });
    }
    await deleteImage(blog.imageId);
    await Blog.deleteOne({ _id: id });
    await User.findByIdAndUpdate(creator, { $pull: { blogs: id } });
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = req.user;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(500).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (!blog.likes.includes(creator)) {
      await Blog.updateOne({ _id: id }, { $push: { likes: creator } });
      res.status(200).json({
        success: true,
        message: "Blog liked successfully",
        isLiked: true,
      });
    } else {
      await Blog.updateOne({ _id: id }, { $pull: { likes: creator } });
      res.status(200).json({
        success: true,
        message: "Blog disliked successfully",
        isLiked: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
};
