import { api } from './api';

export const searchService = {
  // Search contacts
  searchContacts: async (term) => {
    try {
      const response = await api.get(`/search/contacts?q=${term}`);
      return response.data;
    } catch (error) {
      console.error('Contact search failed:', error);
      return [];
    }
  },

  // Search deals
  searchDeals: async (term) => {
    try {
      const response = await api.get(`/search/deals?q=${term}`);
      return response.data;
    } catch (error) {
      console.error('Deal search failed:', error);
      return [];
    }
  },

  // Search companies
  searchCompanies: async (term) => {
    try {
      const response = await api.get(`/search/companies?q=${term}`);
      return response.data;
    } catch (error) {
      console.error('Company search failed:', error);
      return [];
    }
  },

  // Search campaigns
  searchCampaigns: async (term) => {
    try {
      const response = await api.get(`/search/campaigns?q=${term}`);
      return response.data;
    } catch (error) {
      console.error('Campaign search failed:', error);
      return [];
    }
  },

  // Global search across all entities
  globalSearch: async (term) => {
    try {
      const [contacts, deals, companies, campaigns] = await Promise.all([
        searchService.searchContacts(term),
        searchService.searchDeals(term),
        searchService.searchCompanies(term),
        searchService.searchCampaigns(term),
      ]);

      return {
        contacts,
        deals,
        companies,
        campaigns,
      };
    } catch (error) {
      console.error('Global search failed:', error);
      return {
        contacts: [],
        deals: [],
        companies: [],
        campaigns: [],
      };
    }
  },
}; 