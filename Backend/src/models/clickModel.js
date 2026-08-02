import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
   urlId : {
        type : mongoose.Schema.ObjectId,
        ref:"urls",
        required : true
    },
    clickCount:{
        type:Number,
        default:0,
         min: [0, "count cannot be negative"]
    }
});

const clicks = mongoose.model("clicks", clickSchema);

export default Click;