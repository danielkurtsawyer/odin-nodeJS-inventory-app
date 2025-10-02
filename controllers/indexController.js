const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getHomePage = (req, res) => {
  res.render("index");
};

module.exports = {
  getHomePage,
};
