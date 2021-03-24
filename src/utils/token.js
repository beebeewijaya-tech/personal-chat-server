const { AuthenticationError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");

function signToken(user) {
  const token = jwt.sign(user, "mychatsystems//1", { expiresIn: 60 * 60 * 24 });
  return token;
}

function decodeToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, "mychatsystems//1");
    return decoded;
  } catch (err) {
    throw new AuthenticationError(err);
  }
}

module.exports = { signToken, decodeToken };
