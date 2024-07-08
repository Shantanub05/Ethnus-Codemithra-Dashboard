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
app.use(
  cors({
    origin: "*",
  })
);

// Use routes
app.use("/product", productRoutes);
app.use("/analytics", analyticsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
