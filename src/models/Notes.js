const mongoose = require("mongoose");
const { Schema } = mongoose;
const NotesSchema = new Schema({
    title: String,
    description: String,
    creatorEmail: String,
    date: String    
});
module.exports = mongoose.model("Notes",NotesSchema);