const mongoose = require('mongoose');
const outfitSchema = new mongoose.Schema({
    name: String,
    clothing: [Object],
    user: String
})

module.exports = mongoose.model("Outfit",outfitSchema)
    
