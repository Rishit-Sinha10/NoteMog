import axios from "axios";

// Create axios instance with base URL pointing to backend
const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

console.log("🔗 [INIT] API Base URL:", baseURL);
console.log(
  "📦 [INIT] Environment VITE_API_BASE_URL:",
  import.meta.env.VITE_API_BASE_URL,
);

const API = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

console.log(
  "✅ [INSTANCE] Axios instance created with baseURL:",
  API.defaults.baseURL,
);

// Add request interceptor to include JWT token and log requests
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    console.log("📤 [REQUEST]", {
      method: config.method.toUpperCase(),
      url: config.url,
      hasToken: !!token,
      baseURL: config.baseURL,
      timestamp: new Date().toISOString(),
    });

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ [TOKEN] Bearer token added to request");
    } else {
      console.warn(
        "⚠️ [TOKEN] No token found in localStorage - request may fail",
      );
    }

    return config;
  },
  (error) => {
    console.error("❌ [REQUEST ERROR]", error);
    return Promise.reject(error);
  },
);
// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log("📥 [RESPONSE SUCCESS]", {
      status: response.status,
      url: response.config.url,
      method: response.config.method.toUpperCase(),
    });
    return response;
  },
  (error) => {
    const errorDetails = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      message: error.response?.data?.message || error.message,
    };

    console.error("❌ [RESPONSE ERROR]", errorDetails);

    // Handle 401 - Token expired or unauthorized
    if (error.response?.status === 401) {
      console.warn("⚠️ [AUTH] Unauthorized - clearing tokens and redirecting");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    // Handle 404 - Route not found
    if (error.response?.status === 404) {
      console.error("❌ [404] Route not found:", {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        message: error.response?.data?.message,
      });
    }

    // Handle 500 - Server error
    if (error.response?.status === 500) {
      console.error("❌ [500] Server error:", error.response?.data?.message);
    }

    return Promise.reject(error);
  },
);

export default API;
