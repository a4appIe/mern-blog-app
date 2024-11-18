const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} = require("../controllers/blogController");
const verifyUser = require("../middlewares/auth");
const {
  postComment,
  deleteComment,
  editComment,
  likeComment,
} = require("../controllers/commentController");
const upload = require("../utils/multer");

router.post(
  "/blogs",
  verifyUser,
  upload.fields([{ name: "image" }, { name: "images" }]),
  createBlog
);

router.get("/blogs", getBlog);

router.get("/blogs/:blogId", getSingleBlog);

router.patch("/blogs/:id", verifyUser, upload.single("image"), updateBlog);

router.delete("/blogs/:id", verifyUser, deleteBlog);

router.post("/blogs/like/:id", verifyUser, likeBlog);

router.post("/blogs/comment/:id", verifyUser, postComment);

router.delete("/blogs/comment/:id", verifyUser, deleteComment);

router.patch("/blogs/edit-comment/:id", verifyUser, editComment);

router.patch("/blogs/like-comment/:id", verifyUser, likeComment);

module.exports = router;
