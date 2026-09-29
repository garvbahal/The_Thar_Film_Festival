const User = require("../models/User");
const Notification = require("../models/Notification");
const Brochure = require("../models/Brochure");

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ sendAt: -1 })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            notifications,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching notifications",
            error: error.message,
        });
    }
};

exports.getBrochure = async (req, res) => {
    try {
        const brochure = await Brochure.findOne();

        if (!brochure) {
            return res.status(404).json({
                success: false,
                message: "Brochure not found",
            });
        }

        return res.status(200).json({
            success: true,
            brochure,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching brochure",
            error: error.message,
        });
    }
};
