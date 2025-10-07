const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getCategoriesPage = async (req, res) => {
  const categories = await db.getAllCategories();
  console.log(categories);
  res.render("categories", { categories: categories });
};

module.exports = {
  getCategoriesPage,
};
