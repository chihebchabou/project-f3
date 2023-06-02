// Dependencies
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get the token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded:', decoded); // {id: "646dd6299eaf8037d4eda262",...}

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('error: ', error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmRkNjI5OWVhZjgwMzdkNGVkYTI2MiIsImlhdCI6MTY4NDkyMTkxMSwiZXhwIjoxNjg3NTEzOTExfQ.r74GOUjQrNPcAyjr3IKKsVrMG19n-5-pu0PxVvSbAzA

module.exports = {
  protect,
};
