const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "nitinbhagatxyz@gmail.com",
    pass: "kevm kabm crrl xgdm",
  },
});

module.exports = transporter;