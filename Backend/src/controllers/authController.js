import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
import sendOtp from "../utils/sendOtp.js";
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken.js";
import expressAsyncHandler from "express-async-handler";
import { access } from "node:fs";

const genOtp = expressAsyncHandler(async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpDoc = await Otp.findOneAndUpdate(
        { email },
        {
            otp,
            otpExpires: new Date(Date.now() + 5 * 60 * 1000)
        },
        {
            upsert: true,
            returnDocument: "after"
        }
    );

    return otpDoc;
});

const validateUser = expressAsyncHandler(async (req, res) => {
    try {
        
        const { username, email, password } = req.body;
       
        if (!username || !email || !password) {
            return res.status(422).json({
                message: "Inputs are empty"
            });
        }

        const userExists = await User.findOne({ username });
       
        if (userExists) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const otpDoc = await genOtp(email);
        
        await sendOtp(email, otpDoc.otp);

        return res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

const verifyOtp = expressAsyncHandler(async (req, res) => {
    try {
        const { username, email, password, otp } = req.body;

        const otpDoc = await Otp.findOne({ email });
        
        if (!otpDoc) {
            return res.status(404).json({
                message: "OTP not found"
            });
        }

        if (otpDoc.otpExpires < new Date()) {
            return res.status(408).json({
                message: "OTP expired"
            });
        }

        if (otpDoc.otp !== otp) {
            return res.status(401).json({
                message: "Invalid OTP"
            });
        }
      
        const user = await User.create({
            username : username.toLowerCase(),
            email : email.toLowerCase(),
            password : password
        });

        const accessToken = await generateAccessToken(res, user._id);
        
        await User.findOneAndUpdate({username : username.toLowerCase()},
        {$set : {refreshToken : generateRefreshToken(user._id)}});
        await Otp.deleteOne({ email });

        return res.status(200).json({
            message: "Registration successful",
            accessToken : accessToken
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

const resendOtp = expressAsyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        const otpDoc = await genOtp(email);

        await sendOtp(email, otpDoc.otp);

        return res.status(200).json({
            message: "OTP resent successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

export const login = expressAsyncHandler(async(req, res) =>{
    const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({
                message: "Inputs are empty"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        }).select("+password");

        if (!user) {
            return res.status(409).json({
                message: "Username not exists"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        const accessToken = await generateAccessToken(res, user._id);
        await User.findOneAndUpdate({username : user.username},
        {$set : {refreshToken : generateRefreshToken(user._id)}});
        res.status(200).json({message : "login success", accessToken : accessToken});
})

export {
    validateUser,
    verifyOtp,
    resendOtp
};