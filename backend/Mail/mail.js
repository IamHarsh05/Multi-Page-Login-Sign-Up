const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Send Verification Email
router.post("/sendVerificationEmail", async (req, res) => {
  const { email, verificationToken } = req.body;

  try {
    // Create transporter with SMTP configuration
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "harshy050902@gmail.com",
        pass: process.env.NodeMailer_API,
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Dribble" <harshy050902@gmail.com>',
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationToken}, verify here: ${process.env.Frontend_URL}/verify`,
      html: `<p>Please verify your email address by clicking the following link: <a href="${process.env.Frontend_URL}/verify">Verify Email</a></p>
      <p>Your verification code is: ${verificationToken}</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    res.json({ msg: "Verification email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
