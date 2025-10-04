const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getProductsPage = async (req, res) => {
  const products = await db.getAllProducts();
  console.log(products);
  res.render("products", { products: products });
};

const getProductPage = async (req, res) => {
  const { productId } = req.params;
  const product = await db.getProduct(productId);

  if (!product) {
    res.status(404).send("Product not found");
    return;
  } else {
    res.render("product", { product: product });
  }
};

module.exports = {
  getProductsPage,
  getProductPage,
};
