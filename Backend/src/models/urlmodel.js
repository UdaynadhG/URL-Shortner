import mongoose from "mongoose";

<<<<<<< HEAD
const clickSchema = new mongoose.Schema({

})

const urlSchema = new mongoose.Schema({
    longURL: {
        type: String,
        required: [true, "Enter the URL"]
    },
    shortCode: {
        type: String,
        required: true
    }
});

urlSchema.virtual('shortUrl').get(function () {
    return process.env.PREFIX + shortCode;
=======
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

urlSchema.virtual('shortUrl').get(function(){
    return process.env.PREFIX+shortCode;
>>>>>>> origin/Jeevan
})

const urlModel = mongoose.model('URLs', urlSchema);

export default urls;