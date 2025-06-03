const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    verify: {
      type: Boolean,
      default: false,
    },
    googleAuth: {
      name: {
        type: Boolean,
        default: false
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
