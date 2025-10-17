const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const nameErr = "must be between 1 and 255 characters.";
const hexErr = "must be a hexadecimal color.";
const urlErr = "must be a valid URL format.";
const duplicateErr = "already exists.";
const priceErr = "must be a valid, positive currency format.";
const quantityErr = "must be a positive integer or 0.";
const descriptionErr = "must be less than 500 characters.";
const brandErr = "must be between 1 and 28 characters.";

const addExtraSingleQuote = (value) => {
  if (typeof value === "string") {
    return value.replace(/'/g, "''"); // Replaces each single quote with two single quotes
  }
  return value;
};

const validateCategory = [
  body("category_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .customSanitizer(addExtraSingleQuote)
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
    .isLength({ min: 1, max: 50 })
    .customSanitizer(addExtraSingleQuote)
    .withMessage(`Product name ${nameErr}`),
  body("price")
    .trim()
    .isCurrency({ require_symbol: false, allow_negatives: false })
    .withMessage(`Price ${priceErr}`),
  body("description")
    .trim()
    .isLength({ max: 500 })
    .withMessage(`Description ${descriptionErr}`)
    .customSanitizer(addExtraSingleQuote),
  body("quantity")
    .trim()
    .isInt({ min: 0, allow_leading_zeroes: false })
    .withMessage(`Quantity ${quantityErr}`),
  body("product_image_url").trim().isURL().withMessage(`Image URL ${urlErr}`),
  body("category_id")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Category must be selected from dropdown."),
  body("brand_name")
    .trim()
    .isLength({ min: 1, max: 28 })
    .withMessage(`Brand name ${brandErr}`)
    .customSanitizer(addExtraSingleQuote),
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

    const { category_name, category_color, category_image_url } = req.body;
    console.log(req.body);

    try {
      await db.addCategory(category_name, category_color, category_image_url);
    } catch (error) {
      console.log(error);
      return res.status(400).render("addCategory", {
        errors: [{ msg: `Category name "${category_name}" ${duplicateErr}` }],
      });
    }

    res.redirect("/categories");
  },
];

const addProductPost = [
  validateProduct,
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render("addProduct", {
        categories: categories,
        errors: errors.array(),
      });
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
