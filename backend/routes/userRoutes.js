const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/signup", createUser);

router.post("/signin", loginUser)

router.get("/users", getUsers);

router.get("/users/:id", getSingleUser);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
