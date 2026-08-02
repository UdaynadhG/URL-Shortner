import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    
    longURL : {
        type : String,
        required : [true, "Enter the URL"]
    },
    shortCode : {
        type : String,
        required : true
    }
});

const urls = mongoose.model('urls', urlSchema);

export default urls;