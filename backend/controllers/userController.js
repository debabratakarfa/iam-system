const UserService = require('../services/userService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUserData(req, res) {
    try {
      const userData = await this.userService.getUserData(req.user.id);
      res.send(userData);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

module.exports = new UserController();
