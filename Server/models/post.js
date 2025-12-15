const pool = require('./db_connect');

// GET all posts for a specific user
async function getPostsByUser(user_id) {
  const [rows] = await pool.query(
    'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
    [user_id]
  );
  return rows;
}

// CREATE a new post
async function createPost(user_id, content) {
  const [result] = await pool.query(
    'INSERT INTO posts (user_id, content) VALUES (?, ?)',
    [user_id, content]
  );
  return result.insertId;
}

// UPDATE post content (optional)
async function updatePost(post_id, content) {
  await pool.query(
    'UPDATE posts SET content = ? WHERE post_id = ?',
    [content, post_id]
  );
}

// ✅ UPDATE post completed status (for checkbox)
async function updatePostStatus(post_id, completed) {
  await pool.query(
    'UPDATE posts SET completed = ? WHERE post_id = ?',
    [completed, post_id]
  );
}

// DELETE a post (optional)
async function deletePost(post_id) {
  await pool.query('DELETE FROM posts WHERE post_id = ?', [post_id]);
}

module.exports = { 
  getPostsByUser,
  createPost,
  updatePost,
  updatePostStatus,
  deletePost
};
