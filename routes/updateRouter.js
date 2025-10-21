const { Router } = require("express");
const updateRouter = new Router();

const updateController = require("../controllers/updateController");

updateRouter.get("/:product_id", updateController.updateProductGet);
updateRouter.post("/:product_id", updateController.updateProductPost);

module.exports = updateRouter;
