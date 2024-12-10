import CryptoJS from 'crypto-js';
import axios from 'axios';

export const securityService = {
  // Encryption/Decryption
  encryption: {
    encrypt: (data, key = process.env.REACT_APP_ENCRYPTION_KEY) => {
      return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    },

    decrypt: (encryptedData, key = process.env.REACT_APP_ENCRYPTION_KEY) => {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    },

    hashPassword: (password) => {
      return CryptoJS.SHA256(password).toString();
    },
  },

  // Access Control
  accessControl: {
    roles: {
      ADMIN: 'admin',
      MANAGER: 'manager',
      USER: 'user',
      GUEST: 'guest',
    },

    permissions: {
      admin: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
      manager: ['read', 'write', 'delete'],
      user: ['read', 'write'],
      guest: ['read'],
    },

    checkPermission: (userRole, requiredPermission) => {
      const permissions = securityService.accessControl.permissions[userRole];
      return permissions?.includes(requiredPermission) || false;
    },
  },

  // Session Management
  session: {
    create: async (user) => {
      const session = {
        userId: user.id,
        role: user.role,
        expires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        deviceId: generateDeviceId(),
      };

      const encryptedSession = securityService.encryption.encrypt(session);
      localStorage.setItem('session', encryptedSession);
      return session;
    },

    validate: () => {
      try {
        const encryptedSession = localStorage.getItem('session');
        if (!encryptedSession) return false;

        const session = securityService.encryption.decrypt(encryptedSession);
        return session.expires > Date.now();
      } catch {
        return false;
      }
    },

    destroy: () => {
      localStorage.removeItem('session');
      sessionStorage.clear();
    },
  },

  // Two-Factor Authentication
  twoFactor: {
    generateCode: async (userId) => {
      try {
        const response = await axios.post('/api/2fa/generate', { userId });
        return response.data.code;
      } catch (error) {
        console.error('2FA code generation failed:', error);
        return null;
      }
    },

    verifyCode: async (userId, code) => {
      try {
        const response = await axios.post('/api/2fa/verify', { userId, code });
        return response.data.valid;
      } catch (error) {
        console.error('2FA verification failed:', error);
        return false;
      }
    },
  },

  // Activity Logging
  audit: {
    log: async (action, details) => {
      try {
        const logEntry = {
          timestamp: new Date().toISOString(),
          userId: getCurrentUserId(),
          action,
          details,
          ip: await getClientIP(),
          userAgent: navigator.userAgent,
        };

        await axios.post('/api/audit/log', logEntry);
      } catch (error) {
        console.error('Audit logging failed:', error);
      }
    },

    getActivityLogs: async (filters) => {
      try {
        const response = await axios.get('/api/audit/logs', { params: filters });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch audit logs:', error);
        return [];
      }
    },
  },

  // Data Protection
  dataProtection: {
    sanitizeInput: (input) => {
      if (typeof input !== 'string') return input;
      return input
        .replace(/[<>]/g, '')
        .trim();
    },

    validateData: (data, schema) => {
      // Implement data validation logic
      return true;
    },

    maskSensitiveData: (data, fields) => {
      const maskedData = { ...data };
      fields.forEach(field => {
        if (maskedData[field]) {
          maskedData[field] = '****';
        }
      });
      return maskedData;
    },
  },
};

// Helper functions
const generateDeviceId = () => {
  return CryptoJS.SHA256(
    navigator.userAgent + 
    navigator.language + 
    new Date().getTimezoneOffset()
  ).toString();
};

const getCurrentUserId = () => {
  try {
    const session = securityService.encryption.decrypt(
      localStorage.getItem('session')
    );
    return session.userId;
  } catch {
    return null;
  }
};

const getClientIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch {
    return 'unknown';
  }
};

export default securityService; 