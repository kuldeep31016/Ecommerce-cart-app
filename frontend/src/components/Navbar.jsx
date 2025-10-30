import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productsAPI } from '../services/api';

const Navbar = () => {
  const { getItemCount, total } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const itemCount = getItemCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products for suggestions
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Update suggestions when search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allProducts
        .filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5); // Show max 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allProducts]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/product/${product._id}`);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center mr-8">
            <Link 
              to="/" 
              className="flex items-center text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              Vibe Commerce
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1">
            {/* Search Bar with Autocomplete */}
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {suggestions.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 text-left border-b border-gray-100 last:border-b-0"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary-600">${product.price}</p>
                    </button>
                  ))}
                </div>
              )}
            </form>

            {/* Navigation Links */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Products
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Categories
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link to="/category/men's clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men's Clothing</Link>
                  <Link to="/category/women's clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Women's Clothing</Link>
                  <Link to="/category/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electronics</Link>
                  <Link to="/category/jewelery" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Jewelry</Link>
                </div>
              </div>
            </div>

            {/* About Link */}
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </Link>

            {/* Cart Link with Enhanced Badge */}
            <Link
              to="/cart"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative flex items-center ${
                isActive('/cart') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2-2v4.01" />
              </svg>
              Cart
              {itemCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </div>
              )}
              {total > 0 && (
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  ${total.toFixed(2)}
                </span>
              )}
            </Link>

            <Link
              to="/checkout"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                isActive('/checkout') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Checkout
            </Link>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-primary-600 transition-colors">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </button>
              <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</a>
                  <hr className="my-1" />
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart Icon */}
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

            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                  />
                </div>
              </div>

              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100">
                Categories
              </a>
              
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100">
                About
              </a>

              <Link
                to="/checkout"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/checkout') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Checkout
              </Link>
              
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100">
                Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;