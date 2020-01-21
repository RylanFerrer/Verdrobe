const mongoose = require('mongoose');
const closetItemSchema = new mongoose.Schema({
    name: String,
    image: String,
    apparelTags: [String],
    colorTags: [String],
    user: String
})

module.exports = {
    ClosetItem:mongoose.model("ClosetItem",closetItemSchema),
    closetItemSchema: closetItemSchema
}