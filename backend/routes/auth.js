const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../model/User");
const nodemailer = require("nodemailer");

// Generate random verification token
const generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Create a new user instance
    user = new User({
      username,
      email,
      password,
      verificationToken,
    });

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "harshy050902@gmail.com",
        pass: process.env.NodeMailer_API,
      },
    });

    const mailOptions = {
      from: "harshy050902@gmail.com", // Update with your email
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationToken}, verify here: ${process.env.Frontend_URL}/verify`,
      html: `<p>Please verify your email address by clicking the following link: <a href="${process.env.Frontend_URL}/verify">Verify Email</a></p>
      <p>Your verification code is: ${verificationToken}</p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_Secret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        // Send both token and success message in the response
        res.json({
          token,
          msg: "User registered successfully. Verification email sent.",
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Verify Email with OTP
router.post("/verify-email", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, verificationToken: otp });

    if (!user) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    user.emailVerified = true;
    await user.save();

    res.json({ msg: "Email verified successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_Secret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: "Welcome Back!" });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Verify Token
router.post("/verify-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    if (decoded) {
      return res.json({ isAuthenticated: true });
    }
  } catch (err) {
    console.error("Error verifying token:", err);
  }

  return res.json({ isAuthenticated: false });
});

// Logout User
router.post("/logout", authMiddleware, async (req, res) => {
  try {
    // Optionally, you can perform additional cleanup or logging out
    // For now, just send a success message
    res.json({ msg: "Logout successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
