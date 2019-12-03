const express = require('express')
const router = express.Router();
const Outfit =  require("../../models/outfit")
const asyncHandler = require('express-async-handler')
const clothing = require('../../models/clothing')
const ClosetItem = clothing.ClosetItem

router.post("/:id", asyncHandler(async(req,res) => {
  
    const newOutfit = new Outfit ({
        name: "New Outfit",
        user: req.params.id,
        clothing: []
    })
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