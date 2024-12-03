// Simulating API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123', // In real app, this would be hashed
    name: 'Admin User',
    role: 'admin',
  },
];

export const auth = {
  login: async (email, password) => {
    await delay(500);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');

    const token = btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role }));
    localStorage.setItem('auth_token', token);
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
  },

  logout: async () => {
    await delay(200);
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
}; 