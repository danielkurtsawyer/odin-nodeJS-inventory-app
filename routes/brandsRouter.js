const { Router } = require("express");
const brandsController = require("../controllers/brandsController");
const brandsRouter = Router();

brandsRouter.get("/", brandsController.getBrandsPage);

module.exports = brandsRouter;
