const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getAddProductPage = (req, res) => {
  res.render("addProduct");
};

const getAddCategoryPage = (req, res) => {
  res.render("addCategory");
};

module.exports = {
  getAddProductPage,
  getAddCategoryPage,
};
