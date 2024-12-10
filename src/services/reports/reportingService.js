import axios from 'axios';

export const reportingService = {
  // Sales Analytics
  getSalesAnalytics: async (timeframe = '30days') => {
    try {
      const response = await axios.get('/api/analytics/sales', {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch sales analytics:', error);
      throw error;
    }
  },

  // Pipeline Analytics
  getPipelineAnalytics: async () => {
    try {
      const response = await axios.get('/api/analytics/pipeline');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch pipeline analytics:', error);
      throw error;
    }
  },

  // Performance Metrics
  getPerformanceMetrics: async (filters = {}) => {
    try {
      const response = await axios.get('/api/analytics/performance', {
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch performance metrics:', error);
      throw error;
    }
  },

  // Custom Reports
  generateCustomReport: async (config) => {
    try {
      const response = await axios.post('/api/reports/custom', config);
      return response.data;
    } catch (error) {
      console.error('Failed to generate custom report:', error);
      throw error;
    }
  },

  // Export Reports
  exportReport: async (reportId, format = 'excel') => {
    try {
      const response = await axios.get(`/api/reports/${reportId}/export`, {
        params: { format },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Failed to export report:', error);
      throw error;
    }
  }
};

export default reportingService; 