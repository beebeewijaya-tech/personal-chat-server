const bcryptjs = require("bcryptjs");

function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(10);
  const hashed = bcryptjs.hashSync(password, salt);
  return hashed;
}

function comparePassword(password, hashedPassword) {
  return bcryptjs.compareSync(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
