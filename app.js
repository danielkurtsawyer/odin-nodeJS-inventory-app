const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const productsRouter = require("./routes/productsRouter");
const categoriesRouter = require("./routes/categoriesRouter");

const app = express();
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/", indexRouter);

// Every thrown error in the application or the previous middleware function calling `next`
// with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
  console.error(err);
  // We can now specify the `err.statusCode` that exists in our custom error class and
  // if it does not exist it's probably an internal server error
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running on port ${PORT}`);
});
