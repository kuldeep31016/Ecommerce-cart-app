import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getCartItem } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product._id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = () => {
    // Navigate to product detail page
    navigate(`/product/${product._id}`);
  };

  const cartItem = getCartItem(product._id);
  const inCart = isInCart(product._id);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
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
      <div className="p-6 flex flex-col flex-grow">
        {/* Product Name with Better Typography */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight h-14">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed h-10">
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
        <div className="mt-auto pt-4">
          {/* Quick View and Add to Cart buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleQuickView}
              className="w-full bg-white text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center border-2 border-gray-300 hover:border-gray-400"
            >
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Quick View
            </button>
            
            {inCart ? (
              <Link
                to="/cart"
                className="w-full bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center shadow-md"
              >
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Cart
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={loading || product.stock === 0}
                style={{
                  backgroundColor: product.stock === 0 ? '#d1d5db' : loading ? '#fb923c' : '#f97316',
                  color: 'white'
                }}
                className={`w-full px-3 py-1.5 rounded-lg font-semibold text-sm flex items-center justify-center transition-all duration-200 shadow-md ${
                  product.stock === 0
                    ? 'cursor-not-allowed'
                    : loading
                    ? 'cursor-not-allowed'
                    : 'hover:brightness-110 active:brightness-90'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white mr-1.5"></div>
                    Adding...
                  </div>
                ) : product.stock === 0 ? (
                  'Out of Stock'
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;