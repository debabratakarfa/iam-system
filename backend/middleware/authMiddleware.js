const TokenService = require('../services/tokenService');
const RoleUtils = require('../utils/roleUtils');

const tokenService = new TokenService();

module.exports = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ message: 'No token provided' });
    }

    try {
      const decoded = tokenService.verifyToken(token);
      req.user = decoded;
      if (requiredRole && !RoleUtils.hasRequiredRole(decoded.role, requiredRole)) {
        return res.status(403).send({ message: 'Insufficient permissions' });
      }
      next();
    } catch (error) {
      res.status(401).send({ message: 'Invalid token' });
    }
  };
};
