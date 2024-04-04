const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Enable CORS for all routes
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/profile"));
app.use("/api", require("./routes/userType"));
app.use("/api", require("./routes/details"));
app.use("/api", require("./Mail/mail"));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
