const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE products;

DROP TABLE category;

DROP TABLE brand;
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
