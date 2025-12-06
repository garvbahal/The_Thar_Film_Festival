const User = require("../models/User");
const Team = require("../models/Team");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const token =
            req.body.token ||
            req.cookies.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

exports.isParticipant = async (req, res, next) => {
    try {
        const role = req.user.role;
        if (role !== "leader" && role !== "member") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for participants only!!",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified",
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const role = req.user.role;
        if (role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for admin only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified",
        });
    }
};
