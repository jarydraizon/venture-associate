
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePasswords = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateToken = (userId) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check the value
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = { hashPassword, comparePasswords, generateToken };
