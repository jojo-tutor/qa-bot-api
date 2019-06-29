const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = password => bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10));

const checkAuth = async (token) => {
  try {
    const [, encoded] = token.split(' ');
    const decoded = await jwt.verify(encoded, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  hashPassword,
  checkAuth,
};
