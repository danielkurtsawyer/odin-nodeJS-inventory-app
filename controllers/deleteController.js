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

module.exports = {
  getDeleteCategoryPage,
  deleteCategoryPost,
};
