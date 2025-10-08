const { Router } = require("express");
const addController = require("../controllers/addController");
const addRouter = Router();

addRouter.get("/product", addController.getAddProductPage);
addRouter.get("/category", addController.getAddCategoryPage);

module.exports = addRouter;
