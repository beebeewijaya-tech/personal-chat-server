const jwt = require("jsonwebtoken");

function signToken(user) {
  const token = jwt.sign(user, "mychatsystems//1", { expiresIn: 60 * 60 });
  return token;
}

function decodeToken(token) {
  if (!token) return null
  const decoded = jwt.verify(token, "mychatsystems//1");
  return decoded;
}

module.exports = { signToken, decodeToken };
