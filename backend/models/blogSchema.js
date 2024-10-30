const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    draft: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;