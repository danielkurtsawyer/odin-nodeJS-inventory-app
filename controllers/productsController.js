const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getProductsPage = async (req, res) => {
  const products = await db.getAllProducts();
  console.log(products);
  res.render("products", { products: products });
};

module.exports = {
  getProductsPage,
};
