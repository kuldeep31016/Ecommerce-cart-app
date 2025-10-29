import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { items, total, loading, error, fetchCart, clearCart, getItemCount } = useCart();

  useEffect(() => {
    fetchCart();
  }, []); // Empty dependency array - only run once on mount

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cart Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchCart}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {getItemCount()} item{getItemCount() !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          
          {items.length > 0 && (
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={handleClearCart}
                disabled={loading}
                className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Cart
              </button>
              <Link
                to="/"
                className="px-4 py-2 text-primary-600 border border-primary-300 rounded-md hover:bg-primary-50 transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Cart Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Cart Items */}
          <div className="px-6">
            {items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t border-gray-200 px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600">
                  {getItemCount()} item{getItemCount() !== 1 ? 's' : ''} • Free shipping
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  Total: ${total.toFixed(2)}
                </p>
              </div>

              <div className="mt-6 sm:mt-0 sm:ml-6">
                <Link
                  to="/checkout"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium text-lg"
                >
                  Proceed to Checkout
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Free Shipping</p>
                <p className="text-gray-600">On all orders</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Secure Checkout</p>
                <p className="text-gray-600">Safe & encrypted</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Easy Returns</p>
                <p className="text-gray-600">30-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;