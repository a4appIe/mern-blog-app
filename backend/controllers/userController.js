const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const { generateJWT } = require("../utils/generateToken");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exist.",
        success: false,
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hash });
    let token = await generateJWT({
      email: newUser.email,
      id: newUser._id,
    });
    // console.log(token);
    return res.status(200).json({
      message: "User created successfully",
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    const user = await User.findOne({ email }).populate();
    if (!user) {
      return res.status(500).json({
        message: "User not found",
        success: false,
      });
    }
    let token = await generateJWT({
      email: user.email,
      id: user._id,
    });
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User login successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate({
      path: "blogs",
      select: "-creator",
    });
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id).populate({
      path: "blogs",
    });
    if (!user) {
      return res.status(200).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let { id } = req.params;
    let newUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { name, email, password },
      },
      { new: true }
    );
    if (!newUser) {
      return res.status(200).json({
        message: "User not found",
        success: false,
      });
    }
    // users[userIndex] = { ...users[userIndex], ...req.body };
    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    const delUser = await User.findByIdAndDelete(id);
    if (!delUser) {
      return res.status(200).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
      delUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
