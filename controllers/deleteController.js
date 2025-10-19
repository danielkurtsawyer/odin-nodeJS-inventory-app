const db = require("../db/queries");

const getDeleteCategoryPage = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("deleteCategory", { categories: categories });
};

const deleteCategoryPost = async (req, res) => {
  const { category_id } = req.body;
  await db.deleteCategory(category_id);
  res.redirect("/categories");
};

const deleteProductPost = async (req, res) => {
  const { product_id } = req.body;
  console.log(product_id);

  await db.deleteProduct(product_id);

  res.redirect("/products");
};

module.exports = {
  getDeleteCategoryPage,
  deleteCategoryPost,
  deleteProductPost,
};
