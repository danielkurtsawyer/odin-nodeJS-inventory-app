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
    b.brand_name
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

async function addBrand(brand_name) {
  const SQL = `
  INSERT INTO brand (brand_name)
    VALUES ('${brand_name}')
  RETURNING brand_id;
  `;
  const { rows } = await pool.query(SQL);
  const { brand_id } = rows.pop();
  return brand_id;
}

async function getBrandID(brand_name) {
  const SQL = `
    SELECT brand_id FROM brand
    WHERE brand_name = '${brand_name}';
  `;

  const { rows } = await pool.query(SQL);
  return rows.pop();
}

async function addProduct(
  product_name,
  price,
  description,
  quantity,
  product_image_url,
  category_id,
  brand_id
) {
  const SQL = `
    INSERT INTO products (
      product_name, 
      price, 
      description, 
      quantity, 
      product_image_url, 
      category_id, 
      brand_id
    )
      VALUES (
        '${product_name}', 
        ${price}, 
        '${description}', 
        ${quantity}, 
        '${product_image_url}', 
        ${category_id}, 
        ${brand_id}
      );
  `;
  await pool.query(SQL);
}

async function addCategory(category_name, category_color, category_image_url) {
  const SQL = `
    INSERT INTO category (category_name, category_color, category_image_url) 
      VALUES ('${category_name}', '${category_color}', '${category_image_url}');
  `;

  await pool.query(SQL);
}

async function deleteCategory(category_id) {
  const SQL = `
    DELETE FROM products
    WHERE category_id = ${category_id};

    DELETE FROM category
    WHERE category_id = ${category_id};
  `;

  await pool.query(SQL);
}

module.exports = {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getProduct,
  addBrand,
  getBrandID,
  addProduct,
  addCategory,
  deleteCategory,
};
