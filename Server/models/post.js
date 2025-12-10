const pool = require('./db_connect');

async function getAllPosts() {
  const [rows] = await pool.query('SELECT * FROM posts');
  return rows;
}

async function createPost(user_id, content) {
  const [result] = await pool.query(
    'INSERT INTO posts (user_id, content) VALUES (?, ?)',
    [user_id, content]
  );
  return result.insertId;
}

async function updatePost(post_id, content) {
  await pool.query(
    'UPDATE posts SET content = ? WHERE post_id = ?',
    [content, post_id]
  );
}

async function deletePost(post_id) {
  await pool.query('DELETE FROM posts WHERE post_id = ?', [post_id]);
}

module.exports = { getAllPosts, createPost, updatePost, deletePost };
