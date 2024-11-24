function checkAccess(roles) {
  return (req, res, next) => {
    const userRole = req.headers.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

module.exports = checkAccess;
