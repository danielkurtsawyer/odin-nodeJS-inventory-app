const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

async function getAllProducts() {
  const SQL = `
  SELECT 
    p.product_id, 
    p.product_name, 
    p.price, 
    p.quantity, 
    p.product_image_url, 
    p.category_id, 
    p.brand_id,
    c.category_name,
    c.category_color,
    b.brand_name
  FROM products AS p
  JOIN category AS c 
  ON p.category_id = c.category_id
  JOIN brand as b
  ON p.brand_id = b.brand_id
  ORDER BY p.product_id;
  ;
  `;
  const { rows } = await pool.query(SQL);
  return rows;
}

module.exports = {
  getAllCategories,
  getAllProducts,
};
