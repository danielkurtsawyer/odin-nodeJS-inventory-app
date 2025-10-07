const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

async function getAllProducts(sortBy) {
  let sortStatement;

  // create order by clause
  if (sortBy === "priceDesc") {
    sortStatement = "ORDER BY p.price DESC";
  } else if (sortBy === "priceAsc") {
    sortStatement = "ORDER BY p.price ASC";
  } else {
    sortStatement = "ORDER BY p.product_id";
  }
  const SQL = `
  SELECT 
    p.product_id, 
    p.product_name, 
    p.price, 
    p.quantity, 
    p.product_image_url, 
    c.category_color,
    b.brand_name
  FROM products AS p
  JOIN category AS c 
  ON p.category_id = c.category_id
  JOIN brand as b
  ON p.brand_id = b.brand_id
  ${sortStatement};
  `;
  const { rows } = await pool.query(SQL);
  return rows;
}

async function getProductsByCategory(categories, sortBy) {
  let whereStatement, sortStatement;

  // create where clause
  whereStatement = `WHERE p.category_id IN (${categories.join()})`;

  // create order by clause
  if (sortBy === "priceDesc") {
    sortStatement = "ORDER BY p.price DESC";
  } else if (sortBy === "priceAsc") {
    sortStatement = "ORDER BY p.price ASC";
  } else {
    sortStatement = "ORDER BY p.product_id";
  }

  const SQL = `
  SELECT 
    p.product_id, 
    p.product_name, 
    p.price, 
    p.quantity, 
    p.product_image_url, 
    c.category_color,
    b.brand_name
  FROM products AS p
  JOIN category AS c 
  ON p.category_id = c.category_id
  JOIN brand as b
  ON p.brand_id = b.brand_id
  ${whereStatement}
  ${sortStatement};
  `;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function getProduct(productId) {
  const SQL = `
  SELECT 
    p.product_id, 
    p.product_name, 
    p.price, 
    p.description,
    p.quantity, 
    p.product_image_url, 
    p.category_id,
    c.category_name,
    c.category_color,
    b.brand_name,
    b.brand_image_url
  FROM products AS p
  JOIN category AS c 
  ON p.category_id = c.category_id
  JOIN brand as b
  ON p.brand_id = b.brand_id
  WHERE p.product_id = ${productId};
  `;

  const { rows } = await pool.query(SQL);
  return rows.pop();
}

module.exports = {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getProduct,
};
