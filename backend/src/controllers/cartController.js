const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// @desc    Get cart items
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: 'guest' }).populate('productId');
    
    // Filter out items with null productId (deleted products)
    const validCartItems = cartItems.filter(item => item.productId != null);
    
    // Calculate total
    const total = validCartItems.reduce((sum, item) => {
      return sum + (item.productId.price * item.qty);
    }, 0);

    res.json({
      cartItems: validCartItems,
      total: Math.round(total * 100) / 100 // Round to 2 decimal places
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      message: 'Server error while fetching cart',
      error: error.message 
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ 
        message: 'Product ID and quantity (minimum 1) are required' 
      });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if item already exists in cart
    const existingCartItem = await CartItem.findOne({ 
      productId, 
      userId: 'guest' 
    });

    if (existingCartItem) {
      // Update quantity
      existingCartItem.qty += parseInt(qty);
      await existingCartItem.save();
    } else {
      // Create new cart item
      const cartItem = new CartItem({
        productId,
        qty: parseInt(qty),
        userId: 'guest'
      });
      await cartItem.save();
    }

    // Return full cart data
    const cartItems = await CartItem.find({ userId: 'guest' }).populate('productId');
    
    // Filter out items with null productId (deleted products)
    const validCartItems = cartItems.filter(item => item.productId != null);
    
    const total = validCartItems.reduce((sum, item) => {
      return sum + (item.productId.price * item.qty);
    }, 0);

    res.json({
      message: existingCartItem ? 'Cart item updated successfully' : 'Item added to cart successfully',
      cartItems: validCartItems,
      total: Math.round(total * 100) / 100
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ 
      message: 'Server error while adding to cart',
      error: error.message 
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Public
const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;

    if (!qty || qty < 1) {
      return res.status(400).json({ 
        message: 'Quantity must be at least 1' 
      });
    }

    const cartItem = await CartItem.findById(req.params.id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.qty = parseInt(qty);
    await cartItem.save();
    
    // Return full cart data
    const cartItems = await CartItem.find({ userId: 'guest' }).populate('productId');
    
    // Filter out items with null productId (deleted products)
    const validCartItems = cartItems.filter(item => item.productId != null);
    
    const total = validCartItems.reduce((sum, item) => {
      return sum + (item.productId.price * item.qty);
    }, 0);

    res.json({
      message: 'Cart item updated successfully',
      cartItems: validCartItems,
      total: Math.round(total * 100) / 100
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid cart item ID' });
    }
    res.status(500).json({ 
      message: 'Server error while updating cart item',
      error: error.message 
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await CartItem.findByIdAndDelete(req.params.id);

    // Return full cart data
    const cartItems = await CartItem.find({ userId: 'guest' }).populate('productId');
    
    // Filter out items with null productId (deleted products)
    const validCartItems = cartItems.filter(item => item.productId != null);
    
    const total = validCartItems.reduce((sum, item) => {
      return sum + (item.productId.price * item.qty);
    }, 0);

    res.json({
      message: 'Item removed from cart successfully',
      cartItems: validCartItems,
      total: Math.round(total * 100) / 100
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid cart item ID' });
    }
    res.status(500).json({ 
      message: 'Server error while removing from cart',
      error: error.message 
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public
const clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({ userId: 'guest' });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ 
      message: 'Server error while clearing cart',
      error: error.message 
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};