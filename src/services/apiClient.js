import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ,
  // timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    console.log('🌍 Axios request:', {
      url: config.url,
      method: config.method,
      params: config.params,
      fullURL: config.url + (config.params ? '?' + new URLSearchParams(config.params).toString() : '')
    });
    
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      // Forbidden
      console.error('Access forbidden');
    }
    
    if (error.response?.status >= 500) {
      // Server error
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// Retry function for failed requests
const retryRequest = async (requestFn, maxRetries = 2, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      const isLastAttempt = i === maxRetries - 1;
      const isCORS = error.message?.includes('CORS') || error.code === 'ERR_NETWORK';
      
      if (isCORS && !isLastAttempt) {
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
};

// API service functions
export const apiService = {
  // Generic GET request with retry logic
  get: async (endpoint, params = {}) => {
    return retryRequest(async () => {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    });
  },

  // Generic POST request with retry logic
  post: async (endpoint, data = {}) => {
    return retryRequest(async () => {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    });
  },

  // Generic PUT request with retry logic
  put: async (endpoint, data = {}) => {
    return retryRequest(async () => {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    });
  },

  // Generic PATCH request with retry logic
  patch: async (endpoint, data = {}) => {
    return retryRequest(async () => {
      const response = await apiClient.patch(endpoint, data);
      return response.data;
    });
  },

  // Generic DELETE request with retry logic
  delete: async (endpoint) => {
    return retryRequest(async () => {
      const response = await apiClient.delete(endpoint);
      return response.data;
    });
  },
};

export default apiClient;
