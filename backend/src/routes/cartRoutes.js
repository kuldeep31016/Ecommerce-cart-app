const express = require('express');
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} = require('../controllers/cartController');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get cart items
// @access  Public
router.get('/', getCart);

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Public
router.post('/', addToCart);

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Public
router.put('/:id', updateCartItem);

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Public
router.delete('/:id', removeFromCart);

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Public
router.delete('/', clearCart);

module.exports = router;