const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getAddProductPage = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("addProduct", { categories: categories });
};

const getAddCategoryPage = (req, res) => {
  res.render("addCategory");
};

module.exports = {
  getAddProductPage,
  getAddCategoryPage,
};
