const express = require('express');
const router = express.Router();
const Checkout = require('../models/checkoutModel');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Checkout(req.body);
    await newOrder.save();
    res.status(200).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);  // <-- THIS WILL PRINT IN CONSOLE
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

module.exports = router;
