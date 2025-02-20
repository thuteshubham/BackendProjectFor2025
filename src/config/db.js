const { Pool } = require("pg");
require("dotenv").config();

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER  || "postgres",
  host: process.env.PG_HOST  ||  "localhost",
  database: process.env.PG_DATABASE || "postgres",
  password: process.env.PG_PASSWORD  || "root",
  port: process.env.PG_PORT || 5432
});

pool.on("connect", () => {
  console.log(" Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error(" PostgreSQL connection error:", err);
});

module.exports = pool;
