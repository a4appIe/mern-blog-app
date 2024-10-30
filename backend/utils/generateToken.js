const jwt = require("jsonwebtoken");

const generateJWT = async (payload) => {
  let token = await jwt.sign(payload, "abcdefghij");
  return token;
};

const verifyJWT = async (token) => {
  try {
    let data = await jwt.verify(token, "abcdefghij");
    return data;
  } catch (error) {
    return false;
  }
};

const decodeJWT = async (token) => {
  let decoded = await jwt.verify(token);
  return decoded;
};

module.exports = { generateJWT, verifyJWT, decodeJWT };
