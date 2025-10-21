const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

// sanitizers/validators

const nameErr = "must be between 1 and 255 characters.";
const urlErr = "must be a valid URL format.";
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

// routes

const updateProductGet = async (req, res) => {
  const { product_id } = req.params;
  const product = await db.getProduct(product_id);

  const categories = await db.getAllCategories();

  res.render("updateProduct", { product, categories });
};

const updateProductPost = [
  validateProduct,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render("updateProduct", {
        categories: categories,
        errors: errors.array(),
      });
    }

    const { product_id } = req.params;

    const {
      product_name,
      price,
      description,
      quantity,
      product_image_url,
      category_id,
      brand_name,
    } = req.body;

    res.redirect(`/products/${product_id}`);
  },
];

module.exports = {
  updateProductGet,
  updateProductPost,
};
