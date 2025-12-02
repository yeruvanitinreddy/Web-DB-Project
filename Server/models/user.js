const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Example function
async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

module.exports = { getAllUsers };
