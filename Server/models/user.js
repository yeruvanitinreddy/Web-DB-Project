const pool = require('./db_connect');

async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

async function createUser(firstname, lastname, dob, username, password) {
  const [result] = await pool.query(
    'INSERT INTO users (firstname, lastname, dob, username, password) VALUES (?, ?, ?, ?, ?)',
    [firstname, lastname, dob, username, password]
  );
  return result.insertId;
}

async function updateUser(id, firstname, lastname, dob, username, password) {
  await pool.query(
    'UPDATE users SET firstname=?, lastname=?, dob=?, username=?, password=? WHERE user_id=?',
    [firstname, lastname, dob, username, password, id]
  );
}

async function deleteUser(id) {
  await pool.query('DELETE FROM users WHERE user_id=?', [id]);
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
