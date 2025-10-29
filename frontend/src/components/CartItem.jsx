import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(item.qty);

  const handleUpdateQuantity = async (newQty) => {
    if (newQty < 1) return;
    
    try {
      setLoading(true);
      setQuantity(newQty);
      await updateCartItem(item._id, newQty);
    } catch (error) {
      // Revert quantity on error
      setQuantity(item.qty);
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      await removeFromCart(item._id);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = (item.productId.price * quantity).toFixed(2);

  return (
    <div className="flex items-center py-6 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
        <img
          src={item.productId.image}
          alt={item.productId.name}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 ml-4 sm:ml-6">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/* Product Info */}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {item.productId.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {item.productId.category}
            </p>
            <p className="text-lg font-semibold text-primary-600">
              ${item.productId.price}
            </p>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center mt-4 sm:mt-0 sm:ml-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                disabled={loading || quantity <= 1}
                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
                {loading ? '...' : quantity}
              </span>
              
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={loading}
                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Subtotal */}
            <div className="ml-4 text-right">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-lg font-semibold text-gray-900">
                ${subtotal}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={loading}
              className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;