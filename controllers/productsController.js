const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getProductsPage = async (req, res) => {
  const { sort, category } = req.query;
  let products;

  // get categories from DB and pass in as locals variable in renders
  const categories = await db.getAllCategories();

  // no category query parameter, get all products
  if (!category) {
    products = await db.getAllProducts(sort);
    res.render("products", {
      title: "All Products",
      categories: categories,
      selectedCategories: [],
      products: products,
      sort: sort,
    });
  } else {
    const selectedCategories = [];

    // extract query parameter categories into an array for dynamic rendering
    if (!Array.isArray(category)) {
      selectedCategories.push(+category);
    } else {
      category.forEach((c) => selectedCategories.push(+c));
    }

    products = await db.getAllProducts();

    res.render("products", {
      title: "Products Filtered By Category",
      categories: categories,
      selectedCategories: selectedCategories,
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
