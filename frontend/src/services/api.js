import axios from 'axios';

// Prefer VITE_API_URL when provided; otherwise in dev use Vite proxy at '/api'
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : '/api');

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  // Get all products with optional filters
  getAll: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.append('category', params.category);
    if (params.minPrice) searchParams.append('minPrice', params.minPrice);
    if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice);
    if (params.sort) searchParams.append('sort', params.sort);
    
    const queryString = searchParams.toString();
    return api.get(`/products${queryString ? `?${queryString}` : ''}`);
  },
  
  // Get single product
  getById: (id) => api.get(`/products/${id}`),
  
  // Get all categories
  getCategories: () => api.get('/products/categories'),
};

// Cart API
export const cartAPI = {
  // Get cart items
  get: () => api.get('/cart'),
  
  // Add item to cart
  add: (productId, qty = 1) => api.post('/cart', { productId, qty }),
  
  // Update cart item quantity
  update: (itemId, qty) => api.put(`/cart/${itemId}`, { qty }),
  
  // Remove item from cart
  remove: (itemId) => api.delete(`/cart/${itemId}`),
  
  // Clear entire cart
  clear: () => api.delete('/cart'),
};

// Checkout API
export const checkoutAPI = {
  // Process checkout
  process: (orderData) => api.post('/checkout', orderData),
  
  // Get order by receipt ID
  getOrder: (receiptId) => api.get(`/checkout/orders/${receiptId}`),
};

export default api;