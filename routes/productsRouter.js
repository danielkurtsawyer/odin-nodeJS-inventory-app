const { Router } = require("express");
const productsController = require("../controllers/productsController");
const productsRouter = Router();

productsRouter.get("/", productsController.getProductsPage);
productsRouter.get("/:productId", productsController.getProductPage);

module.exports = productsRouter;
