const express = require("express");
const {
  statisticsOfTheProductRoutes,
  barChartOfTheProductRoutes,
  pieChartOfTheProductRoutes,
  combinedDataAPI,
} = require("../controllers/analytics.controller");
const router = express.Router();

router.get("/statistics", statisticsOfTheProductRoutes);
router.get("/bar-chart", barChartOfTheProductRoutes);
router.get("/pie-chart", pieChartOfTheProductRoutes);
router.get("/combined-chart", combinedDataAPI);

module.exports = router;
