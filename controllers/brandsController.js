const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getBrandsPage = (req, res) => {
  res.send("This is the brands page!");
};

module.exports = {
  getBrandsPage,
};
