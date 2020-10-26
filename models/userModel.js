const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'A user must have a password']
  },
  email: {
    type: String,
    required: [true, 'A user must have an email']
  }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
