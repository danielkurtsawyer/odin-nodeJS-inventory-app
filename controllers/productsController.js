const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getProductsPage = async (req, res) => {
  const { sort, category } = req.query;
  let products;

  if (!category) {
    products = await db.getAllProducts(sort);
    res.render("products", {
      title: "All Products",
      products: products,
      sort: sort,
    });
  }
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
