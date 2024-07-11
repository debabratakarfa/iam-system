class RoleUtils {
  static hasRequiredRole(userRole, requiredRole) {
    const roles = ['user', 'admin'];
    return roles.indexOf(userRole) >= roles.indexOf(requiredRole);
  }
}

module.exports = RoleUtils;
