import API from "./axiosConfig";

// Plans CRUD Services
export const plansService = {
  // Create plan
  createPlan: async (planData) => {
    try {
      const response = await API.post("/plans", planData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all plans with pagination
  getPlans: async (params = {}) => {
    try {
      const response = await API.get("/plans", { params });
      // API returns: { success, data: [...], pagination }
      return {
        data: response.data?.data || [],
        pagination: response.data?.pagination || {
          total: 0,
          limit: 10,
          skip: 0,
        },
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single plan by ID
  getPlanById: async (id) => {
    try {
      const response = await API.get(`/plans/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update plan
  updatePlan: async (id, planData) => {
    try {
      const response = await API.put(`/plans/${id}`, planData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete plan
  deletePlan: async (id) => {
    try {
      const response = await API.delete(`/plans/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default plansService;
