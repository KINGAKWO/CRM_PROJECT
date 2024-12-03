// Simulating API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockData = {
  deals: {
    'Lead': [
      { id: 1, name: 'Software License Deal', value: 15000, company: 'Tech Corp', stage: 'Lead', priority: 'high', createdAt: new Date() },
      { id: 2, name: 'Consulting Project', value: 8000, company: 'Innovation Inc', stage: 'Lead', priority: 'medium', createdAt: new Date() },
    ],
    'Meeting Scheduled': [
      { id: 3, name: 'Enterprise Package', value: 45000, company: 'Big Corp', stage: 'Meeting Scheduled', priority: 'high', createdAt: new Date() },
    ],
  },
  contacts: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 890',
      company: 'Tech Corp',
      status: 'Active',
      type: 'Customer',
    },
  ],
  campaigns: [
    {
      id: 1,
      name: 'Summer Sale Newsletter',
      status: 'Active',
      progress: 75,
      sent: 1500,
      opened: 720,
      clicked: 250,
      scheduledFor: new Date(),
    },
  ],
};

const apiService = {
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
  },
};

export { apiService as api };
export default apiService; 
