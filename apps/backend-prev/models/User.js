const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHashed: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
    role: {
        type: String,
        enum: ["leader", "member", "admin"],
        default: "member",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", UserSchema);
