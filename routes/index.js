const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);

router.get('/login', function(req, res, next) {
  res.render("login");
});

router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    knex('users').insert({
        username: username,
        email: email,
        password: password
    })
    .then(() => {
        res.status(201).json({ message: 'User registered' });
    })
    .catch(error => {
        res.status(500).send(error);
    });
    console.log(req.body);
});

module.exports = router;