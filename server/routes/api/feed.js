const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const User = require("../../models/user")

router.get('/:id', asyncHandler(async(req,res) => {
    const allPosts = []
    const currentuser = await User.findOne({_id: req.params.id})
    const following = await User.find({'_id': { $in: currentuser.following} })
     following.forEach(user => {
        allPosts.push(...user.posts)
    })
    allPosts.sort((a, b) => {
        return a.date-b.date
    })

    res.json(allPosts)
}))
module.exports = router