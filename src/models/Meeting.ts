import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
  {
    meetingId: { type: String, required: true, unique: true },
    roomId: { type: String, required: true },
    owner: { type: String, required: true },
    participants: [{ socketId: String, userId: String }],

    title: { type: String },

    startedAt: { type: Date, default: Date.now },
    duration: { type: Number },

    endedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", MeetingSchema);
