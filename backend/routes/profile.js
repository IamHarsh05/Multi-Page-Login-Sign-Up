// Import necessary modules
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initiate upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

// Import the User model
const User = require("../model/User");

// Edit Profile Image & Location
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    const { location } = req.body;
    const userId = req.user.id;

    try {
      let user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (req.file) {
        user.profileImage = req.file.path;
      }
      user.location = location;

      await user.save();

      res.json({
        msg: "Profile updated successfully",
        path: user.profileImage,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
