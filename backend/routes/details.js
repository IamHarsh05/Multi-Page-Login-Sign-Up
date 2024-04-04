// Import necessary modules
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../model/User");

// Define route to fetch user details
router.get("/details", authMiddleware, async (req, res) => {
  try {
    // Fetch the user details using the user ID from the authenticated request
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Return user details
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
