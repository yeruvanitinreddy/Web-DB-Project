const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => res.json(await User.getAllUsers()));

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

router.delete('/:id', async (req, res) => {
  await User.deleteUser(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
