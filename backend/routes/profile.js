const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadFileToStorage } = require("../utils/firebaseStorage");
const User = require("../model/User");

// Multer configuration for temporary storage
const tempStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: tempStorage });

// Edit Profile Image
router.put(
  "/profile/image",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    const userId = req.user.id;
    try {
      let user = await User.findById(userId);
      const imageUrl = await uploadFileToStorage(req.file); // Upload file to Firebase Storage
      user.profileImage = imageUrl;
      await user.save();
      res.json({ path: imageUrl });
    } catch (err) {
      console.error("Error uploading profile image:", err);
      res.status(500).send("Server Error");
    }
  }
);

// Edit Profile Location
router.put("/profile", authMiddleware, async (req, res) => {
  const { location, profileImage } = req.body;
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.location = location;
    user.profileImage = profileImage;
    await user.save();

    res.json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
