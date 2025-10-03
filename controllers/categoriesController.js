const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getCategoriesPage = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories", { categories: categories });
};

module.exports = {
  getCategoriesPage,
};
