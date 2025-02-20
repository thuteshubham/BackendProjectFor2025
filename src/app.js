const express = require("express");
const dotenv = require("dotenv");
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 

// Routes
app.use("/api", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send(" API is running...");
});

// Start Server
app.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log(` Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
});
