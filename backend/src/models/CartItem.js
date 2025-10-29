const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  userId: {
    type: String,
    required: true,
    default: 'guest' // For simplicity, using 'guest' as default user
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CartItem', cartItemSchema);