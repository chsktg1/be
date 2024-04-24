const { Pool } = require("pg");

// Replace the values with your actual database credentials
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "HMS",
  password: "secret",
  port: 5432, // Default port for PostgreSQL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
