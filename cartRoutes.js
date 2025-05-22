const express = require('express');
const router = express.Router();
const { cart, findItemById } = require('../menuData');

// Get cart contents
router.get('/', (req, res) => {
  res.json({ items: cart, itemCount: cart.length });
});

// Add item to cart
router.post('/add', (req, res) => {
  const { itemId, quantity } = req.body;
  if (!itemId || !Number.isInteger(itemId) || !quantity || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ error: 'Invalid item ID or quantity' });
  }

  const item = findItemById(itemId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const cartItem = cart.find(cartItem => cartItem.id === itemId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }

  res.json({ message: 'Item added to cart', cart, itemCount: cart.length });
});

// Update item quantity in cart
router.put('/update', (req, res) => {
  const { itemId, quantity } = req.body;
  if (!itemId || !Number.isInteger(itemId) || !Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ error: 'Invalid item ID or quantity' });
  }

  const cartItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
  if (cartItemIndex === -1) {
    return res.status(404).json({ error: 'Item not in cart' });
  }

  if (quantity === 0) {
    cart.splice(cartItemIndex, 1);
  } else {
    cart[cartItemIndex].quantity = quantity;
  }

  res.json({ message: 'Cart updated', cart, itemCount: cart.length });
});

// Remove item from cart
router.delete('/remove/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  if (!Number.isInteger(itemId)) {
    return res.status(400).json({ error: 'Invalid item ID' });
  }

  const cartItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
  if (cartItemIndex === -1) {
    return res.status(404).json({ error: 'Item not in cart' });
  }

  cart.splice(cartItemIndex, 1);
  res.json({ message: 'Item removed from cart', cart, itemCount: cart.length });
});

// Clear entire cart
router.delete('/clear', (req, res) => {
  cart.length = 0; // Clear the cart array
  res.json({ message: 'Cart cleared', cart, itemCount: cart.length });
});

// Get cart total
router.get('/total', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ total, itemCount: cart.length });
});

module.exports = router;