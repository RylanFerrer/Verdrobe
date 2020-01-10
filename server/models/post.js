const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    profile: String,
    name: String,
    outfitName: String,
    content: String,
    date: Number,
    outfit:  String,
    user: String
})

module.exports =  mongoose.model("Post",postSchema)
    
