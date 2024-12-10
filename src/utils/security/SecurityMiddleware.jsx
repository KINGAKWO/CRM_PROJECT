import { SecurityConfig } from './SecurityConfig';

export const SecurityMiddleware = {
  // Request interceptor
  requestInterceptor: (config) => {
    // Add security headers
    config.headers = {
      ...config.headers,
      ...SecurityConfig.securityHeaders,
    };

    // Sanitize request data
    if (config.data) {
      config.data = SecurityConfig.sanitizeInput(config.data);
    }

    return config;
  },

  // Protected route wrapper
  withAuth: (WrappedComponent, requiredPermission) => {
    return function WithAuthComponent(props) {
      const token = localStorage.getItem('auth_token');
      const isValid = SecurityConfig.validateToken(token);
      
      if (!isValid) {
        // Redirect to login
        window.location.href = '/login';
        return null;
      }

      const user = JSON.parse(atob(token.split('.')[1]));
      if (!SecurityConfig.checkPermission(user.role, requiredPermission)) {
        // Redirect to unauthorized page
        window.location.href = '/unauthorized';
        return null;
      }

      return <WrappedComponent {...props} />;
    };
  },
}; 