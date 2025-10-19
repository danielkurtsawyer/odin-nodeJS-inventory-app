const { Router } = require("express");
const deleteController = require("../controllers/deleteController");
const deleteRouter = Router();

deleteRouter.get("/category", deleteController.getDeleteCategoryPage);

deleteRouter.post("/category", deleteController.deleteCategoryPost);
deleteRouter.post("/product", deleteController.deleteProductPost);

module.exports = deleteRouter;
