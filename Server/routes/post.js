const express = require('express');
const router = express.Router();
const Post = require('../models/post');

//GET all posts for a specific user
router.get('/:user_id', async (req, res) => {
  try {
    const posts = await Post.getPostsByUser(req.params.user_id);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch posts' });
  }
});

//CREATE a new post
router.post('/', async (req, res) => {
  try {
    const { user_id, content } = req.body;
    const post_id = await Post.createPost(user_id, content);
    res.json({ post_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create post' });
  }
});

//UPDATE post content (optional)
router.put('/edit/:id', async (req, res) => {
  try {
    const { content } = req.body;
    await Post.updatePost(req.params.id, content);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update post' });
  }
});

//UPDATE post completed status (checkbox)
router.put('/:id', async (req, res) => {
  try {
    const { completed } = req.body;
    await Post.updatePostStatus(req.params.id, completed);
    res.json({ message: "Post updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update post status' });
  }
});

//DELETE a post (optional)
router.delete('/:id', async (req, res) => {
  try {
    await Post.deletePost(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete post' });
  }
});

module.exports = router;
