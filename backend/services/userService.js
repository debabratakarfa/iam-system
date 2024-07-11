const User = require('../models/user');

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }

  async findUserByUsername(username) {
    return User.findOne({ username });
  }

  async getUserData(userId) {
    return User.findById(userId).select('-password');
  }
}

module.exports = UserService;
