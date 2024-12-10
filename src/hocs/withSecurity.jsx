import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSecurity } from '../contexts/SecurityContext';
import securityService from '../services/security/securityService';

export const withSecurity = (
  WrappedComponent,
  requiredPermission,
  options = {}
) => {
  return function SecureComponent(props) {
    const { user, isAuthenticated } = useSecurity();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (
      requiredPermission &&
      !securityService.accessControl.checkPermission(user.role, requiredPermission)
    ) {
      return <Navigate to="/unauthorized" />;
    }

    // Log access attempt
    securityService.audit.log('component_access', {
      component: WrappedComponent.name,
      permission: requiredPermission,
    });

    return <WrappedComponent {...props} />;
  };
}; 