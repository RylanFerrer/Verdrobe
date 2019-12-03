const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const app = express()
const fileUpload = require('express-fileupload');
const Clarifai = require('clarifai');
const cloudinary = require('cloudinary').v2;
const key = require("../../key")
const asyncHandler = require('express-async-handler')
const clothing = require('../../models/clothing')
const ClosetItem = clothing.ClosetItem
cloudinary.config({
    cloud_name: key.cloud_name,
    api_key: key.api_key,
    api_secret: key.api_secret
})
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
}));

const clarifaiApp = new Clarifai.App({
    apiKey: key.cloudinary
});


router.post("/:id", asyncHandler(async(req,res) => {
    console.log(req.params.id)
    //Upload the image in cloudinary and get the image url 
    const image =  await cloudinary.uploader.upload(req.files.file.tempFilePath)
    //Make Predictions on that image
    const [resultOne,resultTwo] = await Promise.all([clarifaiApp.models.predict("e0be3b9d6a454f0493ac3a30784001ff", image.url),clarifaiApp.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", image.url)])
    
    //Makr the schema for clothing and then save it
    const clothes = new ClosetItem ({
        image: image.url,
        user: req.params.id
    })
    clothes.save((err) => {
        if(!err) {
            console.log("Saved");
        }
    })

  //Map through the color output so we get an object with the hex value and color name
  const colors = resultTwo.outputs[0].data.colors.map(color => {
      return color.w3c
  })
  
  //Send the data to the front-end so the user can choose what they want to see
    res.json({
        clothingId: clothes._id,
        apparel: resultOne.outputs[0].data.concepts,
        colors: colors
    })
}));

router.post('/:id/tags', (req,res) => {
    console.log(req.body.apparel, req.body.colors)
    ClosetItem.findOneAndUpdate({ _id: req.body.clothingId}, { "$set": {colorTags: req.body.colors, apparelTags: req.body.apparel}}, (err,user) =>{
        console.log(user)
    })
});

module.exports = router