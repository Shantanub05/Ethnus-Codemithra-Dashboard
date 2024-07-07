const express = require("express");
const {
  initDataHandler,
  getAllProductsData,
  searchProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/initialize-seed-data", initDataHandler);
router.get("/", getAllProductsData);
router.get("/search", searchProduct);

module.exports = router;
