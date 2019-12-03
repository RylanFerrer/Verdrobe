const express = require('express');
const router = express.Router();
const User = require('../../models/user');
router.post('/', function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500)
          .send("Error registering new user please try again.");
      } else {
        res.status(200).send("Registered");
      }
    });
  });

  module.exports = router