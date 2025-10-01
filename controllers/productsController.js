const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getProductsPage = (req, res) => {
  res.send("This is the products page!");
};

module.exports = {
  getProductsPage,
};
