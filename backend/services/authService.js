const UserService = require('./userService');
const TokenService = require('./tokenService');
const PasswordUtils = require('../utils/passwordUtils');

class AuthService {
  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  async register(userData) {
    const hashedPassword = await PasswordUtils.hashPassword(userData.password);
    return this.userService.createUser({ ...userData, password: hashedPassword });
  }

  async login(username, password) {
    const user = await this.userService.findUserByUsername(username);
    if (!user || !(await PasswordUtils.comparePassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return this.tokenService.generateToken(user);
  }
}

module.exports = AuthService;
