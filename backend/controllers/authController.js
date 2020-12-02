const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/userModel');

const signToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      data: err
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        res.status(400).json({
          status: 'failed',
          data: 'Please provide an email and password'
        })
      );
    }
    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        res.status(400).json({
          status: 'failed',
          data: 'Incorrect email or password'
        })
      );
    }
    const token = signToken(user._id);
    res.status(200).json({
      status: 'Success! Logged in',
      token
    });
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      data: err
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401).json({
      status: 'failed',
      data: 'You are not logged in!'
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(
        res.status(401).json({
          status: 'failed',
          data: 'The user belonging to this token does no longer exist'
        })
      );
    }
    if (freshUser.changedPasswordAfter(decoded.iat)) {
      return next(
        res.status(401).json({
          status: 'failed',
          data: 'User recently has changed password! Please log in again!'
        })
      );
    }

    req.user = freshUser;
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      data: err
    });
  }
  next();
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          status: 'failed',
          data: 'You do not have permission to perform this action'
        })
      );
    }
    next();
  };
};
