import mongoose from "mongoose";

const requiredDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    teamCode: {
      type: String,
    },
    teamName: {
      type: String,
    },
    teamOption: {
      type: String,
      enum: ["create", "join"],
      required: true,
    },
  },
  { _id: false },
);

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    data: {
      type: requiredDataSchema,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Otp", otpSchema);
