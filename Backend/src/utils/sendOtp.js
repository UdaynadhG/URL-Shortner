import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const sendOtp = expressAsyncHandler(async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    await transporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL}>`,
        to: email,
        subject: "Email Verification OTP",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
                <h2>Email Verification</h2>

                <p>Use the OTP below to verify your email address.</p>

                <div style="
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    text-align: center;
                    background: #f4f4f4;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                ">
                    ${otp}
                </div>

                <p>This OTP is valid for <strong>5 minutes</strong>.</p>

                <p>If you didn't request this, you can safely ignore this email.</p>
            </div>
        `
    });
});

export default sendOtp;