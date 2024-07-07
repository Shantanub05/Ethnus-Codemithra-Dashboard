const axios = require("axios");
const moment = require("moment");
const Transaction = require("../models/Transaction");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const API_URI = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const transformData = (data) =>
  data.map((item) => ({
    ...item,
    dateOfSale: new Date(item.dateOfSale), // Convert dateOfSale to Date object
  }));

const initDataHandler = asyncHandler(async (req, res) => {
  const existingProducts = await Transaction.find();

  if (existingProducts.length > 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          existingProducts,
          "Database already initialized with seed data"
        )
      );
  }

  const response = await axios.get(API_URI);
  const transformedData = transformData(response.data);
  await Transaction.insertMany(transformedData);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transformedData,
        "Database initialized with seed data"
      )
    );
});

const getAllProductsData = asyncHandler(async (req, res) => {
  const products = await Transaction.find().sort({ id: "asc" });

  if (products.length === 0) {
    throw new ApiError(404, "No products found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products retrieved successfully"));
});

const searchProduct = asyncHandler(async (req, res) => {
  const { searchText = "", month, page = 1, perPage = 10 } = req.query;
  const regex = new RegExp(searchText, "i");
  const skip = (parseInt(page) - 1) * parseInt(perPage);

  const query = {
    $or: [{ title: regex }, { description: regex }],
  };

  // Apply numeric search only if search query is a valid number
  if (!isNaN(parseFloat(searchText))) {
    query.$or.push({ price: parseFloat(searchText) });
  }

  // If a month is selected, filter by the month
  if (month) {
    const monthIndex = moment().month(month).month() + 1;
    query.$expr = {
      $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthIndex],
    };
  }

  const products = await Transaction.find(query)
    .skip(skip)
    .limit(parseInt(perPage));
  const total = await Transaction.countDocuments(query);

  const response = {
    data: products,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(perPage)),
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Products retrieved successfully"));
});

module.exports = {
  initDataHandler,
  getAllProductsData,
  searchProduct,
};
