const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    uniqueCode: {
        type: String,
        required: true,
        unique: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    submission: {
        driveLink: { type: String },
        youtubeLink: { type: String },
        submittedAt: { type: Date },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Team", TeamSchema);
