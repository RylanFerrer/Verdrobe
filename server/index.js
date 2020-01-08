const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const PORT  = process.env.PORT || 5000;
const fileUpload = require('express-fileupload');
const withAuth = require('./helper/middleware')
app.use(fileUpload({
    useTempFiles:true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://admin-rylan:Sonicrfx4+@cluster0-mw7yc.mongodb.net/verdrobeDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use('/upload', require("./routes/api/upload"))
app.use('/feed', require("./routes/api/feed"))
app.use('/create', require("./routes/api/create"))
app.use('/register',require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/closet', require('./routes/api/closet'))
app.use('/outfit', require("./routes/api/outfit"));
app.get('/checkToken', withAuth , (req,res) => {
   return  res.json({id: req.id}).status(200);
});
app.get('/logout', (req,res) => {
    res.clearCookie('token');
    return res.status(200).redirect('/');
})

app.listen(PORT, (req,res)=> {
    console.log(`Server is running on PORT ${PORT}`)
})