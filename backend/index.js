const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product.routes");
const analyticsRoutes = require("./routes/analytics.routes");

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://ethnus-codemithra-dashboard-84n4dz3i0.vercel.app", // Replace with your Vercel domain
  })
);

// Use routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
