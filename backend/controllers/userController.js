const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const { generateJWT, verifyJWT } = require("../utils/generateToken");
const transporter = require("../utils/transporter");

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
      if (user?.verify) {
        return res.status(400).json({
          message: "Email already exist.",
          success: false,
        });
      } else {
        let token = await generateJWT({
          email: user.email,
          id: user._id,
        });

        // EMAIL
        const sentMail = transporter.sendMail({
          from: "nitinbhagatxyz@gmail.com",
          to: user?.email,
          subject: "Veirfy Your Blogify Account",
          text: "Please verify your blogify account",
          html: `<h1>Click <a href="http://localhost:5173/verify-email/${token}">here</a> to verify</h1>`,
        });

        return res.status(400).json({
          message: "Please check your email for verification",
          success: false,
        });
      }
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hash });
    let token = await generateJWT({
      email: newUser.email,
      id: newUser._id,
    });

    // EMAIL
    const sentMail = transporter.sendMail({
      from: "nitinbhagatxyz@gmail.com",
      to: email,
      subject: "Veirfy Your Blogify Account",
      text: "Please verify your blogify account",
      html: `<h1>Click <a href="http://localhost:5173/verify-email/${token}">here</a> to verify</h1>`,
    });

    return res.status(200).json({
      message: "Please check your email for verification",
      success: true,
    });
  } catch (err) {
    console.log(err);
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
    if (!user?.verify) {
      // send verification emal again
      let token = await generateJWT({
        email: user.email,
        id: user._id,
      });

      // EMAIL
      const sentMail = transporter.sendMail({
        from: "nitinbhagatxyz@gmail.com",
        to: user?.email,
        subject: "Veirfy Your Blogify Account",
        text: "Please verify your blogify account",
        html: `<h1>Click <a href="http://localhost:5173/verify-email/${token}">here</a> to verify</h1>`,
      });

      return res.status(500).json({
        message: "Please verify your account before login",
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
        id: user._id,
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

const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    const verifyToken = await verifyJWT(token);
    if (!verifyToken) {
      return res.status(402).json({
        success: false,
        message: "Invalid token/ email expired",
      });
    }
    console.log(verifyToken);
    const { id } = verifyToken;
    const user = await User.findByIdAndUpdate(
      id,
      { verify: true },
      { new: true }
    );
    if (!user) {
      return res.status(200).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
      error: error.message,
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
  verifyToken,
};
