const rolePermissions = {
  user: ['view'],
  manager: ['view', 'update'],
  admin: ['view', 'update', 'create', 'delete'],
};

function checkAccess(requiredAction) {
  return (req, res, next) => {
    const userRole = req.headers.role; // Get the user's role from headers

    // Check if the role exists in the rolePermissions object
    if (!userRole || !rolePermissions[userRole]) {
      return res.status(403).json({ error: 'Access denied: Invalid role' });
    }

    const userPermissions = rolePermissions[userRole];

    // Check if the user has the required permission
    if (!userPermissions.includes(requiredAction)) {
      return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
    }

    next(); // Proceed to the next middleware or route handler
  };
}

module.exports = checkAccess;
