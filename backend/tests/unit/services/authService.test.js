const AuthService = require('../../../services/authService');
const UserService = require('../../../services/userService');
const TokenService = require('../../../services/tokenService');
const PasswordUtils = require('../../../utils/passwordUtils');

jest.mock('../../../services/userService');
jest.mock('../../../services/tokenService');
jest.mock('../../../utils/passwordUtils');

describe('AuthService', () => {
  let authService;
  let mockUserService;
  let mockTokenService;

  beforeEach(() => {
    mockUserService = new UserService();
    mockTokenService = new TokenService();
    authService = new AuthService();
    authService.userService = mockUserService;
    authService.tokenService = mockTokenService;
  });

  describe('register', () => {
    it('should hash password and create user', async () => {
      const userData = { username: 'testuser', password: 'password123' };
      const hashedPassword = 'hashedpassword';
      const createdUser = { ...userData, password: hashedPassword };

      PasswordUtils.hashPassword.mockResolvedValue(hashedPassword);
      mockUserService.createUser.mockResolvedValue(createdUser);

      await authService.register(userData);

      expect(PasswordUtils.hashPassword).toHaveBeenCalledWith(userData.password);
      expect(mockUserService.createUser).toHaveBeenCalledWith({
        ...userData,
        password: hashedPassword,
      });
    });
  });

  describe('login', () => {
    it('should return token for valid credentials', async () => {
      const username = 'testuser';
      const password = 'password123';
      const user = { _id: 'userid', username, password: 'hashedpassword' };
      const token = 'jsonwebtoken';

      mockUserService.findUserByUsername.mockResolvedValue(user);
      PasswordUtils.comparePassword.mockResolvedValue(true);
      mockTokenService.generateToken.mockReturnValue(token);

      const result = await authService.login(username, password);

      expect(mockUserService.findUserByUsername).toHaveBeenCalledWith(username);
      expect(PasswordUtils.comparePassword).toHaveBeenCalledWith(password, user.password);
      expect(mockTokenService.generateToken).toHaveBeenCalledWith(user);
      expect(result).toBe(token);
    });

    it('should throw error for invalid credentials', async () => {
      mockUserService.findUserByUsername.mockResolvedValue(null);

      await expect(authService.login('wronguser', 'wrongpass')).rejects.toThrow('Invalid credentials');
    });
  });
});
