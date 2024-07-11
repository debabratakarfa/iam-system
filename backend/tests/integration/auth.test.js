const request = require('supertest');
const express = require('express');
const authRoutes = require('../../routes/authRoutes');
const AuthService = require('../../services/authService');

jest.mock('../../services/authService');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Integration', () => {
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const userData = { username: 'testuser', password: 'password123' };

      AuthService.prototype.register.mockResolvedValue();

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toEqual({ message: 'User registered successfully' });
      expect(AuthService.prototype.register).toHaveBeenCalledWith(userData);
    });
  });

  describe('POST /auth/login', () => {
    it('should login user and return token', async () => {
      const credentials = { username: 'testuser', password: 'password123' };
      const token = 'jsonwebtoken';

      AuthService.prototype.login.mockResolvedValue(token);

      const response = await request(app)
        .post('/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body).toEqual({ token });
      expect(AuthService.prototype.login).toHaveBeenCalledWith(credentials.username, credentials.password);
    });
  });
});
