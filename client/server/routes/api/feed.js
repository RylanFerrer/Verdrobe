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
    // Sort the posts array from most recent to oldest
    allPosts.sort((a, b) => {
        return b.date-a.date
    })

    res.json(allPosts)
}))
router.get('/search/:name', async(req,res) => {
    const searchedUsers = await User.find({name: {$regex: req.params.name, $options: 'i'}})
    res.json(searchedUsers)
})
router.get('/profile/:profileid', asyncHandler(async(req,res) => {
    const profile =  await User.findOne({_id: req.params.profileid})
    const profileInfo = {
        picture: profile.profilePicture,
        name: profile.name,
        following: profile.following,
        followers: profile.followers
    }
    res.json(profileInfo)
}))
router.put('/profile/unfollow/:id', asyncHandler(async(req,res) => {
    // Remove the  user from the current users followers list
     const unFOLLLOWED = await User.findOneAndUpdate({_id: req.params.id}, { $pull: {followers: req.body.userId } } )
    //Remove the current user from the person who unfollowers following list
    await User.updateOne({_id: req.body.userId}, {$pull: {following: req.params.id}})
    //Send back the unfollowees profile
    res.status(200).json(unFOLLLOWED)
}));
router.put('/profile/follow/:id', asyncHandler(async(req,res) =>{
    // Adds the current user to the the pages followers list
     const follower = await User.findOneAndUpdate({_id: req.params.id}, { $push: {followers: req.body.userId } } )
    //Remove the current user from the person who unfollowers following list
    await User.updateOne({_id: req.body.userId}, {$push: {following: req.params.id}})
    //Send back the unfollowees profile
    res.status(200).json(follower)
}));
module.exports = router