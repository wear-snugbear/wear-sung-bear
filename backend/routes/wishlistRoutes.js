// backend/routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get wishlist for logged-in user
router.get('/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json(user.wishlist || []);
});

// Update wishlist
router.post('/update', async (req, res) => {
  const { email, wishlist } = req.body;
  await User.findOneAndUpdate({ email }, { wishlist });
  res.status(200).send("Wishlist updated");
});

module.exports = router;