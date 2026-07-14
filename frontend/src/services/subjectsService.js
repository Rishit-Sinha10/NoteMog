import API from "./axiosConfig";

// Subjects CRUD Services
export const subjectsService = {
  // Create subject
  createSubject: async (subjectData) => {
    try {
      const response = await API.post("/subjects", subjectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all subjects with pagination
  getSubjects: async (params = {}) => {
    try {
      const response = await API.get("/subjects", { params });
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

  // Get single subject by ID
  getSubjectById: async (id) => {
    try {
      const response = await API.get(`/subjects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update subject
  updateSubject: async (id, subjectData) => {
    try {
      const response = await API.put(`/subjects/${id}`, subjectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete subject
  deleteSubject: async (id) => {
    try {
      const response = await API.delete(`/subjects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default subjectsService;
