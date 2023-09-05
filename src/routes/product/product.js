const express = require("express");
const { body } = require("express-validator");

const {
  createProduct,
  //   loginUser,
  //   getUser,
} = require("../../controllers/product/productController");
const { protect } = require("../../middleware/authMiddleware");

const route = express.Router();

route.post("/", protect, createProduct);

// route.get("/", protect, getUser);

module.exports = route;
