import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/],
    },
    otp: {
        type: String,
        required: true,
        length : 6
    },
    expiresAt: {
        type: Date,
        required: true
    },
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;