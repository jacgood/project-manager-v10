const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const Users = require('../models/User.dao');

exports.createUser = function (req, res, next) {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Users.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          Users.create(user, function (err, user) {
            if (err) {
              res.json({
                error: err,
              });
            }
            res.json({
              message: 'User created successfully',
            });
          });
        });
      });
    }
  });
};

exports.loginUser = function (req, res, next) {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Users.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_KEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          },
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
};

exports.getUsers = function (req, res, next) {
  Users.get({}, function (err, users) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      users: users,
    });
  });
};

exports.getUser = function (req, res, next) {
  Users.get({ _id: req.params.id }, function (err, users) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      users: users,
    });
  });
};

exports.updateUser = function (req, res, next) {
  Users.update({ _id: req.params.id }, req.body, function (err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'User updated successfully',
    });
  });
};

exports.removeUser = function (req, res, next) {
  Users.delete({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'User deleted successfully',
    });
  });
};
