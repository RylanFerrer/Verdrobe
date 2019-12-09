const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const secret ="thisismysecretn";

router.post("/", (req,res) => {
    const {email,password} = req.body;
    User.findOne({email}, (err,user) => {
        // if there is a server error
        if(err) {
            console.log(err);
            res.status(500).json({
                error: 'Internal error please try again'
            });
            // if the user does not exist
        } else if (!user) {
            console.log('user not found')
            res.status(401).json({
                error: 'Incorrect email or password'
            })
            // if there are no server errors and the user exists
        } else {
            //We are checking if the user has the same email
            user.isCorrectPassword(password,(err,same) => {
                if(err) {
                    res.status(500).json({
                        error: 'Internal error please try again'
                    });
                //if the passwords aren't the same 
                } else if (!same) {
                    console.log('password not found')
                    res.status(401).json({
                        error: 'Incorrect email or password'
                    })
                } else {
                    const payload = {
                        email: email,
                        id: user._id};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h' 
                    });
                    res.cookie('token', token, { httpOnly: true })
                    .sendStatus(200);
                }
            });
        }
    });
});

module.exports = router