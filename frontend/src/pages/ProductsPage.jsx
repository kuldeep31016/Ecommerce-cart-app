import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products for filtering
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'

  // Prevent double-fetch in React 18 StrictMode (dev)
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    fetchProductsAndCategories();
  }, []);

  // Filter products when category or search changes
  useEffect(() => {
    let filtered = allProducts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setProducts(filtered);
  }, [selectedCategory, allProducts, searchQuery]);

  const fetchProductsAndCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      setBackendStatus('checking');
      
      // Fetch both products and categories
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getAll(),
        productsAPI.getCategories()
      ]);
      
      setAllProducts(productsResponse.data);
      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data || []);
      setBackendStatus('connected');
      toast.success('✅ Connected to Vibe Commerce backend!');
      
    } catch (error) {
      console.error('Error fetching from backend:', error);
      setError('Unable to connect to Vibe Commerce backend. Please make sure the backend server is running on port 5001.');
      setBackendStatus('disconnected');
      setProducts([]);
      setAllProducts([]);
      setCategories([]);
      toast.error('❌ Backend server not available. Please start the backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchProductsAndCategories();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Backend Server Not Running</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
            >
              🔄 Try Again
            </button>
            <div className="text-left bg-gray-100 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-900 mb-2">To start the backend:</p>
              <code className="text-xs text-gray-700 bg-white p-2 rounded block">
                cd backend && npm start
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Discover Amazing Products'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {searchQuery 
              ? `Found ${products.length} product${products.length !== 1 ? 's' : ''} matching your search`
              : 'Explore our curated collection of high-quality products at unbeatable prices'
            }
          </p>
          
          {backendStatus === 'connected' && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-md max-w-md mx-auto">
              <p className="text-sm text-green-800">
                ✅ Connected to Vibe Commerce backend ({allProducts.length} products)
              </p>
            </div>
          )}
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center space-x-2 bg-white rounded-lg shadow-md p-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Products ({allProducts.length})
                </button>
                {categories.map((category) => {
                  const count = allProducts.filter(p => p.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedCategory === 'all' ? 'No Products Available' : `No products in "${selectedCategory}"`}
            </h3>
            <p className="text-gray-600">
              {selectedCategory === 'all' ? 'Check back later for new products.' : 'Try selecting a different category.'}
            </p>
          </div>
        )}

        {/* Stats */}
        {products.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;