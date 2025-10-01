const { Router } = require("express");
const productsController = require("../controllers/productsController");
const productsRouter = Router();

productsRouter.get("/", productsController.getProductsPage);

module.exports = productsRouter;
