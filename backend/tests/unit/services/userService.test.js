const UserService = require('../../../services/userService');
const User = require('../../../models/user');

jest.mock('../../../models/user');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { username: 'testuser', password: 'password123' };
      const mockUser = { ...userData, save: jest.fn() };

      User.mockImplementation(() => mockUser);

      await userService.createUser(userData);

      expect(User).toHaveBeenCalledWith(userData);
      expect(mockUser.save).toHaveBeenCalled();
    });
  });

  describe('findUserByUsername', () => {
    it('should find a user by username', async () => {
      const username = 'testuser';
      const mockUser = { username };

      User.findOne.mockResolvedValue(mockUser);

      const result = await userService.findUserByUsername(username);

      expect(User.findOne).toHaveBeenCalledWith({ username });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserData', () => {
    it('should get user data excluding password', async () => {
      const userId = 'userid123';
      const mockUser = { _id: userId, username: 'testuser' };

      const mockSelect = jest.fn().mockResolvedValue(mockUser);
      User.findById.mockReturnValue({ select: mockSelect });

      const result = await userService.getUserData(userId);

      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(mockSelect).toHaveBeenCalledWith('-password');
      expect(result).toEqual(mockUser);
    });
  });
});
