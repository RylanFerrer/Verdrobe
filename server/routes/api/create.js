const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Outfit =  require("../../models/outfit")
const asyncHandler = require('express-async-handler')
const clothing = require('../../models/clothing')
const ClosetItem = clothing.ClosetItem
const Post =  require('../../models/post')
const User = require('../../models/user')

router.post("/:id", asyncHandler(async(req,res) => {
    let date = new Date();
    const user = await User.findOne({_id:req.params.id})
    const newOutfit =  new Outfit ({
        name: "New Outfit",
        user: req.params.id,
        clothing: []
    })
    const newPost = new Post ({
        profile: user.profilePicture,
        name: user.name,
        date: date.getTime(),
        outfitName: newOutfit.name,
        outfit: newOutfit._id,
        content: "Created a new outfit",
        user: req.params.id
    })
    // Update the user with the new post
    await user.posts.push(newPost)
    await user.save()
    const clothing =  await ClosetItem.find({_id: req.body.apparel})
    newOutfit.clothing.push(clothing[0])
    newOutfit.save((err) => {
        if(err) {
            res.status(400).send("Did not Save Successfully");
            console.log(err);
        } else {
            console.log("Saved Successfully");
            res.redirect("/")
        }
    })
    
}))
router.get("/:id",  asyncHandler(async (req,res) => {
   const fits = await Outfit.find({user: req.params.id})
   res.json({outfit:fits})
}))
router.delete("/:id/:outfitId", asyncHandler(async(req,res)=> {
    console.log(req.params)
    await Outfit.deleteOne({_id: req.params.outfitId})
    const test  = await User.updateOne({_id: req.params.id},  {$pull: {posts:{outfit: req.params.outfitId}}},{multi:true})
    console.log(test)
    return res.status(200).json({msg: "success"})
}))
router.put('/:id', asyncHandler(async(req,res) => {
    const fits = await ClosetItem.find({_id: req.body.clothingId})
    Outfit.findOneAndUpdate({ _id:req.body.outfitId }, { $push: { 'clothing':fits  }}, (err,fit) => {
        if(!err) {
            console.log("Updated", fit)
        } else {
            console.log("Error")
        }
    });
}))

module.exports = router