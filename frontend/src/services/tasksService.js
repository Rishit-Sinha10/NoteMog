import API from "./axiosConfig";

// Tasks CRUD Services
export const tasksService = {
  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await API.post("/tasks", taskData);
      // API returns: { success, message, data: {...} }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all tasks with pagination and filtering
  getTasks: async (params = {}) => {
    try {
      const response = await API.get("/tasks", { params });
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

  // Get single task by ID
  getTaskById: async (id) => {
    try {
      const response = await API.get(`/tasks/${id}`);
      // API returns: { success, data: {...} }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update task
  updateTask: async (id, taskData) => {
    try {
      const response = await API.put(`/tasks/${id}`, taskData);
      // API returns: { success, message, data: {...} }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      const response = await API.delete(`/tasks/${id}`);
      // API returns: { success, message }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default tasksService;
