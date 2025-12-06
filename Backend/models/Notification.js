const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

    target: {
        type: String,
        enum: ["all", "team", "user"],
        default: "all",
    },

    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    isEmailSent: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Notification", NotificationSchema);
