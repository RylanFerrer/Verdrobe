const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const clothing = require('../../models/clothing')
const Outfit = require('../../models/outfit')
const asyncHandler = require('express-async-handler')
const User = require("../../models/user")
const ClosetItem = clothing.ClosetItem

router.get("/:id", asyncHandler(async(req,res) => {
    const user =  await User.find({_id: req.params.id})
    const clothing =  await ClosetItem.find({user: req.params.id})
    res.json({clothing: clothing, name: user})
}));
router.delete('/:id/:clothing', asyncHandler(async(req,res) => {
    await ClosetItem.deleteOne({_id: req.params.clothing})
    console.log(req.params.clothing)
   const fit = await Outfit.collection.updateMany({user: req.params.id}, {$pull: {clothing:{_id: new mongoose.Types.ObjectId(req.params.clothing)}}},{multi:true})
    return res.status(200).json({message:"Success"})
}));
router.post("/wardrobe/:id", (req,res) => {
    ClosetItem.find({
        '_id': { $in: req.body.clothes}
    }, function(err, docs){
         res.send(docs);
    });
})

module.exports = router