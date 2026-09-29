import mongoose from "mongoose";

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

export default mongoose.model("Brochure", BrochureSchema);
