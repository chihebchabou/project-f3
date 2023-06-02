// Dependencies
const { validationResult } = require('express-validator');

/**
 * @route POST /api/users
 * @desc Register new user
 * @access Public
 */
const registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      errors
        .array()
        .map(error => error.msg)
        .join('\n')
    );
  }

  res.status(201).send('User created');
};

const loginUser = (req, res) => {};

const getMe = (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
