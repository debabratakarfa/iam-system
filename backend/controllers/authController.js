const AuthService = require('../services/authService');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async register(req, res) {
    try {
      await this.authService.register(req.body);
      res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const token = await this.authService.login(req.body.username, req.body.password);
      res.send({ token });
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  }
}

module.exports = new AuthController();
