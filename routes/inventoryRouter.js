const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getHomePage);

module.exports = inventoryRouter;
