import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getItemCount } = useCart();
  const location = useLocation();
  const itemCount = getItemCount();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Vibe Commerce
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('/cart') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              to="/checkout"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/checkout') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              Checkout
            </Link>
          </div>

          {/* Mobile Cart Icon */}
          <div className="md:hidden">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" 
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              Products
            </Link>
            <Link
              to="/checkout"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/checkout') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;