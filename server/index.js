const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const PORT  = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/verdrobeDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(PORT, (req,res)=> {
    console.log(`Server is running on PORT ${PORT}`)
})