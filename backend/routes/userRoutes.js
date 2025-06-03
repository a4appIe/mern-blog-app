const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  googleAuth,
  verifyEmail,
} = require("../controllers/userController");

router.post("/signup", createUser);

router.post("/signin", loginUser)

router.get("/users", getUsers);

router.get("/users/:id", getSingleUser);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.get("/verify-email/:token", verifyEmail);

router.post("/google-auth", googleAuth);

module.exports = router;
