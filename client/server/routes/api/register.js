const express = require('express');
const router = express.Router();
const app = express()
const key = require("../../key")
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const User = require('../../models/user');

app.use(express.json());
app.use(fileUpload({
  useTempFiles:true,
}));
cloudinary.config({
  cloud_name: key.cloud_name,
  api_key: key.api_key,
  api_secret: key.api_secret
})

router.post('/', async(req, res) => {
    const { email, password, name } = req.body;
    const image =  req.files !== null ? await cloudinary.uploader.upload(req.files.file.tempFilePath) : {url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX4+f6D1ppdAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII='}
    const checkEmail = await User.findOne({email: email})
    if(checkEmail)
    {
      res.status(204).json({
       message: 'Email already exists'
    });
    } else {
      const user = new User(
        {
          email:email,
          password:password,
          name:name,
          profilePicture: image.url
        });
      user.save(function(err) {
        if (err) {
          console.log(err);
          res.status(500)
            .send("Error registering new user please try again.");
        } else {
          console.log('success')
          res.status(200).send("Registered");
        }
      });
    }
 
  });

  module.exports = router

  