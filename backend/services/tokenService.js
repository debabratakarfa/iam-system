const jwt = require('jsonwebtoken');

class TokenService {
  generateToken(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = TokenService;
