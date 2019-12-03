const express = require('express')
const router = express.Router();
const Outfit =  require("../../models/outfit")
const asyncHandler = require('express-async-handler')
const clothing = require('../../models/clothing')
const ClosetItem = clothing.ClosetItem


router.get("/:id" , asyncHandler(async(req,res) => {
    const outfit  =  await Outfit.find({_id: req.params.id})
    res.json(outfit)
}))
router.put("/:id", asyncHandler(async(req,res) => {
    console.log("IM HERE")
    Outfit.findOneAndUpdate({ _id:req.params.id }, { $set: { name:req.body.title  }}, (err,fit) => {
        if(!err) {
            console.log("Updated", fit)
        } else {
            console.log("Error")
        }
    });
    res.json({message: "updated"})
}))
module.exports = router