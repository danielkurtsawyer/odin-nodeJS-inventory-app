const { Router } = require("express");
const addController = require("../controllers/addController");
const addRouter = Router();

addRouter.get("/product", addController.getAddProductPage);
addRouter.get("/category", addController.getAddCategoryPage);

addRouter.post("/category", addController.addCategoryPost);
addRouter.post("/product", addController.addProductPost);

module.exports = addRouter;
