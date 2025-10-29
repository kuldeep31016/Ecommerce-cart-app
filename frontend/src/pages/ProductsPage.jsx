import React, { useState, useEffect } from 'react';
import { productsAPI, fallbackAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from our backend first
      const response = await productsAPI.getAll();
      setProducts(response.data);
      setUsingFallback(false);
      
    } catch (error) {
      console.error('Error fetching from backend, trying fallback:', error);
      
      try {
        // If backend fails, try fallback API
        const fallbackResponse = await fallbackAPI.getProducts();
        const fallbackProducts = fallbackResponse.data.map(product => ({
          _id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
          category: product.category,
          stock: Math.floor(Math.random() * 50) + 10 // Random stock for demo
        }));
        
        setProducts(fallbackProducts);
        setUsingFallback(true);
        toast.info('Using demo data - backend unavailable');
        
      } catch (fallbackError) {
        console.error('Both APIs failed:', fallbackError);
        setError('Failed to load products. Please try again later.');
        toast.error('Failed to load products');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchProducts();
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
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of high-quality products at unbeatable prices
          </p>
          
          {usingFallback && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md max-w-md mx-auto">
              <p className="text-sm text-yellow-800">
                ⚠️ Currently showing demo data. Backend is unavailable.
              </p>
            </div>
          )}
        </div>

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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Available</h3>
            <p className="text-gray-600">Check back later for new products.</p>
          </div>
        )}

        {/* Stats */}
        {products.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;