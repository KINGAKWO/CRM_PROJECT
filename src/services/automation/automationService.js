import axios from 'axios';

export const automationService = {
  // Rule Management
  rules: {
    getAll: async () => {
      try {
        const response = await axios.get('/api/automation/rules');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch automation rules:', error);
        throw error;
      }
    },

    create: async (rule) => {
      try {
        const response = await axios.post('/api/automation/rules', rule);
        return response.data;
      } catch (error) {
        console.error('Failed to create automation rule:', error);
        throw error;
      }
    },

    update: async (id, rule) => {
      try {
        const response = await axios.put(`/api/automation/rules/${id}`, rule);
        return response.data;
      } catch (error) {
        console.error('Failed to update automation rule:', error);
        throw error;
      }
    },

    delete: async (id) => {
      try {
        await axios.delete(`/api/automation/rules/${id}`);
        return true;
      } catch (error) {
        console.error('Failed to delete automation rule:', error);
        throw error;
      }
    },

    toggle: async (id, enabled) => {
      try {
        const response = await axios.patch(`/api/automation/rules/${id}/toggle`, { enabled });
        return response.data;
      } catch (error) {
        console.error('Failed to toggle automation rule:', error);
        throw error;
      }
    },
  },

  // Workflow Execution
  workflows: {
    execute: async (workflowId, data) => {
      try {
        const response = await axios.post(`/api/automation/workflows/${workflowId}/execute`, data);
        return response.data;
      } catch (error) {
        console.error('Failed to execute workflow:', error);
        throw error;
      }
    },

    getHistory: async (workflowId) => {
      try {
        const response = await axios.get(`/api/automation/workflows/${workflowId}/history`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch workflow history:', error);
        throw error;
      }
    },
  },

  // Trigger Management
  triggers: {
    getAvailable: async () => {
      try {
        const response = await axios.get('/api/automation/triggers');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch available triggers:', error);
        throw error;
      }
    },
  },

  // Action Management
  actions: {
    getAvailable: async () => {
      try {
        const response = await axios.get('/api/automation/actions');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch available actions:', error);
        throw error;
      }
    },
  },
};

export default automationService; 