const mongoose = require("mongoose");

const BrochureSchema = new mongoose.Schema({
    pdfUrl: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Brochure", BrochureSchema);
