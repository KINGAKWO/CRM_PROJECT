import { mockData } from '../mockData';

// Simulating API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API implementation
const mockApi = {
  auth: {
    login: async (credentials) => {
      await delay(500);
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        const user = { id: 1, email: credentials.email, name: 'Admin User', role: 'admin' };
        return { data: user };
      }
      throw new Error('Invalid credentials');
    },
    logout: async () => {
      await delay(200);
      return { data: { success: true } };
    },
    getCurrentUser: async () => {
      await delay(300);
      return { data: { id: 1, email: 'admin@example.com', name: 'Admin User', role: 'admin' } };
    },
  },

  deals: {
    getAll: async () => {
      await delay(500);
      return { data: mockData.deals };
    },
    getById: async (id) => {
      await delay(300);
      const deal = Object.values(mockData.deals)
        .flat()
        .find(d => d.id === id);
      if (!deal) throw new Error('Deal not found');
      return { data: deal };
    },
    create: async (data) => {
      await delay(500);
      const newDeal = {
        id: Math.max(...Object.values(mockData.deals).flat().map(d => d.id)) + 1,
        ...data,
        createdAt: new Date(),
      };
      mockData.deals[data.stage].push(newDeal);
      return { data: newDeal };
    },
    update: async (id, data) => {
      await delay(500);
      const deal = Object.values(mockData.deals)
        .flat()
        .find(d => d.id === id);
      if (!deal) throw new Error('Deal not found');
      Object.assign(deal, data);
      return { data: deal };
    },
    delete: async (id) => {
      await delay(500);
      Object.keys(mockData.deals).forEach(stage => {
        mockData.deals[stage] = mockData.deals[stage].filter(d => d.id !== id);
      });
      return { data: { success: true } };
    },
  },

  contacts: {
    getAll: async () => {
      await delay(500);
      return { data: mockData.contacts };
    },
    getById: async (id) => {
      await delay(300);
      const contact = mockData.contacts.find(c => c.id === id);
      if (!contact) throw new Error('Contact not found');
      return { data: contact };
    },
    create: async (data) => {
      await delay(500);
      const newContact = {
        id: Math.max(...mockData.contacts.map(c => c.id)) + 1,
        ...data,
      };
      mockData.contacts.push(newContact);
      return { data: newContact };
    },
    update: async (id, data) => {
      await delay(500);
      const index = mockData.contacts.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Contact not found');
      mockData.contacts[index] = { ...mockData.contacts[index], ...data };
      return { data: mockData.contacts[index] };
    },
    delete: async (id) => {
      await delay(500);
      mockData.contacts = mockData.contacts.filter(c => c.id !== id);
      return { data: { success: true } };
    },
  },

  campaigns: {
    getAll: async () => {
      await delay(500);
      return { data: mockData.campaigns };
    },
    getById: async (id) => {
      await delay(300);
      const campaign = mockData.campaigns.find(c => c.id === id);
      if (!campaign) throw new Error('Campaign not found');
      return { data: campaign };
    },
    create: async (data) => {
      await delay(500);
      const newCampaign = {
        id: Math.max(...mockData.campaigns.map(c => c.id)) + 1,
        ...data,
      };
      mockData.campaigns.push(newCampaign);
      return { data: newCampaign };
    },
    update: async (id, data) => {
      await delay(500);
      const index = mockData.campaigns.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Campaign not found');
      mockData.campaigns[index] = { ...mockData.campaigns[index], ...data };
      return { data: mockData.campaigns[index] };
    },
    delete: async (id) => {
      await delay(500);
      mockData.campaigns = mockData.campaigns.filter(c => c.id !== id);
      return { data: { success: true } };
    },
    getStats: async (id) => {
      await delay(300);
      const campaign = mockData.campaigns.find(c => c.id === id);
      if (!campaign) throw new Error('Campaign not found');
      return {
        data: {
          sent: campaign.sent,
          opened: campaign.opened,
          clicked: campaign.clicked,
        },
      };
    },
  },
};

export default mockApi; 