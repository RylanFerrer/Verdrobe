const express = require('express')
const router = express.Router();
const Outfit =  require("../../models/outfit")
const asyncHandler = require('express-async-handler')
const clothing = require('../../models/clothing')
const ClosetItem = clothing.ClosetItem
const Post = require('../../models/post')
const User = require('../../models/user')

router.get("/:id" , asyncHandler(async(req,res) => {
    const outfit  =  await Outfit.find({_id: req.params.id})
    res.json(outfit)
}))
router.put("/:id", asyncHandler(async(req,res) => {
    console.log(req.params.id)
    const something = await User.findOneAndUpdate({"posts.outfit": req.params.id}, {$set: {"posts.$.outfitName": req.body.title}})
    console.log(something)
    await Outfit.findOneAndUpdate({ _id:req.params.id }, { $set: { name:req.body.title  }}, (err,fit) => {
        if(!err) {
            
        } else {
            console.log("Error")
        }
    });
    res.json({message: "updated"})
}))
module.exports = router