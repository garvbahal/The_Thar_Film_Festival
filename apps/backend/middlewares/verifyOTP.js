const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Otp = require("../models/OTP");

exports.verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const otpEntry = await Otp.findOne({ email });

        if (!otpEntry) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired",
            });
        }

        if (otpEntry.expiresAt < Date.now()) {
            await Otp.deleteOne({ email });
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        const isOtpValid = await bcrypt.compare(otp, otpEntry.otpHash);

        if (!isOtpValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
        req.signupData = otpEntry.data;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the otp",
            error: error.message,
        });
    }
};
