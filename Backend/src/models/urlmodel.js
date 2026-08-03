import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    longURL: {
        type: String,
        required: [true, "Enter the URL"],
        index : true
    },
    shortCode: {
        type: String,
        required: true,
        index : true
    },
    clickCount : {
        type : Number,
        default : 0
    }
});

urlSchema.virtual('shortUrl').get(function () {
    // console.log(process.env.PREFIX);
    return process.env.PREFIX + this.shortCode;
})

const urlModel = mongoose.model('URLs', urlSchema);

export default urlModel;