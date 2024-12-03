const roles = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  manager: ['read', 'write'],
  user: ['read'],
};

export const checkPermission = (userRole, requiredPermission) => {
  if (!userRole || !roles[userRole]) return false;
  return roles[userRole].includes(requiredPermission);
};

export const withPermission = (WrappedComponent, requiredPermission) => {
  return function WithPermissionComponent(props) {
    const userRole = auth.getCurrentUser()?.role;
    
    if (!checkPermission(userRole, requiredPermission)) {
      return <Navigate to="/unauthorized" />;
    }
    
    return <WrappedComponent {...props} />;
  };
}; 