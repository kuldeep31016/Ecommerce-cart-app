import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getCartItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product._id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const cartItem = getCartItem(product._id);
  const inCart = isInCart(product._id);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Product Image with Enhanced Styling */}
      <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover object-center hover:scale-110 transition-transform duration-500 ease-in-out"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center&auto=format&q=80';
          }}
          loading="lazy"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
        </div>
        
        {/* Stock badge */}
        <div className="absolute top-3 right-3 z-20">
          {product.stock && product.stock < 10 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Only {product.stock} left
            </span>
          )}
          {product.stock && product.stock >= 50 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              In Stock
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <div className="absolute bottom-3 right-3 z-20">
          <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200 backdrop-blur-sm">
            <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Details with Enhanced Layout */}
      <div className="p-6">
        {/* Product Name with Better Typography */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description || 'High-quality product with excellent features and durability.'}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">(4.0)</span>
          <span className="ml-2 text-sm text-gray-400">•</span>
          <span className="ml-2 text-sm text-gray-500">234 reviews</span>
        </div>

        {/* Price and Cart Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          {/* Stock indicator */}
          <div className="text-right">
            <span className="text-xs text-gray-500">
              {product.stock ? `${product.stock} in stock` : 'In stock'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {inCart ? (
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center text-green-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Cart ({cartItem?.qty})
              </div>
              <Link
                to="/cart"
                className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
              >
                View Cart
              </Link>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={loading || product.stock === 0}
              className={`w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center group transition-all duration-200 ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : loading
                  ? 'bg-primary-400 text-white cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : product.stock === 0 ? (
                'Out of Stock'
              ) : (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  Add to Cart
                </div>
              )}
            </button>
          )}

          {/* Quick view and compare buttons */}
          <div className="flex space-x-2">
            <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Quick View
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;