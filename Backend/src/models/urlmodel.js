import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    
})

const urlSchema = new mongoose.Schema({
    url_id : {
        type : Number,
        required : true
    },
    longURL : {
        type : String,
        required : [true, "Enter the URL"]
    },
    shortCode : {
        type : String,
        required : true
    }
});

const urlModel = mongoose.model('URLs', urlSchema);

export default urlModel;