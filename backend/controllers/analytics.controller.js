const moment = require("moment");
const Transaction = require("../models/Transaction");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const statisticsOfTheProductRoutes = asyncHandler(async (req, res) => {
  const { month } = req.query;
  if (!month)
    return res.status(400).json(new ApiError(400, "Provide a valid month"));

  const monthIndex = moment().month(month).month() + 1;

  const data = await Transaction.find({
    $expr: {
      $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthIndex],
    },
  });

  const totalSaleAmount = data.reduce((acc, product) => acc + product.price, 0);
  const soldItemsCount = data.filter((product) => product.sold === true).length;
  const notSoldItemsCount = data.filter(
    (product) => product.sold === false
  ).length;

  const response = {
    totalSaleAmount,
    soldItemsCount,
    notSoldItemsCount,
  };

  return res.status(200).json(new ApiResponse(200, response, ""));
});

const barChartOfTheProductRoutes = asyncHandler(async (req, res) => {
  const { month } = req.query;
  if (!month)
    return res.status(400).json(new ApiError(400, "Provide a valid month"));

  const monthIndex = moment().month(month).month() + 1;

  const transactions = await Transaction.find({
    $expr: {
      $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthIndex],
    },
  });

  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  const priceRangeCounts = priceRanges.map(({ range, min, max }) => {
    const count = transactions.filter(
      (item) => item.price >= min && item.price <= max
    ).length;
    return { range, count };
  });

  const response = { priceRangeCounts };

  return res.status(200).json(new ApiResponse(200, response, ""));
});

const pieChartOfTheProductRoutes = asyncHandler(async (req, res) => {
  const { month } = req.query;
  if (!month || isNaN(moment().month(month).month())) {
    return res.status(400).json(new ApiError(400, "Provide a valid month"));
  }

  const monthIndex = moment().month(month).month() + 1;

  const categoryCounts = await Transaction.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthIndex],
        },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  const formattedData = categoryCounts.reduce((acc, categoryCount) => {
    acc[categoryCount._id] = categoryCount.count;
    return acc;
  }, {});

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        formattedData,
        "Successfully retrieved pie chart data."
      )
    );
});

const combinedDataAPI = asyncHandler(async (req, res) => {
  const { month } = req.query;
  if (!month || isNaN(moment().month(month).month())) {
    return res.status(400).json(new ApiError(400, "Provide a valid month"));
  }

  const monthIndex = moment().month(month).month() + 1;

  const transactions = await Transaction.find({
    $expr: {
      $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthIndex],
    },
  });

  const totalSaleAmount = transactions.reduce(
    (acc, product) => acc + product.price,
    0
  );
  const soldItemsCount = transactions.filter(
    (product) => product.sold === true
  ).length;
  const notSoldItemsCount = transactions.filter(
    (product) => product.sold === false
  ).length;

  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  const priceRangeCounts = priceRanges.map(({ range, min, max }) => {
    const count = transactions.filter(
      (item) => item.price >= min && item.price <= max
    ).length;
    return { range, count };
  });

  const categoryCounts = await Transaction.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthIndex],
        },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  const formattedCategoryData = categoryCounts.reduce((acc, categoryCount) => {
    acc[categoryCount._id] = categoryCount.count;
    return acc;
  }, {});

  const response = {
    transactions,
    statistics: {
      totalSaleAmount,
      soldItemsCount,
      notSoldItemsCount,
    },
    barChart: priceRangeCounts,
    pieChart: formattedCategoryData,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, response, "Combined data retrieved successfully")
    );
});

module.exports = {
  statisticsOfTheProductRoutes,
  barChartOfTheProductRoutes,
  pieChartOfTheProductRoutes,
  combinedDataAPI,
};
