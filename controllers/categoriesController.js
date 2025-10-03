const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getCategoriesPage = (req, res) => {
  res.send("This is the categories page!");
};

module.exports = {
  getCategoriesPage,
};
