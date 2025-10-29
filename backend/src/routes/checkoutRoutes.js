const express = require('express');
const { processCheckout, getOrderByReceiptId } = require('../controllers/checkoutController');

const router = express.Router();

// @route   POST /api/checkout
// @desc    Process checkout
// @access  Public
router.post('/', processCheckout);

// @route   GET /api/orders/:receiptId
// @desc    Get order by receipt ID
// @access  Public
router.get('/orders/:receiptId', getOrderByReceiptId);

module.exports = router;