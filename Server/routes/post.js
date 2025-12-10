const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
  const posts = await Post.getAllPosts();
  res.json(posts);
});

router.post('/', async (req, res) => {
  const { user_id, content } = req.body;
  const post_id = await Post.createPost(user_id, content);
  res.json({ post_id });
});

router.put('/:id', async (req, res) => {
  const { content } = req.body;
  await Post.updatePost(req.params.id, content);
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  await Post.deletePost(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
