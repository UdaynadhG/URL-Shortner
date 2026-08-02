import mongoose from "mongoose";

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
    console.log(process.env.PREFIX);
    return process.env.PREFIX + this.shortCode;
})

const urlModel = mongoose.model('URLs', urlSchema);

export default urlModel;