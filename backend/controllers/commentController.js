const Blog = require("../models/blogSchema");
const Comment = require("../models/commentSchema");

const postComment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const creator = req.user;
    const { comment } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(500).json({
        success: false,
        message: "Blog not found",
      });
    }
    const newComment = await Comment.create({
      comment,
      blog: blog,
      user: creator,
    }).then((comment) =>
      comment.populate({
        path: "user",
        select: "name email",
      })
    );
    console.log(newComment);

    await Blog.updateOne({ _id: id }, { $push: { comments: newComment._id } });
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = req.user;
    const comment = await Comment.findById(id);
    const blog = await Blog.findById(comment.blog);
    if (!comment) {
      return res.status(500).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (!blog) {
      return res.status(500).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (!(creator == comment.user) && !(creator == blog.creator)) {
      return res.status(500).json({
        success: false,
        message: "You are not authorized",
      });
    }
    await Comment.deleteOne({ _id: id });
    await Blog.findByIdAndUpdate(comment.blog, { $pull: { comments: id } });

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
    // if(!(creator == blog.creator)){
    //   return res.status(500).json({
    //     success: false,
    //     message: "You are not authorized",
    //   });
    // }

    // await Blog.updateOne(
    //   { _id: id },
    //   { $push: { comments: newComment._id } }
    // );
    // res.status(200).json({
    //   success: true,
    //   message: "Comment added successfully",
    // });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = req.user;
    const { updatedCommentContent } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(500).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (!(comment.user == creator)) {
      res.status(400).json({
        success: false,
        message: "You are not authorize",
      });
    }
    await Comment.findByIdAndUpdate(id, { comment: updatedCommentContent });
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(500).json({
        success: false,
        message: "Comment not found",
      });
    }
    console.log(comment.likes);
    if (!comment.likes.includes(userId)) {
      await Comment.updateOne({ _id: id }, { $push: { likes: userId } });
      res.status(200).json({
        success: true,
        message: "Comment liked successfully",
      });
    } else {
      await Comment.updateOne({ _id: id }, { $pull: { likes: userId } });
      res.status(200).json({
        success: true,
        message: "Comment disliked successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const addNestedComment = async (req, res) => {
  try {
    const userId = req.user;
    const { id: blogId, parentCommentId } = req.params;
    const { reply } = req.body;
    const comment = await Comment.findById(parentCommentId);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(500).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (!comment) {
      return res.status(500).json({
        success: false,
        message: "Parent comment not found",
      });
    }
    const newReply = await Comment.create({
      comment: reply,
      blog: blogId,
      user: userId,
      parentComment: parentCommentId,
    }).then((reply) => {
      return reply.populate({
        path: "user",
        select: "name email",
      });
    });
    
    await Comment.findByIdAndUpdate(parentCommentId, {
      $push: { replies: newReply._id },
    });
    return res.status(200).json({
      success: true,
      message: "Reply added successfully",
      newReply,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  postComment,
  deleteComment,
  editComment,
  likeComment,
  addNestedComment,
};
