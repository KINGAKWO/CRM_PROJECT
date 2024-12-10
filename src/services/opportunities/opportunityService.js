import axios from 'axios';

export const opportunityService = {
  // Get all opportunities
  getAll: async (filters = {}) => {
    try {
      const response = await axios.get('/api/opportunities', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
      throw error;
    }
  },

  // Get opportunity by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`/api/opportunities/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch opportunity:', error);
      throw error;
    }
  },

  // Create new opportunity
  create: async (data) => {
    try {
      const response = await axios.post('/api/opportunities', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create opportunity:', error);
      throw error;
    }
  },

  // Update opportunity
  update: async (id, data) => {
    try {
      const response = await axios.put(`/api/opportunities/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update opportunity:', error);
      throw error;
    }
  },

  // Delete opportunity
  delete: async (id) => {
    try {
      await axios.delete(`/api/opportunities/${id}`);
      return true;
    } catch (error) {
      console.error('Failed to delete opportunity:', error);
      throw error;
    }
  },

  // Add activity to opportunity
  addActivity: async (id, activity) => {
    try {
      const response = await axios.post(`/api/opportunities/${id}/activities`, activity);
      return response.data;
    } catch (error) {
      console.error('Failed to add activity:', error);
      throw error;
    }
  },

  // Get opportunity analytics
  getAnalytics: async (filters = {}) => {
    try {
      const response = await axios.get('/api/opportunities/analytics', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      throw error;
    }
  },
};

export default opportunityService; 