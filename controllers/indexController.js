const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const getHomePage = (req, res) => {
  res.send("This is the home page!");
};

module.exports = {
  getHomePage,
};
