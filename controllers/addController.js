const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const nameErr = "must be between 1 and 255 characters.";
const hexErr = "must be a hexadecimal color.";
const urlErr = "must be a valid URL format.";

const validateCategory = [
  body("category_name")
    .trim()
    .escape()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Category name ${nameErr}`),
  body("category_color")
    .trim()
    .isHexColor()
    .withMessage(`Category color ${hexErr}`),
  body("category_image_url").trim().isURL().withMessage(`Image URL ${urlErr}`),
];

const validateProduct = [
  body("product_name")
    .trim()
    .escape()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Product name ${nameErr}`),
];

const getAddProductPage = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("addProduct", { categories: categories });
};

const getAddCategoryPage = (req, res) => {
  res.render("addCategory");
};

const addCategoryPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("addCategory", { errors: errors.array() });
    }

    console.log(req.body);
    res.redirect("/categories");

    // check to ensure category doesn't exist
  },
];

const addProductPost = [
  validateProduct,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("addProduct", { errors: errors.array() });
    }

    console.log(req.body);
    res.redirect("/products");
  },
];

module.exports = {
  getAddProductPage,
  getAddCategoryPage,
  addCategoryPost,
  addProductPost,
};
