export const mockData = {
  deals: {
    'Lead': [
      { id: 1, name: 'Software License Deal', value: 15000, company: 'Tech Corp', stage: 'Lead', priority: 'high', createdAt: new Date() },
      { id: 2, name: 'Consulting Project', value: 8000, company: 'Innovation Inc', stage: 'Lead', priority: 'medium', createdAt: new Date() },
    ],
    'Meeting Scheduled': [
      { id: 3, name: 'Enterprise Package', value: 45000, company: 'Big Corp', stage: 'Meeting Scheduled', priority: 'high', createdAt: new Date() },
    ],
    'Proposal Sent': [
      { id: 4, name: 'Annual Contract', value: 28000, company: 'Growth Ltd', stage: 'Proposal Sent', priority: 'medium', createdAt: new Date() },
    ],
    'Negotiation': [
      { id: 5, name: 'Custom Development', value: 60000, company: 'Major Inc', stage: 'Negotiation', priority: 'high', createdAt: new Date() },
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
    // Add more mock contacts
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
    // Add more mock campaigns
  ],
}; 