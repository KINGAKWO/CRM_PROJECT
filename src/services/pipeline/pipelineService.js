import axios from 'axios';

export const pipelineService = {
  // Get pipeline stages
  getStages: async () => {
    try {
      const response = await axios.get('/api/pipeline/stages');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch pipeline stages:', error);
      throw error;
    }
  },

  // Update deal stage
  updateDealStage: async (dealId, stageId, position) => {
    try {
      const response = await axios.patch(`/api/pipeline/deals/${dealId}`, {
        stageId,
        position,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update deal stage:', error);
      throw error;
    }
  },

  // Get deals by stage
  getDealsByStage: async (stageId) => {
    try {
      const response = await axios.get(`/api/pipeline/stages/${stageId}/deals`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch deals:', error);
      throw error;
    }
  },

  // Get pipeline statistics
  getStatistics: async () => {
    try {
      const response = await axios.get('/api/pipeline/statistics');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch pipeline statistics:', error);
      throw error;
    }
  },
};

export default pipelineService; 