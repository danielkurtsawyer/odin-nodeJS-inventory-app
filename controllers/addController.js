const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getAddProductPage = (req, res) => {
  res.send("This is the add product page");
};

const getAddCategoryPage = (req, res) => {
  res.send("This is the add category page");
};

module.exports = {
  getAddProductPage,
  getAddCategoryPage,
};
