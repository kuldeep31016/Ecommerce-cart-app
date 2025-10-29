import React, { useState } from 'react';
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover object-center hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading || product.stock === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : loading
              ? 'bg-primary-400 text-white cursor-not-allowed'
              : inCart
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </div>
          ) : product.stock === 0 ? (
            'Out of Stock'
          ) : inCart ? (
            `In Cart (${cartItem?.qty || 0})`
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;