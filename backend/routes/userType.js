const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../model/User');

// Select User Type
router.put('/userType', authMiddleware, async (req, res) => {
  const { userType } = req.body;
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.userType = userType;

    await user.save();

    res.json({ msg: 'User type updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
