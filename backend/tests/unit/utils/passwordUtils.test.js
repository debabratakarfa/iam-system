const bcrypt = require('bcrypt');
const PasswordUtils = require('../../../utils/passwordUtils');

jest.mock('bcrypt');

describe('PasswordUtils', () => {
  describe('hashPassword', () => {
    it('should hash password', async () => {
      const password = 'password123';
      const hashedPassword = 'hashedpassword';

      bcrypt.hash.mockResolvedValue(hashedPassword);

      const result = await PasswordUtils.hashPassword(password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const password = 'password123';
      const hashedPassword = 'hashedpassword';

      bcrypt.compare.mockResolvedValue(true);

      const result = await PasswordUtils.comparePassword(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'wrongpassword';
      const hashedPassword = 'hashedpassword';

      bcrypt.compare.mockResolvedValue(false);

      const result = await PasswordUtils.comparePassword(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
