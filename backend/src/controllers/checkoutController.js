const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// @desc    Process checkout
// @route   POST /api/checkout
// @access  Public
const processCheckout = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ 
        message: 'Name and email are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    // Get cart items
    const cartItems = await CartItem.find({ userId: 'guest' }).populate('productId');
    
    if (cartItems.length === 0) {
      return res.status(400).json({ 
        message: 'Cart is empty. Add items before checkout.' 
      });
    }

    // Calculate total and prepare order items
    let total = 0;
    const orderItems = cartItems.map(item => {
      const itemTotal = item.productId.price * item.qty;
      total += itemTotal;
      
      return {
        productId: item.productId._id,
        qty: item.qty,
        price: item.productId.price
      };
    });

    // Generate receipt ID
    const receiptId = `RCP${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create order
    const order = new Order({
      cartItems: orderItems,
      total: Math.round(total * 100) / 100, // Round to 2 decimal places
      name: name.trim(),
      email: email.trim().toLowerCase(),
      receiptId,
      status: 'completed'
    });

    await order.save();

    // Clear cart after successful order
    await CartItem.deleteMany({ userId: 'guest' });

    // Return receipt
    res.status(201).json({
      message: 'Order placed successfully',
      receiptId,
      total: order.total,
      timestamp: order.createdAt,
      orderDetails: {
        name: order.name,
        email: order.email,
        items: cartItems.map(item => ({
          name: item.productId.name,
          qty: item.qty,
          price: item.productId.price,
          subtotal: Math.round(item.productId.price * item.qty * 100) / 100
        }))
      }
    });

  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ 
      message: 'Server error while processing checkout',
      error: error.message 
    });
  }
};

// @desc    Get order by receipt ID
// @route   GET /api/orders/:receiptId
// @access  Public
const getOrderByReceiptId = async (req, res) => {
  try {
    const order = await Order.findOne({ receiptId: req.params.receiptId })
      .populate('cartItems.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      message: 'Server error while fetching order',
      error: error.message 
    });
  }
};

module.exports = {
  processCheckout,
  getOrderByReceiptId
};