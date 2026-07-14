import API from "./axiosConfig";

// Summaries CRUD Services
export const summariesService = {
  // Create summary
  createSummary: async (summaryData) => {
    try {
      const response = await API.post("/summaries", summaryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all summaries with pagination and filtering
  getSummaries: async (params = {}) => {
    try {
      const response = await API.get("/summaries", { params });
      // API returns: { success, data: [...], pagination }
      return {
        data: response.data?.data || [],
        pagination: response.data?.pagination || { total: 0, limit: 10, skip: 0 },
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single summary by ID
  getSummaryById: async (id) => {
    try {
      const response = await API.get(`/summaries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get summaries by note
  getSummariesByNote: async (noteId, params = {}) => {
    try {
      const response = await API.get("/summaries", {
        params: { ...params, noteId },
      });
      // API returns: { success, data: [...], pagination }
      return {
        data: response.data?.data || [],
        pagination: response.data?.pagination || { total: 0, limit: 10, skip: 0 },
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update summary
  updateSummary: async (id, summaryData) => {
    try {
      const response = await API.put(`/summaries/${id}`, summaryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete summary
  deleteSummary: async (id) => {
    try {
      const response = await API.delete(`/summaries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default summariesService;
