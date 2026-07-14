import API from "./axiosConfig";

// Notes CRUD Services
export const notesService = {
  // Create note
  createNote: async (noteData) => {
    try {
      const response = await API.post("/notes", noteData);
      // API returns: { success, message, data: {...} }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all notes with pagination and filtering
  getNotes: async (params = {}) => {
    try {
      const response = await API.get("/notes", { params });
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

  // Get single note by ID
  getNoteById: async (id) => {
    try {
      const response = await API.get(`/notes/${id}`);
      // API returns: { success, data: {...} }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update note
  updateNote: async (id, noteData) => {
    try {
      const response = await API.put(`/notes/${id}`, noteData);
      // API returns: { success, message, data: {...} }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete note
  deleteNote: async (id) => {
    try {
      const response = await API.delete(`/notes/${id}`);
      // API returns: { success, message }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get notes by subject
  getNotesBySubject: async (subjectId, params = {}) => {
    try {
      const response = await API.get("/notes", {
        params: { ...params, subjectId },
      });
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
};
export default notesService;
