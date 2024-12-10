import crypto from 'crypto-js';

export const SecurityConfig = {
  // Encryption functions
  encrypt: (data, secretKey) => {
    return crypto.AES.encrypt(JSON.stringify(data), secretKey).toString();
  },

  decrypt: (encryptedData, secretKey) => {
    const bytes = crypto.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
  },

  // Access control
  permissions: {
    admin: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
    manager: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read'],
  },

  // Role-based access control
  checkPermission: (userRole, requiredPermission) => {
    if (!userRole || !SecurityConfig.permissions[userRole]) return false;
    return SecurityConfig.permissions[userRole].includes(requiredPermission);
  },

  // Data sanitization
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .trim();
  },

  // Token management
  generateToken: (user) => {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };
    return crypto.AES.encrypt(JSON.stringify(payload), process.env.REACT_APP_JWT_SECRET).toString();
  },

  validateToken: (token) => {
    try {
      const decrypted = SecurityConfig.decrypt(token, process.env.REACT_APP_JWT_SECRET);
      return decrypted.exp > Date.now();
    } catch {
      return false;
    }
  },

  // Security headers
  securityHeaders: {
    'Content-Security-Policy': "default-src 'self'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  },

  // Password validation
  validatePassword: (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  },

  // Session management
  sessionConfig: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
}; 