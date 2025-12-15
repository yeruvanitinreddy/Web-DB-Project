const pool = require('./db_connect');

// GET all users
async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

// CREATE user
async function createUser(firstname, lastname, dob, username, password) {
  const [result] = await pool.query(
    'INSERT INTO users (firstname, lastname, dob, username, password) VALUES (?, ?, ?, ?, ?)',
    [firstname, lastname, dob, username, password]
  );
  return result.insertId;
}

// LOGIN user (check credentials)
async function getUserByCredentials(username, password) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );
  return rows[0]; // return the user object or undefined
}

// UPDATE user
async function updateUser(id, firstname, lastname, dob, username, password) {
  await pool.query(
    'UPDATE users SET firstname=?, lastname=?, dob=?, username=?, password=? WHERE user_id=?',
    [firstname, lastname, dob, username, password, id]
  );
}

// DELETE user
async function deleteUser(id) {
  await pool.query('DELETE FROM users WHERE user_id=?', [id]);
}

module.exports = { 
  getAllUsers, 
  createUser, 
  getUserByCredentials,   // <-- REQUIRED FOR LOGIN
  updateUser, 
  deleteUser 
};
