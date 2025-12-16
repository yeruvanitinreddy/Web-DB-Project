const express = require('express');
const router = express.Router();
const User = require('../models/user');

//GET all users
router.get('/', async (req, res) => {
  const users = await User.getAllUsers();
  res.json(users);
});

//REGISTER user
router.post('/', async (req, res) => {
  const id = await User.createUser(
    req.body.firstname,
    req.body.lastname,
    req.body.dob,
    req.body.username,
    req.body.password
  );
  res.json({ user_id: id });
});

//LOGIN user
router.post('/login', async (req, res) => {
  const user = await User.getUserByCredentials(
    req.body.username,
    req.body.password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.json({ user_id: user.user_id, username: user.username });
});

//UPDATE user
router.put('/:id', async (req, res) => {
  await User.updateUser(
    req.params.id,
    req.body.firstname,
    req.body.lastname,
    req.body.dob,
    req.body.username,
    req.body.password
  );
  res.sendStatus(200);
});

//DELETE user
router.delete('/:id', async (req, res) => {
  await User.deleteUser(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
