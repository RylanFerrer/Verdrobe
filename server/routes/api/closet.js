const express = require('express');
const router = express.Router();
const clothing = require('../../models/clothing')
const asyncHandler = require('express-async-handler')
const User = require("../../models/user")
const ClosetItem = clothing.ClosetItem

router.get("/:id", asyncHandler(async(req,res) => {
    const user =  await User.find({_id: req.params.id})
    console.log(user)
    const clothing =  await ClosetItem.find({user: req.params.id})

    res.json({clothing: clothing, name: user})
}));
router.post("/wardrobe/:id", (req,res) => {
    console.log("check")
    ClosetItem.find({
        '_id': { $in: req.body.clothes}
    }, function(err, docs){
         res.send(docs);
    });
})



module.exports = router