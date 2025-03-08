import mongoose from "mongoose";

const CallSchema = new mongoose.Schema(
  {
    meetingId: { type: String, required: true },
    title: { type: String },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    startedAt: { type: Date, default: Date.now },
    duration: { type: Number },

    endedAt: { type: Date },
    status: { type: String, enum: ["ongoing", "ended"], default: "ongoing" },
  },
  { timestamps: true }
);

export default mongoose.model("Call", CallSchema);
